import * as btc from '@scure/btc-signer';
import { hex } from '@scure/base';
import type { PeginRequestI } from 'sbtc-bridge-lib/src/index' 
import { fetchUtxoSet, fetchCurrentFeeRates } from "../bridge_api";
import { decodeStacksAddress, addresses } from '$lib/stacks_connect'
import { concatByteArrays } from '$lib/structured-data.js'
import { CONFIG } from '$lib/config';
import { buildWithdrawalPayload, approxTxFees, amountToUint8 } from 'sbtc-bridge-lib/src/index' 
import type { PegInData } from 'sbtc-bridge-lib/src/index' 

export interface PegOutTransactionI {
	signature: string|undefined;
	unconfirmedUtxos:boolean;
	net:any;
    ready:boolean;
    fromBtcAddress:string;
    addressInfo:any;
	pegInData: PegInData;
	feeInfo: {
		low_fee_per_kb: number;
		medium_fee_per_kb: number;
		high_fee_per_kb: number;
	}
	fees: Array<number>;
	fee: number;
	scureFee:number;
	dust: number;

	buildData: (sigOrPrin:string, opDrop:boolean) => Uint8Array;
	calculateFees: () => void;
	maxCommit: () => number;
	setAmount: (pegInAmount:number) => void;
	setStacksAddress: (stacksAddress:string|undefined) => void;
	getChange: () => number;
	isUTXOConfirmed: (utxo:any) => boolean;
	setFeeRate: (rate:number) => void;
	getOutputsForDisplay: () => Array<any>;
	getDataToSign: () => string;
	getInputsForDisplay: () => Array<any>;
	getWitnessScript?: () => any;
	setSignature: (signature:string) => void;
	getOpDropPeginRequest: () => PeginRequestI;
	buildOpReturnTransaction: () => btc.Transaction;
	buildOpDropTransaction: () => btc.Transaction;
}

export default class PegOutTransaction implements PegOutTransactionI {

	signature = '';
	static FORMAT = /[ `!@#$%^&*()_+=[\]{};':"\\|,<>/?~]/;
	unconfirmedUtxos = false;
	requiredConfirmed = 6;
	net = (CONFIG.VITE_NETWORK === 'testnet') ? btc.TEST_NETWORK : btc.NETWORK;
	ready = false;
	fromBtcAddress!: string;
	pegInData: PegInData = {} as PegInData;
	addressInfo: any = {};
	fees: Array<number> = [20000, 35000, 50000];
	fee = 0;
	scureFee = 0;
	dust = 500;
	feeInfo: {
		low_fee_per_kb: number;
		medium_fee_per_kb: number;
		high_fee_per_kb: number;
	} = {low_fee_per_kb: 20000, medium_fee_per_kb: 20000, high_fee_per_kb: 20000};

	/**
	 * Read utxo and fee information saved in a new instance.
	 * The object is saved in local storage by the caller.
	 * Note this data is more important for the op_return method so the
	 * impl here is under review.
	 * @param network 
	 * @param fromBtcAddress 
	 * @param sbtcWalletAddress 
	 * @returns instance of PegOutTransaction
	 */
	public static create = async (network:string, fromBtcAddress:string, sbtcWalletAddress:string):Promise<PegOutTransactionI> => {
		const me = new PegOutTransaction();
		me.net = (network === 'testnet') ? btc.TEST_NETWORK : btc.NETWORK;
		me.fromBtcAddress = fromBtcAddress;
		me.pegInData = {
			amount: 0,
			stacksAddress: undefined,
			sbtcWalletAddress,
			revealFee: 0
		}
		// utxos have to come from a hosted indexer or external service
		me.addressInfo = await fetchUtxoSet(fromBtcAddress);
		const btcFeeRates = await fetchCurrentFeeRates();
		me.feeInfo = btcFeeRates.feeInfo;
		me.ready = true;
		return me;
	};

	/**
	 * hydrates the objects from the data serialised in local storage
	 */
	public static hydrate = (o:PegOutTransactionI) => {
		const me = new PegOutTransaction();
		me.net = o.net;
		//if (!o.fromBtcAddress) throw new Error('No address - use create instead!');
		me.fromBtcAddress = o.fromBtcAddress || addresses().cardinal;
		me.pegInData = o.pegInData;
		me.addressInfo = o.addressInfo;
		me.feeInfo = o.feeInfo;
		me.fees = o.fees;
		me.fee = o.fee;
		me.scureFee = o.scureFee;
		me.ready = o.ready;
		return me;
	};

		/**
	 * Build the tx with the stacks data in an unspendable op_return output
	 */
	buildOpReturnTransaction = () => {
		if (!this.ready) throw new Error('Not ready!');
		if (!this.signature) throw new Error('Signature of output 2 scriptPubKey is required');
		const tx = new btc.Transaction({ allowUnknowOutput: true });
		this.addInputs(tx);
		if (!this.signature) throw new Error('Signature of the amount and output 2 scriptPubKey is missing.')
		const data = this.buildData(this.signature, true)
		tx.addOutput({ script: btc.Script.encode(['RETURN', data]), amount: 0n });
		tx.addOutputAddress(this.pegInData.sbtcWalletAddress, BigInt(this.dust), this.net);
		if (this.getChange() > 0) tx.addOutputAddress(this.fromBtcAddress, BigInt(this.getChange()), this.net);

		return tx;
	}

	/**
	 * Build the tx with the stacks data in an spendable output behind an op_drop
	 */
	buildOpDropTransaction = () => {
		if (!this.ready) throw new Error('Not ready!');
		if (!this.signature) throw new Error('Signature of output 2 scriptPubKey is required');
		const tx = new btc.Transaction({ allowUnknowOutput: true });
		this.addInputs(tx);
		if (!this.signature) throw new Error('Signature of the amount and output 2 scriptPubKey is missing.')
		const data = this.buildData(this.signature, true)
		const csvScript = this.getCSVScript(data);
		if (!csvScript ) throw new Error('script required!');
		this.getOpDropPeginRequest()
		tx.addOutput({ script: csvScript.script, amount: BigInt(this.dust) });
		if (this.getChange() > 0) tx.addOutputAddress(this.fromBtcAddress, BigInt(this.getChange()), this.net);
		return tx;
	}
		
	/**
	 * See https://github.com/Trust-Machines/core-eng/blob/d713861af94061b2a90695e3a5ce20602872dbe7/sbtc-planning/commit-reveal-ops.md
	 * magic bytes not needed in commit tx.
	 */
	buildData = (sigOrPrin:string, opDrop:boolean):Uint8Array => {
		return buildWithdrawalPayload(this.net, this.pegInData.amount, sigOrPrin, opDrop)
	}

	getChange = () => {
		return this.maxCommit() - this.fee - this.dust;
	};
 
	setFeeRate = (rate: number) => {
		this.fee = (rate >=0 && rate < 3) ? this.fees[rate] : this.fees[1];
		if ((this.pegInData.amount + this.fee) > this.maxCommit()) {
			this.pegInData.amount = this.maxCommit() - this.fee;
		}
	};

	isUTXOConfirmed = (utxo:any) => {
		return utxo.tx.confirmations >= 0;
	};
 
	maxCommit() {
		if (!this.ready) return 0;
		const summ = this.addressInfo?.utxos?.map((item:{value:number}) => item.value).reduce((prev:number, curr:number) => prev + curr, 0);
		return summ || 0;
	}

	setPegInData = (pegInData:PegInData) => {
		this.pegInData = pegInData;
	};

	setAmount = (amount:number) => {
		//if (amount > this.maxCommit() - this.fee) {
		//	throw new Error('Amount is more than available ' + this.maxCommit() + ' less the gas ' + this.fee);
		//}
		this.pegInData.amount = amount;
	}

	setStacksAddress(stacksAddress:string|undefined) {
		if (!stacksAddress) {
			throw new Error('Address not found');
		} else if (PegOutTransaction.FORMAT.test(stacksAddress)) {
			throw new Error('please remove white space / special characters');
		}
		const decoded = decodeStacksAddress(stacksAddress.split('.')[0]);
		if ((CONFIG.VITE_NETWORK === 'testnet' || CONFIG.VITE_NETWORK === 'devnet') && decoded[0] !== 26) {
		  throw new Error('Please enter a valid stacks blockchain testnet address');
		}
		if (CONFIG.VITE_NETWORK === 'mainnet' && decoded[0] !== 22) {
			throw new Error('Please enter a valid stacks blockchain mainnet address');
		}
		this.pegInData.stacksAddress = stacksAddress;
	}

	setSignature = (signature:string) => {
		this.signature = signature;
	}

	getInputsForDisplay = () => {
		const inputs = [];
		for (const utxo of this.addressInfo.utxos) {
			inputs.push({ txid: hex.decode(utxo.txid), index: utxo.vout });
	  	}
		return inputs;
	}

	getOutputsForDisplay = () => {
		const changeAmount = Math.floor(this.maxCommit() - this.dust - this.fee);
		//const addr = this.pegInData.stacksAddress || 'stx address unknown'
		const addr = new TextEncoder().encode(this.pegInData.stacksAddress || 'stx address unknown');
		const outs:Array<any> = [
			{ script: 'RETURN ' + addr, amount: 0 },
			{ address: this.pegInData.sbtcWalletAddress, amount: this.dust },
		]
		if (changeAmount > 0) outs.push({ address: this.fromBtcAddress, amount: changeAmount });
		outs.push({ address: 'pays ' + this.fee + ' satoshis to miner.' });
		return outs;
	}

	getDataToSign = () => {
		const view2 = amountToUint8(this.pegInData.amount, 9);
		const script = btc.OutScript.encode(btc.Address(this.net).decode(this.pegInData.sbtcWalletAddress))
		const data = concatByteArrays([view2, script])
		return hex.encode(data);
	}

	getOpDropPeginRequest = ():PeginRequestI => {
		if (!this.pegInData.stacksAddress) throw new Error('Stacks address is required')
		return {
			fromBtcAddress: this.fromBtcAddress,
			status: 1,
			revealPub: '',
			reclaimPub: '',
			amount: this.pegInData.amount,
			requestType: 'unwrap',
			mode: 'op_return',
			wallet: 'any',
			stacksAddress: this.pegInData.stacksAddress,
			sbtcWalletAddress: this.pegInData.sbtcWalletAddress,
		};
	}

	/**
	 * @deprecated - maybe not needed with op_drop as the users wallet calculates
	 * the fees. Keep for now in case we switch back to op_return
	 * @returns
	 */
	calculateFees = ():void => {
		this.scureFee = approxTxFees(CONFIG.VITE_NETWORK, this.addressInfo.utxos, this.fromBtcAddress, 'tb1pf74xr0x574farj55t4hhfvv0vpc9mpgerasawmf5zk9suauckugqdppqe8');
		this.fees = [
			this.scureFee * 0.8, //Math.floor((this.feeInfo.low_fee_per_kb / 1000) * vsize),
			this.scureFee * 1.0, //Math.floor((this.feeInfo.medium_fee_per_kb / 1000) * vsize),
			this.scureFee * 1.2, //Math.floor((this.feeInfo.high_fee_per_kb / 1000) * vsize),
		]
		this.fee = this.fees[1];
		if (this.pegInData.amount === 0) {
			this.pegInData.amount = this.maxCommit() - this.fee;
		}
	}

	private addInputs = (tx:btc.Transaction) => {
		for (const utxo of this.addressInfo.utxos) {
			const script = btc.RawTx.decode(hex.decode(utxo.tx.hex))
			tx.addInput({
				txid: hex.decode(utxo.txid),
				index: utxo.vout,
				witnessUtxo: {
					script: script.outputs[utxo.vout].script,
					amount: BigInt(utxo.value)
				},
			});
		}
	}
	private getOpDropP2shScript(signature:string) {
		const script = btc.OutScript.encode(btc.Address(this.net).decode(this.pegInData.sbtcWalletAddress))	
		const data = this.buildData(signature, true)
		const asmScript = btc.Script.encode([data, 'DROP', 'DUP', 'HASH160', script, 'EQUALVERIFY', 'CHECKSIG'])
		//console.log('getOpDropP2shScript:asmScript: ', btc.Script.decode(asmScript))
		return asmScript;
	}

	private getCSVScript (data:Uint8Array):{type:string, script:Uint8Array} {
		//const pubkey1 = this.addressInfo.pubkey
		const addrScript = btc.Address(this.net).decode(this.pegInData.sbtcWalletAddress)
		if (addrScript.type === 'wpkh') {
			return {
				type: 'wsh',
				script: btc.Script.encode([data, 'DROP', btc.p2wpkh(addrScript.hash).script])
			}
		} else if (addrScript.type === 'tr') {
			return {
				type: 'tr',
				//script: btc.Script.encode([data, 'DROP', btc.OutScript.encode(btc.Address(this.net).decode(this.fromBtcAddress)), 'CHECKSIG'])
				//script: btc.Script.encode([data, 'DROP', 'IF', 144, 'CHECKSEQUENCEVERIFY', 'DROP', btc.OutScript.encode(btc.Address(this.net).decode(this.fromBtcAddress)), 'CHECKSIG', 'ELSE', 'DUP', 'HASH160', sbtcWalletUint8, 'EQUALVERIFY', 'CHECKSIG', 'ENDIF'])
				//script: btc.Script.encode([data, 'DROP', btc.p2tr(hex.decode(pubkey2)).script])
				script: btc.Script.encode([data, 'DROP', btc.p2tr(addrScript.pubkey).script])
			}
		} else {
			const asmScript = btc.Script.encode([data, 'DROP', 
				'IF', 
				btc.OutScript.encode(btc.Address(this.net).decode(this.pegInData.sbtcWalletAddress)),
				'ELSE', 
				144, 'CHECKSEQUENCEVERIFY', 'DROP',
				btc.OutScript.encode(btc.Address(this.net).decode(this.fromBtcAddress)),
				'CHECKSIG',
				'ENDIF'
			])
			return {
				type: 'tr',
				//script: btc.Script.encode([data, 'DROP', btc.OutScript.encode(btc.Address(this.net).decode(this.fromBtcAddress)), 'CHECKSIG'])
				//script: btc.Script.encode([data, 'DROP', 'IF', 144, 'CHECKSEQUENCEVERIFY', 'DROP', btc.OutScript.encode(btc.Address(this.net).decode(this.fromBtcAddress)), 'CHECKSIG', 'ELSE', 'DUP', 'HASH160', sbtcWalletUint8, 'EQUALVERIFY', 'CHECKSIG', 'ENDIF'])
				//script: btc.Script.encode([data, 'DROP', btc.p2tr(hex.decode(pubkey2)).script])
				script: btc.p2tr(asmScript).script
			}
		}
	}

};