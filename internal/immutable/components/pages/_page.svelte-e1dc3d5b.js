import { S as SvelteComponent, i as init, s as safe_not_equal, N as create_slot, T as assign, U as svg_element, V as claim_svg_element, m as children, h as detach, n as attr, W as set_svg_attributes, X as toggle_class, b as insert_hydration, D as append_hydration, O as update_slot_base, P as get_all_dirty_from_scope, Q as get_slot_changes, Y as get_spread_update, f as transition_in, t as transition_out, Z as compute_rest_props, _ as exclude_internal_props, k as element, q as text, a as space, l as claim_element, r as claim_text, c as claim_space, E as listen, F as prevent_default, u as set_data, G as noop$3, H as run_all, I as component_subscribe, J as createEventDispatcher, o as onMount, w as create_component, x as claim_component, y as mount_component, $ as set_input_value, g as group_outros, d as check_outros, z as destroy_component, a0 as to_number, p as set_style } from '../../chunks/index-3bacd89c.js';
import { Y as getAugmentedNamespace, Z as __viteBrowserExternal, a0 as commonjsGlobal, s as sbtcConfig, a1 as decodeStacksAddress } from '../../chunks/sbtc-cae2e119.js';

async function fetchAddressDetails(network, address) {
  const url = network === "mainnet" ? "https://mempool.space/api" : "https://mempool.space/testnet/api";
  const response = await fetch(url + "/address/" + address);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error("Address not found - is the network correct?");
}
async function fetchUTXOs(network, address) {
  const url = network === "mainnet" ? "https://mempool.space/api" : "https://mempool.space/testnet/api";
  const response = await fetch(url + "/address/" + address + "/utxo");
  if (response.status === 200) {
    const utxos = await response.json();
    return utxos;
  }
  throw new Error("Bitcoin address not know - is the network correct?");
}
function maxCommit(utxos) {
  const summ = utxos?.map((item) => item.value).reduce((prev, curr) => prev + curr, 0);
  return summ || 0;
}
async function fetchFeeEstimate(network) {
  const url = network === "mainnet" ? "https://api.blockcypher.com/v1/btc/main" : "https://api.blockcypher.com/v1/btc/test3";
  const response = await fetch(url);
  const info = await response.json();
  return info;
}

var buffer = {};

var base64Js = {};

base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens (b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4);

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

  var curByte = 0;

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen;

  var i;
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = (tmp >> 16) & 0xFF;
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    );
  }

  return parts.join('')
}

var ieee754 = {};

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

ieee754.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = (nBytes * 8) - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
};

ieee754.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = (nBytes * 8) - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

(function (exports) {

	const base64 = base64Js;
	const ieee754$1 = ieee754;
	const customInspectSymbol =
	  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
	    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
	    : null;

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;

	const K_MAX_LENGTH = 0x7fffffff;
	exports.kMaxLength = K_MAX_LENGTH;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
	 *               implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * We report that the browser does not support typed arrays if the are not subclassable
	 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
	 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
	 * for __proto__ and has a buggy typed array implementation.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

	if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
	    typeof console.error === 'function') {
	  console.error(
	    'This browser lacks typed array (Uint8Array) support which is required by ' +
	    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
	  );
	}

	function typedArraySupport () {
	  // Can typed array instances can be augmented?
	  try {
	    const arr = new Uint8Array(1);
	    const proto = { foo: function () { return 42 } };
	    Object.setPrototypeOf(proto, Uint8Array.prototype);
	    Object.setPrototypeOf(arr, proto);
	    return arr.foo() === 42
	  } catch (e) {
	    return false
	  }
	}

	Object.defineProperty(Buffer.prototype, 'parent', {
	  enumerable: true,
	  get: function () {
	    if (!Buffer.isBuffer(this)) return undefined
	    return this.buffer
	  }
	});

	Object.defineProperty(Buffer.prototype, 'offset', {
	  enumerable: true,
	  get: function () {
	    if (!Buffer.isBuffer(this)) return undefined
	    return this.byteOffset
	  }
	});

	function createBuffer (length) {
	  if (length > K_MAX_LENGTH) {
	    throw new RangeError('The value "' + length + '" is invalid for option "size"')
	  }
	  // Return an augmented `Uint8Array` instance
	  const buf = new Uint8Array(length);
	  Object.setPrototypeOf(buf, Buffer.prototype);
	  return buf
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new TypeError(
	        'The "string" argument must be of type string. Received type number'
	      )
	    }
	    return allocUnsafe(arg)
	  }
	  return from(arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	function from (value, encodingOrOffset, length) {
	  if (typeof value === 'string') {
	    return fromString(value, encodingOrOffset)
	  }

	  if (ArrayBuffer.isView(value)) {
	    return fromArrayView(value)
	  }

	  if (value == null) {
	    throw new TypeError(
	      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
	      'or Array-like Object. Received type ' + (typeof value)
	    )
	  }

	  if (isInstance(value, ArrayBuffer) ||
	      (value && isInstance(value.buffer, ArrayBuffer))) {
	    return fromArrayBuffer(value, encodingOrOffset, length)
	  }

	  if (typeof SharedArrayBuffer !== 'undefined' &&
	      (isInstance(value, SharedArrayBuffer) ||
	      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
	    return fromArrayBuffer(value, encodingOrOffset, length)
	  }

	  if (typeof value === 'number') {
	    throw new TypeError(
	      'The "value" argument must not be of type number. Received type number'
	    )
	  }

	  const valueOf = value.valueOf && value.valueOf();
	  if (valueOf != null && valueOf !== value) {
	    return Buffer.from(valueOf, encodingOrOffset, length)
	  }

	  const b = fromObject(value);
	  if (b) return b

	  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
	      typeof value[Symbol.toPrimitive] === 'function') {
	    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
	  }

	  throw new TypeError(
	    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
	    'or Array-like Object. Received type ' + (typeof value)
	  )
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(value, encodingOrOffset, length)
	};

	// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
	// https://github.com/feross/buffer/pull/148
	Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
	Object.setPrototypeOf(Buffer, Uint8Array);

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be of type number')
	  } else if (size < 0) {
	    throw new RangeError('The value "' + size + '" is invalid for option "size"')
	  }
	}

	function alloc (size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpreted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(size).fill(fill, encoding)
	      : createBuffer(size).fill(fill)
	  }
	  return createBuffer(size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(size, fill, encoding)
	};

	function allocUnsafe (size) {
	  assertSize(size);
	  return createBuffer(size < 0 ? 0 : checked(size) | 0)
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(size)
	};

	function fromString (string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('Unknown encoding: ' + encoding)
	  }

	  const length = byteLength(string, encoding) | 0;
	  let buf = createBuffer(length);

	  const actual = buf.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    buf = buf.slice(0, actual);
	  }

	  return buf
	}

	function fromArrayLike (array) {
	  const length = array.length < 0 ? 0 : checked(array.length) | 0;
	  const buf = createBuffer(length);
	  for (let i = 0; i < length; i += 1) {
	    buf[i] = array[i] & 255;
	  }
	  return buf
	}

	function fromArrayView (arrayView) {
	  if (isInstance(arrayView, Uint8Array)) {
	    const copy = new Uint8Array(arrayView);
	    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
	  }
	  return fromArrayLike(arrayView)
	}

	function fromArrayBuffer (array, byteOffset, length) {
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('"offset" is outside of buffer bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('"length" is outside of buffer bounds')
	  }

	  let buf;
	  if (byteOffset === undefined && length === undefined) {
	    buf = new Uint8Array(array);
	  } else if (length === undefined) {
	    buf = new Uint8Array(array, byteOffset);
	  } else {
	    buf = new Uint8Array(array, byteOffset, length);
	  }

	  // Return an augmented `Uint8Array` instance
	  Object.setPrototypeOf(buf, Buffer.prototype);

	  return buf
	}

	function fromObject (obj) {
	  if (Buffer.isBuffer(obj)) {
	    const len = checked(obj.length) | 0;
	    const buf = createBuffer(len);

	    if (buf.length === 0) {
	      return buf
	    }

	    obj.copy(buf, 0, 0, len);
	    return buf
	  }

	  if (obj.length !== undefined) {
	    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
	      return createBuffer(0)
	    }
	    return fromArrayLike(obj)
	  }

	  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
	    return fromArrayLike(obj.data)
	  }
	}

	function checked (length) {
	  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= K_MAX_LENGTH) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0;
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return b != null && b._isBuffer === true &&
	    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
	};

	Buffer.compare = function compare (a, b) {
	  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
	  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError(
	      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
	    )
	  }

	  if (a === b) return 0

	  let x = a.length;
	  let y = b.length;

	  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!Array.isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  let i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  const buffer = Buffer.allocUnsafe(length);
	  let pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    let buf = list[i];
	    if (isInstance(buf, Uint8Array)) {
	      if (pos + buf.length > buffer.length) {
	        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
	        buf.copy(buffer, pos);
	      } else {
	        Uint8Array.prototype.set.call(
	          buffer,
	          buf,
	          pos
	        );
	      }
	    } else if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    } else {
	      buf.copy(buffer, pos);
	    }
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    throw new TypeError(
	      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
	      'Received type ' + typeof string
	    )
	  }

	  const len = string.length;
	  const mustMatch = (arguments.length > 2 && arguments[2] === true);
	  if (!mustMatch && len === 0) return 0

	  // Use a for loop to avoid recursion
	  let loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) {
	          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
	        }
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  let loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
	// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
	// reliably in a browserify context because there could be multiple different
	// copies of the 'buffer' package in use. This method works even for Buffer
	// instances that were created from another copy of the `buffer` package.
	// See: https://github.com/feross/buffer/issues/154
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  const i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  const len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (let i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  const len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (let i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  const len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (let i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  const length = this.length;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.toLocaleString = Buffer.prototype.toString;

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  let str = '';
	  const max = exports.INSPECT_MAX_BYTES;
	  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
	  if (this.length > max) str += ' ... ';
	  return '<Buffer ' + str + '>'
	};
	if (customInspectSymbol) {
	  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (isInstance(target, Uint8Array)) {
	    target = Buffer.from(target, target.offset, target.byteLength);
	  }
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError(
	      'The "target" argument must be one of type Buffer or Uint8Array. ' +
	      'Received type ' + (typeof target)
	    )
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  let x = thisEnd - thisStart;
	  let y = end - start;
	  const len = Math.min(x, y);

	  const thisCopy = this.slice(thisStart, thisEnd);
	  const targetCopy = target.slice(start, end);

	  for (let i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset; // Coerce to Number.
	  if (numberIsNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  let indexSize = 1;
	  let arrLength = arr.length;
	  let valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  let i;
	  if (dir) {
	    let foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      let found = true;
	      for (let j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  const remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  const strLen = string.length;

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  let i;
	  for (i = 0; i < length; ++i) {
	    const parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (numberIsNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset >>> 0;
	    if (isFinite(length)) {
	      length = length >>> 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  const remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  let loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return asciiWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  const res = [];

	  let i = start;
	  while (i < end) {
	    const firstByte = buf[i];
	    let codePoint = null;
	    let bytesPerSequence = (firstByte > 0xEF)
	      ? 4
	      : (firstByte > 0xDF)
	          ? 3
	          : (firstByte > 0xBF)
	              ? 2
	              : 1;

	    if (i + bytesPerSequence <= end) {
	      let secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	const MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  const len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  let res = '';
	  let i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  let ret = '';
	  end = Math.min(buf.length, end);

	  for (let i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  let ret = '';
	  end = Math.min(buf.length, end);

	  for (let i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  const len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  let out = '';
	  for (let i = start; i < end; ++i) {
	    out += hexSliceLookupTable[buf[i]];
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  const bytes = buf.slice(start, end);
	  let res = '';
	  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
	  for (let i = 0; i < bytes.length - 1; i += 2) {
	    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  const len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  const newBuf = this.subarray(start, end);
	  // Return an augmented `Uint8Array` instance
	  Object.setPrototypeOf(newBuf, Buffer.prototype);

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUintLE =
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  let val = this[offset];
	  let mul = 1;
	  let i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUintBE =
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  let val = this[offset + --byteLength];
	  let mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUint8 =
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUint16LE =
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUint16BE =
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUint32LE =
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUint32BE =
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
	  offset = offset >>> 0;
	  validateNumber(offset, 'offset');
	  const first = this[offset];
	  const last = this[offset + 7];
	  if (first === undefined || last === undefined) {
	    boundsError(offset, this.length - 8);
	  }

	  const lo = first +
	    this[++offset] * 2 ** 8 +
	    this[++offset] * 2 ** 16 +
	    this[++offset] * 2 ** 24;

	  const hi = this[++offset] +
	    this[++offset] * 2 ** 8 +
	    this[++offset] * 2 ** 16 +
	    last * 2 ** 24;

	  return BigInt(lo) + (BigInt(hi) << BigInt(32))
	});

	Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
	  offset = offset >>> 0;
	  validateNumber(offset, 'offset');
	  const first = this[offset];
	  const last = this[offset + 7];
	  if (first === undefined || last === undefined) {
	    boundsError(offset, this.length - 8);
	  }

	  const hi = first * 2 ** 24 +
	    this[++offset] * 2 ** 16 +
	    this[++offset] * 2 ** 8 +
	    this[++offset];

	  const lo = this[++offset] * 2 ** 24 +
	    this[++offset] * 2 ** 16 +
	    this[++offset] * 2 ** 8 +
	    last;

	  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
	});

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  let val = this[offset];
	  let mul = 1;
	  let i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  let i = byteLength;
	  let mul = 1;
	  let val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  const val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  const val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
	  offset = offset >>> 0;
	  validateNumber(offset, 'offset');
	  const first = this[offset];
	  const last = this[offset + 7];
	  if (first === undefined || last === undefined) {
	    boundsError(offset, this.length - 8);
	  }

	  const val = this[offset + 4] +
	    this[offset + 5] * 2 ** 8 +
	    this[offset + 6] * 2 ** 16 +
	    (last << 24); // Overflow

	  return (BigInt(val) << BigInt(32)) +
	    BigInt(first +
	    this[++offset] * 2 ** 8 +
	    this[++offset] * 2 ** 16 +
	    this[++offset] * 2 ** 24)
	});

	Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
	  offset = offset >>> 0;
	  validateNumber(offset, 'offset');
	  const first = this[offset];
	  const last = this[offset + 7];
	  if (first === undefined || last === undefined) {
	    boundsError(offset, this.length - 8);
	  }

	  const val = (first << 24) + // Overflow
	    this[++offset] * 2 ** 16 +
	    this[++offset] * 2 ** 8 +
	    this[++offset];

	  return (BigInt(val) << BigInt(32)) +
	    BigInt(this[++offset] * 2 ** 24 +
	    this[++offset] * 2 ** 16 +
	    this[++offset] * 2 ** 8 +
	    last)
	});

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754$1.read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754$1.read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754$1.read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754$1.read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUintLE =
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  let mul = 1;
	  let i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUintBE =
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  let i = byteLength - 1;
	  let mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUint8 =
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeUint16LE =
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  return offset + 2
	};

	Buffer.prototype.writeUint16BE =
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  this[offset] = (value >>> 8);
	  this[offset + 1] = (value & 0xff);
	  return offset + 2
	};

	Buffer.prototype.writeUint32LE =
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  this[offset + 3] = (value >>> 24);
	  this[offset + 2] = (value >>> 16);
	  this[offset + 1] = (value >>> 8);
	  this[offset] = (value & 0xff);
	  return offset + 4
	};

	Buffer.prototype.writeUint32BE =
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  this[offset] = (value >>> 24);
	  this[offset + 1] = (value >>> 16);
	  this[offset + 2] = (value >>> 8);
	  this[offset + 3] = (value & 0xff);
	  return offset + 4
	};

	function wrtBigUInt64LE (buf, value, offset, min, max) {
	  checkIntBI(value, min, max, buf, offset, 7);

	  let lo = Number(value & BigInt(0xffffffff));
	  buf[offset++] = lo;
	  lo = lo >> 8;
	  buf[offset++] = lo;
	  lo = lo >> 8;
	  buf[offset++] = lo;
	  lo = lo >> 8;
	  buf[offset++] = lo;
	  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
	  buf[offset++] = hi;
	  hi = hi >> 8;
	  buf[offset++] = hi;
	  hi = hi >> 8;
	  buf[offset++] = hi;
	  hi = hi >> 8;
	  buf[offset++] = hi;
	  return offset
	}

	function wrtBigUInt64BE (buf, value, offset, min, max) {
	  checkIntBI(value, min, max, buf, offset, 7);

	  let lo = Number(value & BigInt(0xffffffff));
	  buf[offset + 7] = lo;
	  lo = lo >> 8;
	  buf[offset + 6] = lo;
	  lo = lo >> 8;
	  buf[offset + 5] = lo;
	  lo = lo >> 8;
	  buf[offset + 4] = lo;
	  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
	  buf[offset + 3] = hi;
	  hi = hi >> 8;
	  buf[offset + 2] = hi;
	  hi = hi >> 8;
	  buf[offset + 1] = hi;
	  hi = hi >> 8;
	  buf[offset] = hi;
	  return offset + 8
	}

	Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
	  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
	});

	Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
	  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
	});

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    const limit = Math.pow(2, (8 * byteLength) - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  let i = 0;
	  let mul = 1;
	  let sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    const limit = Math.pow(2, (8 * byteLength) - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  let i = byteLength - 1;
	  let mul = 1;
	  let sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  this[offset] = (value >>> 8);
	  this[offset + 1] = (value & 0xff);
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  this[offset + 2] = (value >>> 16);
	  this[offset + 3] = (value >>> 24);
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  this[offset] = (value >>> 24);
	  this[offset + 1] = (value >>> 16);
	  this[offset + 2] = (value >>> 8);
	  this[offset + 3] = (value & 0xff);
	  return offset + 4
	};

	Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
	  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
	});

	Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
	  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
	});

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  const len = end - start;

	  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
	    // Use built-in when available, missing from IE11
	    this.copyWithin(targetStart, start, end);
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, end),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	    if (val.length === 1) {
	      const code = val.charCodeAt(0);
	      if ((encoding === 'utf8' && code < 128) ||
	          encoding === 'latin1') {
	        // Fast path: If `val` fits into a single byte, use that numeric value.
	        val = code;
	      }
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  } else if (typeof val === 'boolean') {
	    val = Number(val);
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  let i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    const bytes = Buffer.isBuffer(val)
	      ? val
	      : Buffer.from(val, encoding);
	    const len = bytes.length;
	    if (len === 0) {
	      throw new TypeError('The value "' + val +
	        '" is invalid for argument "value"')
	    }
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// CUSTOM ERRORS
	// =============

	// Simplified versions from Node, changed for Buffer-only usage
	const errors = {};
	function E (sym, getMessage, Base) {
	  errors[sym] = class NodeError extends Base {
	    constructor () {
	      super();

	      Object.defineProperty(this, 'message', {
	        value: getMessage.apply(this, arguments),
	        writable: true,
	        configurable: true
	      });

	      // Add the error code to the name to include it in the stack trace.
	      this.name = `${this.name} [${sym}]`;
	      // Access the stack to generate the error message including the error code
	      // from the name.
	      this.stack; // eslint-disable-line no-unused-expressions
	      // Reset the name to the actual name.
	      delete this.name;
	    }

	    get code () {
	      return sym
	    }

	    set code (value) {
	      Object.defineProperty(this, 'code', {
	        configurable: true,
	        enumerable: true,
	        value,
	        writable: true
	      });
	    }

	    toString () {
	      return `${this.name} [${sym}]: ${this.message}`
	    }
	  };
	}

	E('ERR_BUFFER_OUT_OF_BOUNDS',
	  function (name) {
	    if (name) {
	      return `${name} is outside of buffer bounds`
	    }

	    return 'Attempt to access memory outside buffer bounds'
	  }, RangeError);
	E('ERR_INVALID_ARG_TYPE',
	  function (name, actual) {
	    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
	  }, TypeError);
	E('ERR_OUT_OF_RANGE',
	  function (str, range, input) {
	    let msg = `The value of "${str}" is out of range.`;
	    let received = input;
	    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
	      received = addNumericalSeparator(String(input));
	    } else if (typeof input === 'bigint') {
	      received = String(input);
	      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
	        received = addNumericalSeparator(received);
	      }
	      received += 'n';
	    }
	    msg += ` It must be ${range}. Received ${received}`;
	    return msg
	  }, RangeError);

	function addNumericalSeparator (val) {
	  let res = '';
	  let i = val.length;
	  const start = val[0] === '-' ? 1 : 0;
	  for (; i >= start + 4; i -= 3) {
	    res = `_${val.slice(i - 3, i)}${res}`;
	  }
	  return `${val.slice(0, i)}${res}`
	}

	// CHECK FUNCTIONS
	// ===============

	function checkBounds (buf, offset, byteLength) {
	  validateNumber(offset, 'offset');
	  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
	    boundsError(offset, buf.length - (byteLength + 1));
	  }
	}

	function checkIntBI (value, min, max, buf, offset, byteLength) {
	  if (value > max || value < min) {
	    const n = typeof min === 'bigint' ? 'n' : '';
	    let range;
	    if (byteLength > 3) {
	      if (min === 0 || min === BigInt(0)) {
	        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
	      } else {
	        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
	                `${(byteLength + 1) * 8 - 1}${n}`;
	      }
	    } else {
	      range = `>= ${min}${n} and <= ${max}${n}`;
	    }
	    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
	  }
	  checkBounds(buf, offset, byteLength);
	}

	function validateNumber (value, name) {
	  if (typeof value !== 'number') {
	    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
	  }
	}

	function boundsError (value, length, type) {
	  if (Math.floor(value) !== value) {
	    validateNumber(value, type);
	    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
	  }

	  if (length < 0) {
	    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
	  }

	  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
	                                    `>= ${type ? 1 : 0} and <= ${length}`,
	                                    value)
	}

	// HELPER FUNCTIONS
	// ================

	const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node takes equal signs as end of the Base64 encoding
	  str = str.split('=')[0];
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = str.trim().replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  let codePoint;
	  const length = string.length;
	  let leadSurrogate = null;
	  const bytes = [];

	  for (let i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  const byteArray = [];
	  for (let i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  let c, hi, lo;
	  const byteArray = [];
	  for (let i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  let i;
	  for (i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
	// the `instanceof` check but they should be treated as of that type.
	// See: https://github.com/feross/buffer/issues/166
	function isInstance (obj, type) {
	  return obj instanceof type ||
	    (obj != null && obj.constructor != null && obj.constructor.name != null &&
	      obj.constructor.name === type.name)
	}
	function numberIsNaN (obj) {
	  // For IE11 support
	  return obj !== obj // eslint-disable-line no-self-compare
	}

	// Create lookup table for `toString('hex')`
	// See: https://github.com/feross/buffer/issues/219
	const hexSliceLookupTable = (function () {
	  const alphabet = '0123456789abcdef';
	  const table = new Array(256);
	  for (let i = 0; i < 16; ++i) {
	    const i16 = i * 16;
	    for (let j = 0; j < 16; ++j) {
	      table[i16 + j] = alphabet[i] + alphabet[j];
	    }
	  }
	  return table
	})();

	// Return not function with Error if BigInt not supported
	function defineBigIntMethod (fn) {
	  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
	}

	function BufferBigIntNotDefined () {
	  throw new Error('BigInt not supported')
	}
} (buffer));

var src$1 = {};

var address = {};

var networks$1 = {};

Object.defineProperty(networks$1, '__esModule', { value: true });
networks$1.testnet = networks$1.regtest = networks$1.bitcoin = void 0;
networks$1.bitcoin = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bc',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x00,
  scriptHash: 0x05,
  wif: 0x80,
};
networks$1.regtest = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bcrt',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef,
};
networks$1.testnet = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'tb',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef,
};

var payments$3 = {};

var embed = {};

var script = {};

var bip66$1 = {};

// Reference https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
// Format: 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
// NOTE: SIGHASH byte ignored AND restricted, truncate before use
Object.defineProperty(bip66$1, '__esModule', { value: true });
bip66$1.encode = bip66$1.decode = bip66$1.check = void 0;
function check$d(buffer) {
  if (buffer.length < 8) return false;
  if (buffer.length > 72) return false;
  if (buffer[0] !== 0x30) return false;
  if (buffer[1] !== buffer.length - 2) return false;
  if (buffer[2] !== 0x02) return false;
  const lenR = buffer[3];
  if (lenR === 0) return false;
  if (5 + lenR >= buffer.length) return false;
  if (buffer[4 + lenR] !== 0x02) return false;
  const lenS = buffer[5 + lenR];
  if (lenS === 0) return false;
  if (6 + lenR + lenS !== buffer.length) return false;
  if (buffer[4] & 0x80) return false;
  if (lenR > 1 && buffer[4] === 0x00 && !(buffer[5] & 0x80)) return false;
  if (buffer[lenR + 6] & 0x80) return false;
  if (lenS > 1 && buffer[lenR + 6] === 0x00 && !(buffer[lenR + 7] & 0x80))
    return false;
  return true;
}
bip66$1.check = check$d;
function decode$i(buffer) {
  if (buffer.length < 8) throw new Error('DER sequence length is too short');
  if (buffer.length > 72) throw new Error('DER sequence length is too long');
  if (buffer[0] !== 0x30) throw new Error('Expected DER sequence');
  if (buffer[1] !== buffer.length - 2)
    throw new Error('DER sequence length is invalid');
  if (buffer[2] !== 0x02) throw new Error('Expected DER integer');
  const lenR = buffer[3];
  if (lenR === 0) throw new Error('R length is zero');
  if (5 + lenR >= buffer.length) throw new Error('R length is too long');
  if (buffer[4 + lenR] !== 0x02) throw new Error('Expected DER integer (2)');
  const lenS = buffer[5 + lenR];
  if (lenS === 0) throw new Error('S length is zero');
  if (6 + lenR + lenS !== buffer.length) throw new Error('S length is invalid');
  if (buffer[4] & 0x80) throw new Error('R value is negative');
  if (lenR > 1 && buffer[4] === 0x00 && !(buffer[5] & 0x80))
    throw new Error('R value excessively padded');
  if (buffer[lenR + 6] & 0x80) throw new Error('S value is negative');
  if (lenS > 1 && buffer[lenR + 6] === 0x00 && !(buffer[lenR + 7] & 0x80))
    throw new Error('S value excessively padded');
  // non-BIP66 - extract R, S values
  return {
    r: buffer.slice(4, 4 + lenR),
    s: buffer.slice(6 + lenR),
  };
}
bip66$1.decode = decode$i;
/*
 * Expects r and s to be positive DER integers.
 *
 * The DER format uses the most significant bit as a sign bit (& 0x80).
 * If the significant bit is set AND the integer is positive, a 0x00 is prepended.
 *
 * Examples:
 *
 *      0 =>     0x00
 *      1 =>     0x01
 *     -1 =>     0xff
 *    127 =>     0x7f
 *   -127 =>     0x81
 *    128 =>   0x0080
 *   -128 =>     0x80
 *    255 =>   0x00ff
 *   -255 =>   0xff01
 *  16300 =>   0x3fac
 * -16300 =>   0xc054
 *  62300 => 0x00f35c
 * -62300 => 0xff0ca4
 */
function encode$j(r, s) {
  const lenR = r.length;
  const lenS = s.length;
  if (lenR === 0) throw new Error('R length is zero');
  if (lenS === 0) throw new Error('S length is zero');
  if (lenR > 33) throw new Error('R length is too long');
  if (lenS > 33) throw new Error('S length is too long');
  if (r[0] & 0x80) throw new Error('R value is negative');
  if (s[0] & 0x80) throw new Error('S value is negative');
  if (lenR > 1 && r[0] === 0x00 && !(r[1] & 0x80))
    throw new Error('R value excessively padded');
  if (lenS > 1 && s[0] === 0x00 && !(s[1] & 0x80))
    throw new Error('S value excessively padded');
  const signature = buffer.Buffer.allocUnsafe(6 + lenR + lenS);
  // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
  signature[0] = 0x30;
  signature[1] = signature.length - 2;
  signature[2] = 0x02;
  signature[3] = r.length;
  r.copy(signature, 4);
  signature[4 + lenR] = 0x02;
  signature[5 + lenR] = s.length;
  s.copy(signature, 6 + lenR);
  return signature;
}
bip66$1.encode = encode$j;

var ops = {};

Object.defineProperty(ops, '__esModule', { value: true });
ops.REVERSE_OPS = ops.OPS = void 0;
const OPS$8 = {
  OP_FALSE: 0,
  OP_0: 0,
  OP_PUSHDATA1: 76,
  OP_PUSHDATA2: 77,
  OP_PUSHDATA4: 78,
  OP_1NEGATE: 79,
  OP_RESERVED: 80,
  OP_TRUE: 81,
  OP_1: 81,
  OP_2: 82,
  OP_3: 83,
  OP_4: 84,
  OP_5: 85,
  OP_6: 86,
  OP_7: 87,
  OP_8: 88,
  OP_9: 89,
  OP_10: 90,
  OP_11: 91,
  OP_12: 92,
  OP_13: 93,
  OP_14: 94,
  OP_15: 95,
  OP_16: 96,
  OP_NOP: 97,
  OP_VER: 98,
  OP_IF: 99,
  OP_NOTIF: 100,
  OP_VERIF: 101,
  OP_VERNOTIF: 102,
  OP_ELSE: 103,
  OP_ENDIF: 104,
  OP_VERIFY: 105,
  OP_RETURN: 106,
  OP_TOALTSTACK: 107,
  OP_FROMALTSTACK: 108,
  OP_2DROP: 109,
  OP_2DUP: 110,
  OP_3DUP: 111,
  OP_2OVER: 112,
  OP_2ROT: 113,
  OP_2SWAP: 114,
  OP_IFDUP: 115,
  OP_DEPTH: 116,
  OP_DROP: 117,
  OP_DUP: 118,
  OP_NIP: 119,
  OP_OVER: 120,
  OP_PICK: 121,
  OP_ROLL: 122,
  OP_ROT: 123,
  OP_SWAP: 124,
  OP_TUCK: 125,
  OP_CAT: 126,
  OP_SUBSTR: 127,
  OP_LEFT: 128,
  OP_RIGHT: 129,
  OP_SIZE: 130,
  OP_INVERT: 131,
  OP_AND: 132,
  OP_OR: 133,
  OP_XOR: 134,
  OP_EQUAL: 135,
  OP_EQUALVERIFY: 136,
  OP_RESERVED1: 137,
  OP_RESERVED2: 138,
  OP_1ADD: 139,
  OP_1SUB: 140,
  OP_2MUL: 141,
  OP_2DIV: 142,
  OP_NEGATE: 143,
  OP_ABS: 144,
  OP_NOT: 145,
  OP_0NOTEQUAL: 146,
  OP_ADD: 147,
  OP_SUB: 148,
  OP_MUL: 149,
  OP_DIV: 150,
  OP_MOD: 151,
  OP_LSHIFT: 152,
  OP_RSHIFT: 153,
  OP_BOOLAND: 154,
  OP_BOOLOR: 155,
  OP_NUMEQUAL: 156,
  OP_NUMEQUALVERIFY: 157,
  OP_NUMNOTEQUAL: 158,
  OP_LESSTHAN: 159,
  OP_GREATERTHAN: 160,
  OP_LESSTHANOREQUAL: 161,
  OP_GREATERTHANOREQUAL: 162,
  OP_MIN: 163,
  OP_MAX: 164,
  OP_WITHIN: 165,
  OP_RIPEMD160: 166,
  OP_SHA1: 167,
  OP_SHA256: 168,
  OP_HASH160: 169,
  OP_HASH256: 170,
  OP_CODESEPARATOR: 171,
  OP_CHECKSIG: 172,
  OP_CHECKSIGVERIFY: 173,
  OP_CHECKMULTISIG: 174,
  OP_CHECKMULTISIGVERIFY: 175,
  OP_NOP1: 176,
  OP_NOP2: 177,
  OP_CHECKLOCKTIMEVERIFY: 177,
  OP_NOP3: 178,
  OP_CHECKSEQUENCEVERIFY: 178,
  OP_NOP4: 179,
  OP_NOP5: 180,
  OP_NOP6: 181,
  OP_NOP7: 182,
  OP_NOP8: 183,
  OP_NOP9: 184,
  OP_NOP10: 185,
  OP_CHECKSIGADD: 186,
  OP_PUBKEYHASH: 253,
  OP_PUBKEY: 254,
  OP_INVALIDOPCODE: 255,
};
ops.OPS = OPS$8;
const REVERSE_OPS = {};
ops.REVERSE_OPS = REVERSE_OPS;
for (const op of Object.keys(OPS$8)) {
  const code = OPS$8[op];
  REVERSE_OPS[code] = op;
}

var push_data = {};

Object.defineProperty(push_data, '__esModule', { value: true });
push_data.decode = push_data.encode = push_data.encodingLength = void 0;
const ops_1 = ops;
function encodingLength$2(i) {
  return i < ops_1.OPS.OP_PUSHDATA1 ? 1 : i <= 0xff ? 2 : i <= 0xffff ? 3 : 5;
}
push_data.encodingLength = encodingLength$2;
function encode$i(buffer, num, offset) {
  const size = encodingLength$2(num);
  // ~6 bit
  if (size === 1) {
    buffer.writeUInt8(num, offset);
    // 8 bit
  } else if (size === 2) {
    buffer.writeUInt8(ops_1.OPS.OP_PUSHDATA1, offset);
    buffer.writeUInt8(num, offset + 1);
    // 16 bit
  } else if (size === 3) {
    buffer.writeUInt8(ops_1.OPS.OP_PUSHDATA2, offset);
    buffer.writeUInt16LE(num, offset + 1);
    // 32 bit
  } else {
    buffer.writeUInt8(ops_1.OPS.OP_PUSHDATA4, offset);
    buffer.writeUInt32LE(num, offset + 1);
  }
  return size;
}
push_data.encode = encode$i;
function decode$h(buffer, offset) {
  const opcode = buffer.readUInt8(offset);
  let num;
  let size;
  // ~6 bit
  if (opcode < ops_1.OPS.OP_PUSHDATA1) {
    num = opcode;
    size = 1;
    // 8 bit
  } else if (opcode === ops_1.OPS.OP_PUSHDATA1) {
    if (offset + 2 > buffer.length) return null;
    num = buffer.readUInt8(offset + 1);
    size = 2;
    // 16 bit
  } else if (opcode === ops_1.OPS.OP_PUSHDATA2) {
    if (offset + 3 > buffer.length) return null;
    num = buffer.readUInt16LE(offset + 1);
    size = 3;
    // 32 bit
  } else {
    if (offset + 5 > buffer.length) return null;
    if (opcode !== ops_1.OPS.OP_PUSHDATA4) throw new Error('Unexpected opcode');
    num = buffer.readUInt32LE(offset + 1);
    size = 5;
  }
  return {
    opcode,
    number: num,
    size,
  };
}
push_data.decode = decode$h;

var script_number = {};

Object.defineProperty(script_number, '__esModule', { value: true });
script_number.encode = script_number.decode = void 0;
function decode$g(buffer, maxLength, minimal) {
  maxLength = maxLength || 4;
  minimal = minimal === undefined ? true : minimal;
  const length = buffer.length;
  if (length === 0) return 0;
  if (length > maxLength) throw new TypeError('Script number overflow');
  if (minimal) {
    if ((buffer[length - 1] & 0x7f) === 0) {
      if (length <= 1 || (buffer[length - 2] & 0x80) === 0)
        throw new Error('Non-minimally encoded script number');
    }
  }
  // 40-bit
  if (length === 5) {
    const a = buffer.readUInt32LE(0);
    const b = buffer.readUInt8(4);
    if (b & 0x80) return -((b & ~0x80) * 0x100000000 + a);
    return b * 0x100000000 + a;
  }
  // 32-bit / 24-bit / 16-bit / 8-bit
  let result = 0;
  for (let i = 0; i < length; ++i) {
    result |= buffer[i] << (8 * i);
  }
  if (buffer[length - 1] & 0x80)
    return -(result & ~(0x80 << (8 * (length - 1))));
  return result;
}
script_number.decode = decode$g;
function scriptNumSize(i) {
  return i > 0x7fffffff
    ? 5
    : i > 0x7fffff
    ? 4
    : i > 0x7fff
    ? 3
    : i > 0x7f
    ? 2
    : i > 0x00
    ? 1
    : 0;
}
function encode$h(_number) {
  let value = Math.abs(_number);
  const size = scriptNumSize(value);
  const buffer$1 = buffer.Buffer.allocUnsafe(size);
  const negative = _number < 0;
  for (let i = 0; i < size; ++i) {
    buffer$1.writeUInt8(value & 0xff, i);
    value >>= 8;
  }
  if (buffer$1[size - 1] & 0x80) {
    buffer$1.writeUInt8(negative ? 0x80 : 0x00, size - 1);
  } else if (negative) {
    buffer$1[size - 1] |= 0x80;
  }
  return buffer$1;
}
script_number.encode = encode$h;

var script_signature = {};

var types$5 = {};

var types$4 = {
  Array: function (value) { return value !== null && value !== undefined && value.constructor === Array },
  Boolean: function (value) { return typeof value === 'boolean' },
  Function: function (value) { return typeof value === 'function' },
  Nil: function (value) { return value === undefined || value === null },
  Number: function (value) { return typeof value === 'number' },
  Object: function (value) { return typeof value === 'object' },
  String: function (value) { return typeof value === 'string' },
  '': function () { return true }
};

// TODO: deprecate
types$4.Null = types$4.Nil;

for (var typeName$1 in types$4) {
  types$4[typeName$1].toJSON = function (t) {
    return t
  }.bind(null, typeName$1);
}

var native$1 = types$4;

var native = native$1;

function getTypeName (fn) {
  return fn.name || fn.toString().match(/function (.*?)\s*\(/)[1]
}

function getValueTypeName$1 (value) {
  return native.Nil(value) ? '' : getTypeName(value.constructor)
}

function getValue (value) {
  if (native.Function(value)) return ''
  if (native.String(value)) return JSON.stringify(value)
  if (value && native.Object(value)) return ''
  return value
}

function captureStackTrace (e, t) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(e, t);
  }
}

function tfJSON$1 (type) {
  if (native.Function(type)) return type.toJSON ? type.toJSON() : getTypeName(type)
  if (native.Array(type)) return 'Array'
  if (type && native.Object(type)) return 'Object'

  return type !== undefined ? type : ''
}

function tfErrorString (type, value, valueTypeName) {
  var valueJson = getValue(value);

  return 'Expected ' + tfJSON$1(type) + ', got' +
    (valueTypeName !== '' ? ' ' + valueTypeName : '') +
    (valueJson !== '' ? ' ' + valueJson : '')
}

function TfTypeError$1 (type, value, valueTypeName) {
  valueTypeName = valueTypeName || getValueTypeName$1(value);
  this.message = tfErrorString(type, value, valueTypeName);

  captureStackTrace(this, TfTypeError$1);
  this.__type = type;
  this.__value = value;
  this.__valueTypeName = valueTypeName;
}

TfTypeError$1.prototype = Object.create(Error.prototype);
TfTypeError$1.prototype.constructor = TfTypeError$1;

function tfPropertyErrorString (type, label, name, value, valueTypeName) {
  var description = '" of type ';
  if (label === 'key') description = '" with key type ';

  return tfErrorString('property "' + tfJSON$1(name) + description + tfJSON$1(type), value, valueTypeName)
}

function TfPropertyTypeError$1 (type, property, label, value, valueTypeName) {
  if (type) {
    valueTypeName = valueTypeName || getValueTypeName$1(value);
    this.message = tfPropertyErrorString(type, label, property, value, valueTypeName);
  } else {
    this.message = 'Unexpected property "' + property + '"';
  }

  captureStackTrace(this, TfTypeError$1);
  this.__label = label;
  this.__property = property;
  this.__type = type;
  this.__value = value;
  this.__valueTypeName = valueTypeName;
}

TfPropertyTypeError$1.prototype = Object.create(Error.prototype);
TfPropertyTypeError$1.prototype.constructor = TfTypeError$1;

function tfCustomError (expected, actual) {
  return new TfTypeError$1(expected, {}, actual)
}

function tfSubError$1 (e, property, label) {
  // sub child?
  if (e instanceof TfPropertyTypeError$1) {
    property = property + '.' + e.__property;

    e = new TfPropertyTypeError$1(
      e.__type, property, e.__label, e.__value, e.__valueTypeName
    );

  // child?
  } else if (e instanceof TfTypeError$1) {
    e = new TfPropertyTypeError$1(
      e.__type, property, label, e.__value, e.__valueTypeName
    );
  }

  captureStackTrace(e);
  return e
}

var errors = {
  TfTypeError: TfTypeError$1,
  TfPropertyTypeError: TfPropertyTypeError$1,
  tfCustomError: tfCustomError,
  tfSubError: tfSubError$1,
  tfJSON: tfJSON$1,
  getValueTypeName: getValueTypeName$1
};

var extra;
var hasRequiredExtra;

function requireExtra () {
	if (hasRequiredExtra) return extra;
	hasRequiredExtra = 1;
	var NATIVE = native$1;
	var ERRORS = errors;

	function _Buffer (value) {
	  return buffer.Buffer.isBuffer(value)
	}

	function Hex (value) {
	  return typeof value === 'string' && /^([0-9a-f]{2})+$/i.test(value)
	}

	function _LengthN (type, length) {
	  var name = type.toJSON();

	  function Length (value) {
	    if (!type(value)) return false
	    if (value.length === length) return true

	    throw ERRORS.tfCustomError(name + '(Length: ' + length + ')', name + '(Length: ' + value.length + ')')
	  }
	  Length.toJSON = function () { return name };

	  return Length
	}

	var _ArrayN = _LengthN.bind(null, NATIVE.Array);
	var _BufferN = _LengthN.bind(null, _Buffer);
	var _HexN = _LengthN.bind(null, Hex);
	var _StringN = _LengthN.bind(null, NATIVE.String);

	function Range (a, b, f) {
	  f = f || NATIVE.Number;
	  function _range (value, strict) {
	    return f(value, strict) && (value > a) && (value < b)
	  }
	  _range.toJSON = function () {
	    return `${f.toJSON()} between [${a}, ${b}]`
	  };
	  return _range
	}

	var INT53_MAX = Math.pow(2, 53) - 1;

	function Finite (value) {
	  return typeof value === 'number' && isFinite(value)
	}
	function Int8 (value) { return ((value << 24) >> 24) === value }
	function Int16 (value) { return ((value << 16) >> 16) === value }
	function Int32 (value) { return (value | 0) === value }
	function Int53 (value) {
	  return typeof value === 'number' &&
	    value >= -INT53_MAX &&
	    value <= INT53_MAX &&
	    Math.floor(value) === value
	}
	function UInt8 (value) { return (value & 0xff) === value }
	function UInt16 (value) { return (value & 0xffff) === value }
	function UInt32 (value) { return (value >>> 0) === value }
	function UInt53 (value) {
	  return typeof value === 'number' &&
	    value >= 0 &&
	    value <= INT53_MAX &&
	    Math.floor(value) === value
	}

	var types = {
	  ArrayN: _ArrayN,
	  Buffer: _Buffer,
	  BufferN: _BufferN,
	  Finite: Finite,
	  Hex: Hex,
	  HexN: _HexN,
	  Int8: Int8,
	  Int16: Int16,
	  Int32: Int32,
	  Int53: Int53,
	  Range: Range,
	  StringN: _StringN,
	  UInt8: UInt8,
	  UInt16: UInt16,
	  UInt32: UInt32,
	  UInt53: UInt53
	};

	for (var typeName in types) {
	  types[typeName].toJSON = function (t) {
	    return t
	  }.bind(null, typeName);
	}

	extra = types;
	return extra;
}

var ERRORS = errors;
var NATIVE = native$1;

// short-hand
var tfJSON = ERRORS.tfJSON;
var TfTypeError = ERRORS.TfTypeError;
var TfPropertyTypeError = ERRORS.TfPropertyTypeError;
var tfSubError = ERRORS.tfSubError;
var getValueTypeName = ERRORS.getValueTypeName;

var TYPES = {
  arrayOf: function arrayOf (type, options) {
    type = compile(type);
    options = options || {};

    function _arrayOf (array, strict) {
      if (!NATIVE.Array(array)) return false
      if (NATIVE.Nil(array)) return false
      if (options.minLength !== undefined && array.length < options.minLength) return false
      if (options.maxLength !== undefined && array.length > options.maxLength) return false
      if (options.length !== undefined && array.length !== options.length) return false

      return array.every(function (value, i) {
        try {
          return typeforce$4(type, value, strict)
        } catch (e) {
          throw tfSubError(e, i)
        }
      })
    }
    _arrayOf.toJSON = function () {
      var str = '[' + tfJSON(type) + ']';
      if (options.length !== undefined) {
        str += '{' + options.length + '}';
      } else if (options.minLength !== undefined || options.maxLength !== undefined) {
        str += '{' +
          (options.minLength === undefined ? 0 : options.minLength) + ',' +
          (options.maxLength === undefined ? Infinity : options.maxLength) + '}';
      }
      return str
    };

    return _arrayOf
  },

  maybe: function maybe (type) {
    type = compile(type);

    function _maybe (value, strict) {
      return NATIVE.Nil(value) || type(value, strict, maybe)
    }
    _maybe.toJSON = function () { return '?' + tfJSON(type) };

    return _maybe
  },

  map: function map (propertyType, propertyKeyType) {
    propertyType = compile(propertyType);
    if (propertyKeyType) propertyKeyType = compile(propertyKeyType);

    function _map (value, strict) {
      if (!NATIVE.Object(value)) return false
      if (NATIVE.Nil(value)) return false

      for (var propertyName in value) {
        try {
          if (propertyKeyType) {
            typeforce$4(propertyKeyType, propertyName, strict);
          }
        } catch (e) {
          throw tfSubError(e, propertyName, 'key')
        }

        try {
          var propertyValue = value[propertyName];
          typeforce$4(propertyType, propertyValue, strict);
        } catch (e) {
          throw tfSubError(e, propertyName)
        }
      }

      return true
    }

    if (propertyKeyType) {
      _map.toJSON = function () {
        return '{' + tfJSON(propertyKeyType) + ': ' + tfJSON(propertyType) + '}'
      };
    } else {
      _map.toJSON = function () { return '{' + tfJSON(propertyType) + '}' };
    }

    return _map
  },

  object: function object (uncompiled) {
    var type = {};

    for (var typePropertyName in uncompiled) {
      type[typePropertyName] = compile(uncompiled[typePropertyName]);
    }

    function _object (value, strict) {
      if (!NATIVE.Object(value)) return false
      if (NATIVE.Nil(value)) return false

      var propertyName;

      try {
        for (propertyName in type) {
          var propertyType = type[propertyName];
          var propertyValue = value[propertyName];

          typeforce$4(propertyType, propertyValue, strict);
        }
      } catch (e) {
        throw tfSubError(e, propertyName)
      }

      if (strict) {
        for (propertyName in value) {
          if (type[propertyName]) continue

          throw new TfPropertyTypeError(undefined, propertyName)
        }
      }

      return true
    }
    _object.toJSON = function () { return tfJSON(type) };

    return _object
  },

  anyOf: function anyOf () {
    var types = [].slice.call(arguments).map(compile);

    function _anyOf (value, strict) {
      return types.some(function (type) {
        try {
          return typeforce$4(type, value, strict)
        } catch (e) {
          return false
        }
      })
    }
    _anyOf.toJSON = function () { return types.map(tfJSON).join('|') };

    return _anyOf
  },

  allOf: function allOf () {
    var types = [].slice.call(arguments).map(compile);

    function _allOf (value, strict) {
      return types.every(function (type) {
        try {
          return typeforce$4(type, value, strict)
        } catch (e) {
          return false
        }
      })
    }
    _allOf.toJSON = function () { return types.map(tfJSON).join(' & ') };

    return _allOf
  },

  quacksLike: function quacksLike (type) {
    function _quacksLike (value) {
      return type === getValueTypeName(value)
    }
    _quacksLike.toJSON = function () { return type };

    return _quacksLike
  },

  tuple: function tuple () {
    var types = [].slice.call(arguments).map(compile);

    function _tuple (values, strict) {
      if (NATIVE.Nil(values)) return false
      if (NATIVE.Nil(values.length)) return false
      if (strict && (values.length !== types.length)) return false

      return types.every(function (type, i) {
        try {
          return typeforce$4(type, values[i], strict)
        } catch (e) {
          throw tfSubError(e, i)
        }
      })
    }
    _tuple.toJSON = function () { return '(' + types.map(tfJSON).join(', ') + ')' };

    return _tuple
  },

  value: function value (expected) {
    function _value (actual) {
      return actual === expected
    }
    _value.toJSON = function () { return expected };

    return _value
  }
};

// TODO: deprecate
TYPES.oneOf = TYPES.anyOf;

function compile (type) {
  if (NATIVE.String(type)) {
    if (type[0] === '?') return TYPES.maybe(type.slice(1))

    return NATIVE[type] || TYPES.quacksLike(type)
  } else if (type && NATIVE.Object(type)) {
    if (NATIVE.Array(type)) {
      if (type.length !== 1) throw new TypeError('Expected compile() parameter of type Array of length 1')
      return TYPES.arrayOf(type[0])
    }

    return TYPES.object(type)
  } else if (NATIVE.Function(type)) {
    return type
  }

  return TYPES.value(type)
}

function typeforce$4 (type, value, strict, surrogate) {
  if (NATIVE.Function(type)) {
    if (type(value, strict)) return true

    throw new TfTypeError(surrogate || type, value)
  }

  // JIT
  return typeforce$4(compile(type), value, strict)
}

// assign types to typeforce function
for (var typeName in NATIVE) {
  typeforce$4[typeName] = NATIVE[typeName];
}

for (typeName in TYPES) {
  typeforce$4[typeName] = TYPES[typeName];
}

var EXTRA = requireExtra();
for (typeName in EXTRA) {
  typeforce$4[typeName] = EXTRA[typeName];
}

typeforce$4.compile = compile;
typeforce$4.TfTypeError = TfTypeError;
typeforce$4.TfPropertyTypeError = TfPropertyTypeError;

var typeforce_1 = typeforce$4;

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	exports.oneOf =
	  exports.Null =
	  exports.BufferN =
	  exports.Function =
	  exports.UInt32 =
	  exports.UInt8 =
	  exports.tuple =
	  exports.maybe =
	  exports.Hex =
	  exports.Buffer =
	  exports.String =
	  exports.Boolean =
	  exports.Array =
	  exports.Number =
	  exports.Hash256bit =
	  exports.Hash160bit =
	  exports.Buffer256bit =
	  exports.isTaptree =
	  exports.isTapleaf =
	  exports.TAPLEAF_VERSION_MASK =
	  exports.Network =
	  exports.ECPoint =
	  exports.Satoshi =
	  exports.Signer =
	  exports.BIP32Path =
	  exports.UInt31 =
	  exports.isPoint =
	  exports.typeforce =
	    void 0;
	const buffer_1 = buffer;
	exports.typeforce = typeforce_1;
	const ZERO32 = buffer_1.Buffer.alloc(32, 0);
	const EC_P = buffer_1.Buffer.from(
	  'fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f',
	  'hex',
	);
	function isPoint(p) {
	  if (!buffer_1.Buffer.isBuffer(p)) return false;
	  if (p.length < 33) return false;
	  const t = p[0];
	  const x = p.slice(1, 33);
	  if (x.compare(ZERO32) === 0) return false;
	  if (x.compare(EC_P) >= 0) return false;
	  if ((t === 0x02 || t === 0x03) && p.length === 33) {
	    return true;
	  }
	  const y = p.slice(33);
	  if (y.compare(ZERO32) === 0) return false;
	  if (y.compare(EC_P) >= 0) return false;
	  if (t === 0x04 && p.length === 65) return true;
	  return false;
	}
	exports.isPoint = isPoint;
	const UINT31_MAX = Math.pow(2, 31) - 1;
	function UInt31(value) {
	  return exports.typeforce.UInt32(value) && value <= UINT31_MAX;
	}
	exports.UInt31 = UInt31;
	function BIP32Path(value) {
	  return (
	    exports.typeforce.String(value) && !!value.match(/^(m\/)?(\d+'?\/)*\d+'?$/)
	  );
	}
	exports.BIP32Path = BIP32Path;
	BIP32Path.toJSON = () => {
	  return 'BIP32 derivation path';
	};
	function Signer(obj) {
	  return (
	    (exports.typeforce.Buffer(obj.publicKey) ||
	      typeof obj.getPublicKey === 'function') &&
	    typeof obj.sign === 'function'
	  );
	}
	exports.Signer = Signer;
	const SATOSHI_MAX = 21 * 1e14;
	function Satoshi(value) {
	  return exports.typeforce.UInt53(value) && value <= SATOSHI_MAX;
	}
	exports.Satoshi = Satoshi;
	// external dependent types
	exports.ECPoint = exports.typeforce.quacksLike('Point');
	// exposed, external API
	exports.Network = exports.typeforce.compile({
	  messagePrefix: exports.typeforce.oneOf(
	    exports.typeforce.Buffer,
	    exports.typeforce.String,
	  ),
	  bip32: {
	    public: exports.typeforce.UInt32,
	    private: exports.typeforce.UInt32,
	  },
	  pubKeyHash: exports.typeforce.UInt8,
	  scriptHash: exports.typeforce.UInt8,
	  wif: exports.typeforce.UInt8,
	});
	exports.TAPLEAF_VERSION_MASK = 0xfe;
	function isTapleaf(o) {
	  if (!o || !('output' in o)) return false;
	  if (!buffer_1.Buffer.isBuffer(o.output)) return false;
	  if (o.version !== undefined)
	    return (o.version & exports.TAPLEAF_VERSION_MASK) === o.version;
	  return true;
	}
	exports.isTapleaf = isTapleaf;
	function isTaptree(scriptTree) {
	  if (!(0, exports.Array)(scriptTree)) return isTapleaf(scriptTree);
	  if (scriptTree.length !== 2) return false;
	  return scriptTree.every(t => isTaptree(t));
	}
	exports.isTaptree = isTaptree;
	exports.Buffer256bit = exports.typeforce.BufferN(32);
	exports.Hash160bit = exports.typeforce.BufferN(20);
	exports.Hash256bit = exports.typeforce.BufferN(32);
	exports.Number = exports.typeforce.Number;
	exports.Array = exports.typeforce.Array;
	exports.Boolean = exports.typeforce.Boolean;
	exports.String = exports.typeforce.String;
	exports.Buffer = exports.typeforce.Buffer;
	exports.Hex = exports.typeforce.Hex;
	exports.maybe = exports.typeforce.maybe;
	exports.tuple = exports.typeforce.tuple;
	exports.UInt8 = exports.typeforce.UInt8;
	exports.UInt32 = exports.typeforce.UInt32;
	exports.Function = exports.typeforce.Function;
	exports.BufferN = exports.typeforce.BufferN;
	exports.Null = exports.typeforce.Null;
	exports.oneOf = exports.typeforce.oneOf;
} (types$5));

Object.defineProperty(script_signature, '__esModule', { value: true });
script_signature.encode = script_signature.decode = void 0;
const bip66 = bip66$1;
const types$3 = types$5;
const { typeforce: typeforce$3 } = types$3;
const ZERO$1 = buffer.Buffer.alloc(1, 0);
function toDER(x) {
  let i = 0;
  while (x[i] === 0) ++i;
  if (i === x.length) return ZERO$1;
  x = x.slice(i);
  if (x[0] & 0x80) return buffer.Buffer.concat([ZERO$1, x], 1 + x.length);
  return x;
}
function fromDER(x) {
  if (x[0] === 0x00) x = x.slice(1);
  const buffer$1 = buffer.Buffer.alloc(32, 0);
  const bstart = Math.max(0, 32 - x.length);
  x.copy(buffer$1, bstart);
  return buffer$1;
}
// BIP62: 1 byte hashType flag (only 0x01, 0x02, 0x03, 0x81, 0x82 and 0x83 are allowed)
function decode$f(buffer$1) {
  const hashType = buffer$1.readUInt8(buffer$1.length - 1);
  const hashTypeMod = hashType & ~0x80;
  if (hashTypeMod <= 0 || hashTypeMod >= 4)
    throw new Error('Invalid hashType ' + hashType);
  const decoded = bip66.decode(buffer$1.slice(0, -1));
  const r = fromDER(decoded.r);
  const s = fromDER(decoded.s);
  const signature = buffer.Buffer.concat([r, s], 64);
  return { signature, hashType };
}
script_signature.decode = decode$f;
function encode$g(signature, hashType) {
  typeforce$3(
    {
      signature: types$3.BufferN(64),
      hashType: types$3.UInt8,
    },
    { signature, hashType },
  );
  const hashTypeMod = hashType & ~0x80;
  if (hashTypeMod <= 0 || hashTypeMod >= 4)
    throw new Error('Invalid hashType ' + hashType);
  const hashTypeBuffer = buffer.Buffer.allocUnsafe(1);
  hashTypeBuffer.writeUInt8(hashType, 0);
  const r = toDER(signature.slice(0, 32));
  const s = toDER(signature.slice(32, 64));
  return buffer.Buffer.concat([bip66.encode(r, s), hashTypeBuffer]);
}
script_signature.encode = encode$g;

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	exports.signature =
	  exports.number =
	  exports.isCanonicalScriptSignature =
	  exports.isDefinedHashType =
	  exports.isCanonicalPubKey =
	  exports.toStack =
	  exports.fromASM =
	  exports.toASM =
	  exports.decompile =
	  exports.compile =
	  exports.isPushOnly =
	  exports.OPS =
	    void 0;
	const bip66 = bip66$1;
	const ops_1 = ops;
	Object.defineProperty(exports, 'OPS', {
	  enumerable: true,
	  get: function () {
	    return ops_1.OPS;
	  },
	});
	const pushdata = push_data;
	const scriptNumber = script_number;
	const scriptSignature = script_signature;
	const types = types$5;
	const { typeforce } = types;
	const OP_INT_BASE = ops_1.OPS.OP_RESERVED; // OP_1 - 1
	function isOPInt(value) {
	  return (
	    types.Number(value) &&
	    (value === ops_1.OPS.OP_0 ||
	      (value >= ops_1.OPS.OP_1 && value <= ops_1.OPS.OP_16) ||
	      value === ops_1.OPS.OP_1NEGATE)
	  );
	}
	function isPushOnlyChunk(value) {
	  return types.Buffer(value) || isOPInt(value);
	}
	function isPushOnly(value) {
	  return types.Array(value) && value.every(isPushOnlyChunk);
	}
	exports.isPushOnly = isPushOnly;
	function asMinimalOP(buffer) {
	  if (buffer.length === 0) return ops_1.OPS.OP_0;
	  if (buffer.length !== 1) return;
	  if (buffer[0] >= 1 && buffer[0] <= 16) return OP_INT_BASE + buffer[0];
	  if (buffer[0] === 0x81) return ops_1.OPS.OP_1NEGATE;
	}
	function chunksIsBuffer(buf) {
	  return buffer.Buffer.isBuffer(buf);
	}
	function chunksIsArray(buf) {
	  return types.Array(buf);
	}
	function singleChunkIsBuffer(buf) {
	  return buffer.Buffer.isBuffer(buf);
	}
	function compile(chunks) {
	  // TODO: remove me
	  if (chunksIsBuffer(chunks)) return chunks;
	  typeforce(types.Array, chunks);
	  const bufferSize = chunks.reduce((accum, chunk) => {
	    // data chunk
	    if (singleChunkIsBuffer(chunk)) {
	      // adhere to BIP62.3, minimal push policy
	      if (chunk.length === 1 && asMinimalOP(chunk) !== undefined) {
	        return accum + 1;
	      }
	      return accum + pushdata.encodingLength(chunk.length) + chunk.length;
	    }
	    // opcode
	    return accum + 1;
	  }, 0.0);
	  const buffer$1 = buffer.Buffer.allocUnsafe(bufferSize);
	  let offset = 0;
	  chunks.forEach(chunk => {
	    // data chunk
	    if (singleChunkIsBuffer(chunk)) {
	      // adhere to BIP62.3, minimal push policy
	      const opcode = asMinimalOP(chunk);
	      if (opcode !== undefined) {
	        buffer$1.writeUInt8(opcode, offset);
	        offset += 1;
	        return;
	      }
	      offset += pushdata.encode(buffer$1, chunk.length, offset);
	      chunk.copy(buffer$1, offset);
	      offset += chunk.length;
	      // opcode
	    } else {
	      buffer$1.writeUInt8(chunk, offset);
	      offset += 1;
	    }
	  });
	  if (offset !== buffer$1.length) throw new Error('Could not decode chunks');
	  return buffer$1;
	}
	exports.compile = compile;
	function decompile(buffer) {
	  // TODO: remove me
	  if (chunksIsArray(buffer)) return buffer;
	  typeforce(types.Buffer, buffer);
	  const chunks = [];
	  let i = 0;
	  while (i < buffer.length) {
	    const opcode = buffer[i];
	    // data chunk
	    if (opcode > ops_1.OPS.OP_0 && opcode <= ops_1.OPS.OP_PUSHDATA4) {
	      const d = pushdata.decode(buffer, i);
	      // did reading a pushDataInt fail?
	      if (d === null) return null;
	      i += d.size;
	      // attempt to read too much data?
	      if (i + d.number > buffer.length) return null;
	      const data = buffer.slice(i, i + d.number);
	      i += d.number;
	      // decompile minimally
	      const op = asMinimalOP(data);
	      if (op !== undefined) {
	        chunks.push(op);
	      } else {
	        chunks.push(data);
	      }
	      // opcode
	    } else {
	      chunks.push(opcode);
	      i += 1;
	    }
	  }
	  return chunks;
	}
	exports.decompile = decompile;
	function toASM(chunks) {
	  if (chunksIsBuffer(chunks)) {
	    chunks = decompile(chunks);
	  }
	  return chunks
	    .map(chunk => {
	      // data?
	      if (singleChunkIsBuffer(chunk)) {
	        const op = asMinimalOP(chunk);
	        if (op === undefined) return chunk.toString('hex');
	        chunk = op;
	      }
	      // opcode!
	      return ops_1.REVERSE_OPS[chunk];
	    })
	    .join(' ');
	}
	exports.toASM = toASM;
	function fromASM(asm) {
	  typeforce(types.String, asm);
	  return compile(
	    asm.split(' ').map(chunkStr => {
	      // opcode?
	      if (ops_1.OPS[chunkStr] !== undefined) return ops_1.OPS[chunkStr];
	      typeforce(types.Hex, chunkStr);
	      // data!
	      return buffer.Buffer.from(chunkStr, 'hex');
	    }),
	  );
	}
	exports.fromASM = fromASM;
	function toStack(chunks) {
	  chunks = decompile(chunks);
	  typeforce(isPushOnly, chunks);
	  return chunks.map(op => {
	    if (singleChunkIsBuffer(op)) return op;
	    if (op === ops_1.OPS.OP_0) return buffer.Buffer.allocUnsafe(0);
	    return scriptNumber.encode(op - OP_INT_BASE);
	  });
	}
	exports.toStack = toStack;
	function isCanonicalPubKey(buffer) {
	  return types.isPoint(buffer);
	}
	exports.isCanonicalPubKey = isCanonicalPubKey;
	function isDefinedHashType(hashType) {
	  const hashTypeMod = hashType & ~0x80;
	  // return hashTypeMod > SIGHASH_ALL && hashTypeMod < SIGHASH_SINGLE
	  return hashTypeMod > 0x00 && hashTypeMod < 0x04;
	}
	exports.isDefinedHashType = isDefinedHashType;
	function isCanonicalScriptSignature(buffer$1) {
	  if (!buffer.Buffer.isBuffer(buffer$1)) return false;
	  if (!isDefinedHashType(buffer$1[buffer$1.length - 1])) return false;
	  return bip66.check(buffer$1.slice(0, -1));
	}
	exports.isCanonicalScriptSignature = isCanonicalScriptSignature;
	exports.number = scriptNumber;
	exports.signature = scriptSignature;
} (script));

var lazy$8 = {};

Object.defineProperty(lazy$8, '__esModule', { value: true });
lazy$8.value = lazy$8.prop = void 0;
function prop(object, name, f) {
  Object.defineProperty(object, name, {
    configurable: true,
    enumerable: true,
    get() {
      const _value = f.call(this);
      this[name] = _value;
      return _value;
    },
    set(_value) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        value: _value,
        writable: true,
      });
    },
  });
}
lazy$8.prop = prop;
function value(f) {
  let _value;
  return () => {
    if (_value !== undefined) return _value;
    _value = f();
    return _value;
  };
}
lazy$8.value = value;

Object.defineProperty(embed, '__esModule', { value: true });
embed.p2data = void 0;
const networks_1$8 = networks$1;
const bscript$b = script;
const types_1$9 = types$5;
const lazy$7 = lazy$8;
const OPS$7 = bscript$b.OPS;
function stacksEqual$4(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
// output: OP_RETURN ...
function p2data(a, opts) {
  if (!a.data && !a.output) throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  (0, types_1$9.typeforce)(
    {
      network: types_1$9.typeforce.maybe(types_1$9.typeforce.Object),
      output: types_1$9.typeforce.maybe(types_1$9.typeforce.Buffer),
      data: types_1$9.typeforce.maybe(
        types_1$9.typeforce.arrayOf(types_1$9.typeforce.Buffer),
      ),
    },
    a,
  );
  const network = a.network || networks_1$8.bitcoin;
  const o = { name: 'embed', network };
  lazy$7.prop(o, 'output', () => {
    if (!a.data) return;
    return bscript$b.compile([OPS$7.OP_RETURN].concat(a.data));
  });
  lazy$7.prop(o, 'data', () => {
    if (!a.output) return;
    return bscript$b.decompile(a.output).slice(1);
  });
  // extended validation
  if (opts.validate) {
    if (a.output) {
      const chunks = bscript$b.decompile(a.output);
      if (chunks[0] !== OPS$7.OP_RETURN) throw new TypeError('Output is invalid');
      if (!chunks.slice(1).every(types_1$9.typeforce.Buffer))
        throw new TypeError('Output is invalid');
      if (a.data && !stacksEqual$4(a.data, o.data))
        throw new TypeError('Data mismatch');
    }
  }
  return Object.assign(o, a);
}
embed.p2data = p2data;

var p2ms$1 = {};

Object.defineProperty(p2ms$1, '__esModule', { value: true });
p2ms$1.p2ms = void 0;
const networks_1$7 = networks$1;
const bscript$a = script;
const types_1$8 = types$5;
const lazy$6 = lazy$8;
const OPS$6 = bscript$a.OPS;
const OP_INT_BASE = OPS$6.OP_RESERVED; // OP_1 - 1
function stacksEqual$3(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
// input: OP_0 [signatures ...]
// output: m [pubKeys ...] n OP_CHECKMULTISIG
function p2ms(a, opts) {
  if (
    !a.input &&
    !a.output &&
    !(a.pubkeys && a.m !== undefined) &&
    !a.signatures
  )
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  function isAcceptableSignature(x) {
    return (
      bscript$a.isCanonicalScriptSignature(x) ||
      (opts.allowIncomplete && x === OPS$6.OP_0) !== undefined
    );
  }
  (0, types_1$8.typeforce)(
    {
      network: types_1$8.typeforce.maybe(types_1$8.typeforce.Object),
      m: types_1$8.typeforce.maybe(types_1$8.typeforce.Number),
      n: types_1$8.typeforce.maybe(types_1$8.typeforce.Number),
      output: types_1$8.typeforce.maybe(types_1$8.typeforce.Buffer),
      pubkeys: types_1$8.typeforce.maybe(
        types_1$8.typeforce.arrayOf(types_1$8.isPoint),
      ),
      signatures: types_1$8.typeforce.maybe(
        types_1$8.typeforce.arrayOf(isAcceptableSignature),
      ),
      input: types_1$8.typeforce.maybe(types_1$8.typeforce.Buffer),
    },
    a,
  );
  const network = a.network || networks_1$7.bitcoin;
  const o = { network };
  let chunks = [];
  let decoded = false;
  function decode(output) {
    if (decoded) return;
    decoded = true;
    chunks = bscript$a.decompile(output);
    o.m = chunks[0] - OP_INT_BASE;
    o.n = chunks[chunks.length - 2] - OP_INT_BASE;
    o.pubkeys = chunks.slice(1, -2);
  }
  lazy$6.prop(o, 'output', () => {
    if (!a.m) return;
    if (!o.n) return;
    if (!a.pubkeys) return;
    return bscript$a.compile(
      [].concat(
        OP_INT_BASE + a.m,
        a.pubkeys,
        OP_INT_BASE + o.n,
        OPS$6.OP_CHECKMULTISIG,
      ),
    );
  });
  lazy$6.prop(o, 'm', () => {
    if (!o.output) return;
    decode(o.output);
    return o.m;
  });
  lazy$6.prop(o, 'n', () => {
    if (!o.pubkeys) return;
    return o.pubkeys.length;
  });
  lazy$6.prop(o, 'pubkeys', () => {
    if (!a.output) return;
    decode(a.output);
    return o.pubkeys;
  });
  lazy$6.prop(o, 'signatures', () => {
    if (!a.input) return;
    return bscript$a.decompile(a.input).slice(1);
  });
  lazy$6.prop(o, 'input', () => {
    if (!a.signatures) return;
    return bscript$a.compile([OPS$6.OP_0].concat(a.signatures));
  });
  lazy$6.prop(o, 'witness', () => {
    if (!o.input) return;
    return [];
  });
  lazy$6.prop(o, 'name', () => {
    if (!o.m || !o.n) return;
    return `p2ms(${o.m} of ${o.n})`;
  });
  // extended validation
  if (opts.validate) {
    if (a.output) {
      decode(a.output);
      if (!types_1$8.typeforce.Number(chunks[0]))
        throw new TypeError('Output is invalid');
      if (!types_1$8.typeforce.Number(chunks[chunks.length - 2]))
        throw new TypeError('Output is invalid');
      if (chunks[chunks.length - 1] !== OPS$6.OP_CHECKMULTISIG)
        throw new TypeError('Output is invalid');
      if (o.m <= 0 || o.n > 16 || o.m > o.n || o.n !== chunks.length - 3)
        throw new TypeError('Output is invalid');
      if (!o.pubkeys.every(x => (0, types_1$8.isPoint)(x)))
        throw new TypeError('Output is invalid');
      if (a.m !== undefined && a.m !== o.m) throw new TypeError('m mismatch');
      if (a.n !== undefined && a.n !== o.n) throw new TypeError('n mismatch');
      if (a.pubkeys && !stacksEqual$3(a.pubkeys, o.pubkeys))
        throw new TypeError('Pubkeys mismatch');
    }
    if (a.pubkeys) {
      if (a.n !== undefined && a.n !== a.pubkeys.length)
        throw new TypeError('Pubkey count mismatch');
      o.n = a.pubkeys.length;
      if (o.n < o.m) throw new TypeError('Pubkey count cannot be less than m');
    }
    if (a.signatures) {
      if (a.signatures.length < o.m)
        throw new TypeError('Not enough signatures provided');
      if (a.signatures.length > o.m)
        throw new TypeError('Too many signatures provided');
    }
    if (a.input) {
      if (a.input[0] !== OPS$6.OP_0) throw new TypeError('Input is invalid');
      if (
        o.signatures.length === 0 ||
        !o.signatures.every(isAcceptableSignature)
      )
        throw new TypeError('Input has invalid signature(s)');
      if (a.signatures && !stacksEqual$3(a.signatures, o.signatures))
        throw new TypeError('Signature mismatch');
      if (a.m !== undefined && a.m !== a.signatures.length)
        throw new TypeError('Signature count mismatch');
    }
  }
  return Object.assign(o, a);
}
p2ms$1.p2ms = p2ms;

var p2pk$1 = {};

Object.defineProperty(p2pk$1, '__esModule', { value: true });
p2pk$1.p2pk = void 0;
const networks_1$6 = networks$1;
const bscript$9 = script;
const types_1$7 = types$5;
const lazy$5 = lazy$8;
const OPS$5 = bscript$9.OPS;
// input: {signature}
// output: {pubKey} OP_CHECKSIG
function p2pk(a, opts) {
  if (!a.input && !a.output && !a.pubkey && !a.input && !a.signature)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  (0, types_1$7.typeforce)(
    {
      network: types_1$7.typeforce.maybe(types_1$7.typeforce.Object),
      output: types_1$7.typeforce.maybe(types_1$7.typeforce.Buffer),
      pubkey: types_1$7.typeforce.maybe(types_1$7.isPoint),
      signature: types_1$7.typeforce.maybe(bscript$9.isCanonicalScriptSignature),
      input: types_1$7.typeforce.maybe(types_1$7.typeforce.Buffer),
    },
    a,
  );
  const _chunks = lazy$5.value(() => {
    return bscript$9.decompile(a.input);
  });
  const network = a.network || networks_1$6.bitcoin;
  const o = { name: 'p2pk', network };
  lazy$5.prop(o, 'output', () => {
    if (!a.pubkey) return;
    return bscript$9.compile([a.pubkey, OPS$5.OP_CHECKSIG]);
  });
  lazy$5.prop(o, 'pubkey', () => {
    if (!a.output) return;
    return a.output.slice(1, -1);
  });
  lazy$5.prop(o, 'signature', () => {
    if (!a.input) return;
    return _chunks()[0];
  });
  lazy$5.prop(o, 'input', () => {
    if (!a.signature) return;
    return bscript$9.compile([a.signature]);
  });
  lazy$5.prop(o, 'witness', () => {
    if (!o.input) return;
    return [];
  });
  // extended validation
  if (opts.validate) {
    if (a.output) {
      if (a.output[a.output.length - 1] !== OPS$5.OP_CHECKSIG)
        throw new TypeError('Output is invalid');
      if (!(0, types_1$7.isPoint)(o.pubkey))
        throw new TypeError('Output pubkey is invalid');
      if (a.pubkey && !a.pubkey.equals(o.pubkey))
        throw new TypeError('Pubkey mismatch');
    }
    if (a.signature) {
      if (a.input && !a.input.equals(o.input))
        throw new TypeError('Signature mismatch');
    }
    if (a.input) {
      if (_chunks().length !== 1) throw new TypeError('Input is invalid');
      if (!bscript$9.isCanonicalScriptSignature(o.signature))
        throw new TypeError('Input has invalid signature');
    }
  }
  return Object.assign(o, a);
}
p2pk$1.p2pk = p2pk;

var p2pkh$1 = {};

var crypto = {};

var inherits_browserExports = {};
var inherits_browser = {
  get exports(){ return inherits_browserExports; },
  set exports(v){ inherits_browserExports = v; },
};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

var safeBufferExports = {};
var safeBuffer = {
  get exports(){ return safeBufferExports; },
  set exports(v){ safeBufferExports = v; },
};

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

(function (module, exports) {
	/* eslint-disable node/no-deprecated-api */
	var buffer$1 = buffer;
	var Buffer = buffer$1.Buffer;

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key];
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer$1;
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer$1, exports);
	  exports.Buffer = SafeBuffer;
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.prototype = Object.create(Buffer.prototype);

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer);

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	};

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size);
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	  } else {
	    buf.fill(0);
	  }
	  return buf
	};

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	};

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer$1.SlowBuffer(size)
	};
} (safeBuffer, safeBufferExports));

var readableBrowserExports = {};
var readableBrowser = {
  get exports(){ return readableBrowserExports; },
  set exports(v){ readableBrowserExports = v; },
};

var browserExports = {};
var browser$2 = {
  get exports(){ return browserExports; },
  set exports(v){ browserExports = v; },
};

// shim for using process in browser
var process = browser$2.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ());
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop$2() {}

process.on = noop$2;
process.addListener = noop$2;
process.once = noop$2;
process.off = noop$2;
process.removeListener = noop$2;
process.removeAllListeners = noop$2;
process.emit = noop$2;
process.prependListener = noop$2;
process.prependOnceListener = noop$2;

process.listeners = function (name) { return [] };

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

var eventsExports = {};
var events = {
  get exports(){ return eventsExports; },
  set exports(v){ eventsExports = v; },
};

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };

var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
eventsExports.once = once$2;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once$2(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

var streamBrowser = eventsExports.EventEmitter;

const require$$1 = /*@__PURE__*/getAugmentedNamespace(__viteBrowserExternal);

var buffer_list;
var hasRequiredBuffer_list;

function requireBuffer_list () {
	if (hasRequiredBuffer_list) return buffer_list;
	hasRequiredBuffer_list = 1;

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	var _require = buffer,
	    Buffer = _require.Buffer;

	var _require2 = require$$1,
	    inspect = _require2.inspect;

	var custom = inspect && inspect.custom || 'inspect';

	function copyBuffer(src, target, offset) {
	  Buffer.prototype.copy.call(src, target, offset);
	}

	buffer_list =
	/*#__PURE__*/
	function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }

	  _createClass(BufferList, [{
	    key: "push",
	    value: function push(v) {
	      var entry = {
	        data: v,
	        next: null
	      };
	      if (this.length > 0) this.tail.next = entry;else this.head = entry;
	      this.tail = entry;
	      ++this.length;
	    }
	  }, {
	    key: "unshift",
	    value: function unshift(v) {
	      var entry = {
	        data: v,
	        next: this.head
	      };
	      if (this.length === 0) this.tail = entry;
	      this.head = entry;
	      ++this.length;
	    }
	  }, {
	    key: "shift",
	    value: function shift() {
	      if (this.length === 0) return;
	      var ret = this.head.data;
	      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	      --this.length;
	      return ret;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.head = this.tail = null;
	      this.length = 0;
	    }
	  }, {
	    key: "join",
	    value: function join(s) {
	      if (this.length === 0) return '';
	      var p = this.head;
	      var ret = '' + p.data;

	      while (p = p.next) {
	        ret += s + p.data;
	      }

	      return ret;
	    }
	  }, {
	    key: "concat",
	    value: function concat(n) {
	      if (this.length === 0) return Buffer.alloc(0);
	      var ret = Buffer.allocUnsafe(n >>> 0);
	      var p = this.head;
	      var i = 0;

	      while (p) {
	        copyBuffer(p.data, ret, i);
	        i += p.data.length;
	        p = p.next;
	      }

	      return ret;
	    } // Consumes a specified amount of bytes or characters from the buffered data.

	  }, {
	    key: "consume",
	    value: function consume(n, hasStrings) {
	      var ret;

	      if (n < this.head.data.length) {
	        // `slice` is the same for buffers and strings.
	        ret = this.head.data.slice(0, n);
	        this.head.data = this.head.data.slice(n);
	      } else if (n === this.head.data.length) {
	        // First chunk is a perfect match.
	        ret = this.shift();
	      } else {
	        // Result spans more than one buffer.
	        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
	      }

	      return ret;
	    }
	  }, {
	    key: "first",
	    value: function first() {
	      return this.head.data;
	    } // Consumes a specified amount of characters from the buffered data.

	  }, {
	    key: "_getString",
	    value: function _getString(n) {
	      var p = this.head;
	      var c = 1;
	      var ret = p.data;
	      n -= ret.length;

	      while (p = p.next) {
	        var str = p.data;
	        var nb = n > str.length ? str.length : n;
	        if (nb === str.length) ret += str;else ret += str.slice(0, n);
	        n -= nb;

	        if (n === 0) {
	          if (nb === str.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = str.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Consumes a specified amount of bytes from the buffered data.

	  }, {
	    key: "_getBuffer",
	    value: function _getBuffer(n) {
	      var ret = Buffer.allocUnsafe(n);
	      var p = this.head;
	      var c = 1;
	      p.data.copy(ret);
	      n -= p.data.length;

	      while (p = p.next) {
	        var buf = p.data;
	        var nb = n > buf.length ? buf.length : n;
	        buf.copy(ret, ret.length - n, 0, nb);
	        n -= nb;

	        if (n === 0) {
	          if (nb === buf.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = buf.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Make sure the linked list only shows the minimal necessary information.

	  }, {
	    key: custom,
	    value: function value(_, options) {
	      return inspect(this, _objectSpread({}, options, {
	        // Only inspect one level.
	        depth: 0,
	        // It should not recurse.
	        customInspect: false
	      }));
	    }
	  }]);

	  return BufferList;
	}();
	return buffer_list;
}

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        browserExports.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        browserExports.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        browserExports.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        browserExports.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        browserExports.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      browserExports.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      browserExports.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

var destroy_1 = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

var errorsBrowser = {};

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
errorsBrowser.codes = codes;

var ERR_INVALID_OPT_VALUE = errorsBrowser.codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

var state = {
  getHighWaterMark: getHighWaterMark
};

/**
 * Module exports.
 */

var browser$1 = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!commonjsGlobal.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = commonjsGlobal.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

var _stream_writable;
var hasRequired_stream_writable;

function require_stream_writable () {
	if (hasRequired_stream_writable) return _stream_writable;
	hasRequired_stream_writable = 1;

	_stream_writable = Writable;
	// there will be only 2 of these for each stream


	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */

	/*<replacement>*/


	var Duplex;
	/*</replacement>*/

	Writable.WritableState = WritableState;
	/*<replacement>*/

	var internalUtil = {
	  deprecate: browser$1
	};
	/*</replacement>*/

	/*<replacement>*/

	var Stream = streamBrowser;
	/*</replacement>*/


	var Buffer = buffer.Buffer;

	var OurUint8Array = commonjsGlobal.Uint8Array || function () {};

	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}

	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}

	var destroyImpl = destroy_1;

	var _require = state,
	    getHighWaterMark = _require.getHighWaterMark;

	var _require$codes = errorsBrowser.codes,
	    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
	    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
	    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
	    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
	    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

	var errorOrDestroy = destroyImpl.errorOrDestroy;

	inherits_browserExports(Writable, Stream);

	function nop() {}

	function WritableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream,
	  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()

	  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

	  this.finalCalled = false; // drain event flag.

	  this.needDrain = false; // at the start of calling end()

	  this.ending = false; // when end() has been called, and returned

	  this.ended = false; // when 'finish' is emitted

	  this.finished = false; // has it been destroyed

	  this.destroyed = false; // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.

	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.

	  this.length = 0; // a flag to see when we're in the middle of a write.

	  this.writing = false; // when true all writes will be buffered until .uncork() call

	  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.

	  this.sync = true; // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.

	  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  }; // the callback that the user supplies to write(chunk,encoding,cb)


	  this.writecb = null; // the amount that is being written when _write is called.

	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted

	  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams

	  this.prefinished = false; // True if the error was already emitted and should not be thrown again

	  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

	  this.autoDestroy = !!options.autoDestroy; // count buffered requests

	  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two

	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];

	  while (current) {
	    out.push(current);
	    current = current.next;
	  }

	  return out;
	};

	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function writableStateBufferGetter() {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})(); // Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.


	var realHasInstance;

	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function value(object) {
	      if (realHasInstance.call(this, object)) return true;
	      if (this !== Writable) return false;
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function realHasInstance(object) {
	    return object instanceof this;
	  };
	}

	function Writable(options) {
	  Duplex = Duplex || require_stream_duplex(); // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the WritableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex;
	  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
	  this._writableState = new WritableState(options, this, isDuplex); // legacy.

	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	    if (typeof options.final === 'function') this._final = options.final;
	  }

	  Stream.call(this);
	} // Otherwise people can pipe Writable streams, which is just wrong.


	Writable.prototype.pipe = function () {
	  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
	};

	function writeAfterEnd(stream, cb) {
	  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

	  errorOrDestroy(stream, er);
	  browserExports.nextTick(cb, er);
	} // Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.


	function validChunk(stream, state, chunk, cb) {
	  var er;

	  if (chunk === null) {
	    er = new ERR_STREAM_NULL_VALUES();
	  } else if (typeof chunk !== 'string' && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
	  }

	  if (er) {
	    errorOrDestroy(stream, er);
	    browserExports.nextTick(cb, er);
	    return false;
	  }

	  return true;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  var isBuf = !state.objectMode && _isUint8Array(chunk);

	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	  return ret;
	};

	Writable.prototype.cork = function () {
	  this._writableState.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	Object.defineProperty(Writable.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }

	  return chunk;
	}

	Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	}); // if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.

	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);

	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }

	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };

	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }

	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;

	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    browserExports.nextTick(cb, er); // this can emit finish, and it will always happen
	    // after error

	    browserExports.nextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er); // this can emit finish, but finish must
	    // always follow error

	    finishMaybe(stream, state);
	  }
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state) || stream.destroyed;

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      browserExports.nextTick(afterWrite, stream, state, finished, cb);
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	} // Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.


	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	} // if there's something in the buffer waiting, then process it


	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;
	    var allBuffers = true;

	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }

	    buffer.allBuffers = allBuffers;
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite

	    state.pendingcb++;
	    state.lastBufferedRequest = null;

	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }

	    state.bufferedRequestCount = 0;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.

	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  } // ignore unnecessary end() calls.


	  if (!state.ending) endWritable(this, state, cb);
	  return this;
	};

	Object.defineProperty(Writable.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;

	    if (err) {
	      errorOrDestroy(stream, err);
	    }

	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}

	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function' && !state.destroyed) {
	      state.pendingcb++;
	      state.finalCalled = true;
	      browserExports.nextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);

	  if (need) {
	    prefinish(stream, state);

	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');

	      if (state.autoDestroy) {
	        // In case of duplex streams we need a way to detect
	        // if the readable side is ready for autoDestroy as well
	        var rState = stream._readableState;

	        if (!rState || rState.autoDestroy && rState.endEmitted) {
	          stream.destroy();
	        }
	      }
	    }
	  }

	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);

	  if (cb) {
	    if (state.finished) browserExports.nextTick(cb);else stream.once('finish', cb);
	  }

	  state.ended = true;
	  stream.writable = false;
	}

	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;

	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  } // reuse the free corkReq.


	  state.corkedRequestsFree.next = corkReq;
	}

	Object.defineProperty(Writable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._writableState === undefined) {
	      return false;
	    }

	    return this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._writableState.destroyed = value;
	  }
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;

	Writable.prototype._destroy = function (err, cb) {
	  cb(err);
	};
	return _stream_writable;
}

var _stream_duplex;
var hasRequired_stream_duplex;

function require_stream_duplex () {
	if (hasRequired_stream_duplex) return _stream_duplex;
	hasRequired_stream_duplex = 1;
	/*<replacement>*/

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];

	  for (var key in obj) {
	    keys.push(key);
	  }

	  return keys;
	};
	/*</replacement>*/


	_stream_duplex = Duplex;

	var Readable = require_stream_readable();

	var Writable = require_stream_writable();

	inherits_browserExports(Duplex, Readable);

	{
	  // Allow the keys array to be GC'ed.
	  var keys = objectKeys(Writable.prototype);

	  for (var v = 0; v < keys.length; v++) {
	    var method = keys[v];
	    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	  }
	}

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	  Readable.call(this, options);
	  Writable.call(this, options);
	  this.allowHalfOpen = true;

	  if (options) {
	    if (options.readable === false) this.readable = false;
	    if (options.writable === false) this.writable = false;

	    if (options.allowHalfOpen === false) {
	      this.allowHalfOpen = false;
	      this.once('end', onend);
	    }
	  }
	}

	Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	}); // the no-half-open enforcer

	function onend() {
	  // If the writable side ended, then we're ok.
	  if (this._writableState.ended) return; // no more data can be written.
	  // But allow more writes to happen in this tick.

	  browserExports.nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});
	return _stream_duplex;
}

var string_decoder = {};

/*<replacement>*/

var Buffer$d = safeBufferExports.Buffer;
/*</replacement>*/

var isEncoding = Buffer$d.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
}
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer$d.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
string_decoder.StringDecoder = StringDecoder$1;
function StringDecoder$1(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer$d.allocUnsafe(nb);
}

StringDecoder$1.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder$1.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder$1.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder$1.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

var ERR_STREAM_PREMATURE_CLOSE = errorsBrowser.codes.ERR_STREAM_PREMATURE_CLOSE;

function once$1(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop$1() {}

function isRequest$1(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos$1(stream, opts, callback) {
  if (typeof opts === 'function') return eos$1(stream, null, opts);
  if (!opts) opts = {};
  callback = once$1(callback || noop$1);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest$1(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

var endOfStream = eos$1;

var async_iterator;
var hasRequiredAsync_iterator;

function requireAsync_iterator () {
	if (hasRequiredAsync_iterator) return async_iterator;
	hasRequiredAsync_iterator = 1;

	var _Object$setPrototypeO;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var finished = endOfStream;

	var kLastResolve = Symbol('lastResolve');
	var kLastReject = Symbol('lastReject');
	var kError = Symbol('error');
	var kEnded = Symbol('ended');
	var kLastPromise = Symbol('lastPromise');
	var kHandlePromise = Symbol('handlePromise');
	var kStream = Symbol('stream');

	function createIterResult(value, done) {
	  return {
	    value: value,
	    done: done
	  };
	}

	function readAndResolve(iter) {
	  var resolve = iter[kLastResolve];

	  if (resolve !== null) {
	    var data = iter[kStream].read(); // we defer if data is null
	    // we can be expecting either 'end' or
	    // 'error'

	    if (data !== null) {
	      iter[kLastPromise] = null;
	      iter[kLastResolve] = null;
	      iter[kLastReject] = null;
	      resolve(createIterResult(data, false));
	    }
	  }
	}

	function onReadable(iter) {
	  // we wait for the next tick, because it might
	  // emit an error with process.nextTick
	  browserExports.nextTick(readAndResolve, iter);
	}

	function wrapForNext(lastPromise, iter) {
	  return function (resolve, reject) {
	    lastPromise.then(function () {
	      if (iter[kEnded]) {
	        resolve(createIterResult(undefined, true));
	        return;
	      }

	      iter[kHandlePromise](resolve, reject);
	    }, reject);
	  };
	}

	var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
	  get stream() {
	    return this[kStream];
	  },

	  next: function next() {
	    var _this = this;

	    // if we have detected an error in the meanwhile
	    // reject straight away
	    var error = this[kError];

	    if (error !== null) {
	      return Promise.reject(error);
	    }

	    if (this[kEnded]) {
	      return Promise.resolve(createIterResult(undefined, true));
	    }

	    if (this[kStream].destroyed) {
	      // We need to defer via nextTick because if .destroy(err) is
	      // called, the error will be emitted via nextTick, and
	      // we cannot guarantee that there is no error lingering around
	      // waiting to be emitted.
	      return new Promise(function (resolve, reject) {
	        browserExports.nextTick(function () {
	          if (_this[kError]) {
	            reject(_this[kError]);
	          } else {
	            resolve(createIterResult(undefined, true));
	          }
	        });
	      });
	    } // if we have multiple next() calls
	    // we will wait for the previous Promise to finish
	    // this logic is optimized to support for await loops,
	    // where next() is only called once at a time


	    var lastPromise = this[kLastPromise];
	    var promise;

	    if (lastPromise) {
	      promise = new Promise(wrapForNext(lastPromise, this));
	    } else {
	      // fast path needed to support multiple this.push()
	      // without triggering the next() queue
	      var data = this[kStream].read();

	      if (data !== null) {
	        return Promise.resolve(createIterResult(data, false));
	      }

	      promise = new Promise(this[kHandlePromise]);
	    }

	    this[kLastPromise] = promise;
	    return promise;
	  }
	}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
	  return this;
	}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
	  var _this2 = this;

	  // destroy(err, cb) is a private API
	  // we can guarantee we have that here, because we control the
	  // Readable class this is attached to
	  return new Promise(function (resolve, reject) {
	    _this2[kStream].destroy(null, function (err) {
	      if (err) {
	        reject(err);
	        return;
	      }

	      resolve(createIterResult(undefined, true));
	    });
	  });
	}), _Object$setPrototypeO), AsyncIteratorPrototype);

	var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
	  var _Object$create;

	  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
	    value: stream,
	    writable: true
	  }), _defineProperty(_Object$create, kLastResolve, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kLastReject, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kError, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kEnded, {
	    value: stream._readableState.endEmitted,
	    writable: true
	  }), _defineProperty(_Object$create, kHandlePromise, {
	    value: function value(resolve, reject) {
	      var data = iterator[kStream].read();

	      if (data) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        resolve(createIterResult(data, false));
	      } else {
	        iterator[kLastResolve] = resolve;
	        iterator[kLastReject] = reject;
	      }
	    },
	    writable: true
	  }), _Object$create));
	  iterator[kLastPromise] = null;
	  finished(stream, function (err) {
	    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
	      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
	      // returned by next() and store the error

	      if (reject !== null) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        reject(err);
	      }

	      iterator[kError] = err;
	      return;
	    }

	    var resolve = iterator[kLastResolve];

	    if (resolve !== null) {
	      iterator[kLastPromise] = null;
	      iterator[kLastResolve] = null;
	      iterator[kLastReject] = null;
	      resolve(createIterResult(undefined, true));
	    }

	    iterator[kEnded] = true;
	  });
	  stream.on('readable', onReadable.bind(null, iterator));
	  return iterator;
	};

	async_iterator = createReadableStreamAsyncIterator;
	return async_iterator;
}

var fromBrowser;
var hasRequiredFromBrowser;

function requireFromBrowser () {
	if (hasRequiredFromBrowser) return fromBrowser;
	hasRequiredFromBrowser = 1;
	fromBrowser = function () {
	  throw new Error('Readable.from is not available in the browser')
	};
	return fromBrowser;
}

var _stream_readable;
var hasRequired_stream_readable;

function require_stream_readable () {
	if (hasRequired_stream_readable) return _stream_readable;
	hasRequired_stream_readable = 1;

	_stream_readable = Readable;
	/*<replacement>*/

	var Duplex;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;
	/*<replacement>*/

	eventsExports.EventEmitter;

	var EElistenerCount = function EElistenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/


	var Stream = streamBrowser;
	/*</replacement>*/


	var Buffer = buffer.Buffer;

	var OurUint8Array = commonjsGlobal.Uint8Array || function () {};

	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}

	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*<replacement>*/


	var debugUtil = require$$1;

	var debug;

	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function debug() {};
	}
	/*</replacement>*/


	var BufferList = requireBuffer_list();

	var destroyImpl = destroy_1;

	var _require = state,
	    getHighWaterMark = _require.getHighWaterMark;

	var _require$codes = errorsBrowser.codes,
	    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;

	inherits_browserExports(Readable, Stream);

	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
	  // userland ones.  NEVER DO THIS. This is here only because this code needs
	  // to continue to work with older versions of Node.js that do not include
	  // the prependListener() method. The goal is to eventually remove this hack.

	  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}

	function ReadableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"

	  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()

	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.

	  this.sync = true; // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.

	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	  this.paused = true; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

	  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

	  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

	  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;

	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = string_decoder.StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  Duplex = Duplex || require_stream_duplex();
	  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the ReadableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex;
	  this._readableState = new ReadableState(options, this, isDuplex); // legacy

	  this.readable = true;

	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }

	  Stream.call(this);
	}

	Object.defineProperty(Readable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	  }
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;

	Readable.prototype._destroy = function (err, cb) {
	  cb(err);
	}; // Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.


	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;

	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;

	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }

	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }

	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	}; // Unshift should *always* be something directly out of read()


	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};

	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  debug('readableAddChunk', chunk);
	  var state = stream._readableState;

	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

	    if (er) {
	      errorOrDestroy(stream, er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }

	      if (addToFront) {
	        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
	      } else if (state.destroyed) {
	        return false;
	      } else {
	        state.reading = false;

	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	      maybeReadMore(stream, state);
	    }
	  } // We can push more data if we are below the highWaterMark.
	  // Also, if we have no data yet, we can stand some more bytes.
	  // This is to work around cases where hwm=0, such as the repl.


	  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}

	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    state.awaitDrain = 0;
	    stream.emit('data', chunk);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	    if (state.needReadable) emitReadable(stream);
	  }

	  maybeReadMore(stream, state);
	}

	function chunkInvalid(state, chunk) {
	  var er;

	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
	  }

	  return er;
	}

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	}; // backwards compatibility.


	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = string_decoder.StringDecoder;
	  var decoder = new StringDecoder(enc);
	  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

	  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

	  var p = this._readableState.buffer.head;
	  var content = '';

	  while (p !== null) {
	    content += decoder.write(p.data);
	    p = p.next;
	  }

	  this._readableState.buffer.clear();

	  if (content !== '') this._readableState.buffer.push(content);
	  this._readableState.length = content.length;
	  return this;
	}; // Don't raise the hwm > 1GB


	var MAX_HWM = 0x40000000;

	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }

	  return n;
	} // This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;

	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  } // If we're asking for more than the current hwm, then raise the hwm.


	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n; // Don't have enough

	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }

	  return state.length;
	} // you can override either this method, or the async _read(n) below.


	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.

	  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  } // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	  // if we need a readable event, then we need to do some reading.


	  var doRead = state.needReadable;
	  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  } // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.


	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true; // if the length is currently zero, then we *need* a readable event.

	    if (state.length === 0) state.needReadable = true; // call internal read method

	    this._read(state.highWaterMark);

	    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.

	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = state.length <= state.highWaterMark;
	    n = 0;
	  } else {
	    state.length -= n;
	    state.awaitDrain = 0;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};

	function onEofChunk(stream, state) {
	  debug('onEofChunk');
	  if (state.ended) return;

	  if (state.decoder) {
	    var chunk = state.decoder.end();

	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }

	  state.ended = true;

	  if (state.sync) {
	    // if we are sync, wait until next tick to emit the data.
	    // Otherwise we risk emitting data in the flow()
	    // the readable code triggers during a read() call
	    emitReadable(stream);
	  } else {
	    // emit 'readable' now to make sure it gets picked up.
	    state.needReadable = false;

	    if (!state.emittedReadable) {
	      state.emittedReadable = true;
	      emitReadable_(stream);
	    }
	  }
	} // Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.


	function emitReadable(stream) {
	  var state = stream._readableState;
	  debug('emitReadable', state.needReadable, state.emittedReadable);
	  state.needReadable = false;

	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    browserExports.nextTick(emitReadable_, stream);
	  }
	}

	function emitReadable_(stream) {
	  var state = stream._readableState;
	  debug('emitReadable_', state.destroyed, state.length, state.ended);

	  if (!state.destroyed && (state.length || state.ended)) {
	    stream.emit('readable');
	    state.emittedReadable = false;
	  } // The stream needs another readable event if
	  // 1. It is not flowing, as the flow mechanism will take
	  //    care of it.
	  // 2. It is not ended.
	  // 3. It is below the highWaterMark, so we can schedule
	  //    another readable later.


	  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
	  flow(stream);
	} // at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.


	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    browserExports.nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  // Attempt to read more data if we should.
	  //
	  // The conditions for reading more data are (one of):
	  // - Not enough data buffered (state.length < state.highWaterMark). The loop
	  //   is responsible for filling the buffer with enough data if such data
	  //   is available. If highWaterMark is 0 and we are not in the flowing mode
	  //   we should _not_ attempt to buffer any extra data. We'll get more data
	  //   when the stream consumer calls read() instead.
	  // - No data in the buffer, and the stream is in flowing mode. In this mode
	  //   the loop below is responsible for ensuring read() is called. Failing to
	  //   call read here would abort the flow and there's no other mechanism for
	  //   continuing the flow if the stream consumer has just subscribed to the
	  //   'data' event.
	  //
	  // In addition to the above conditions to keep reading data, the following
	  // conditions prevent the data from being read:
	  // - The stream has ended (state.ended).
	  // - There is already a pending 'read' operation (state.reading). This is a
	  //   case where the the stream has called the implementation defined _read()
	  //   method, but they are processing the call asynchronously and have _not_
	  //   called push() with new data. In this case we skip performing more
	  //   read()s. The execution ends in this method again after the _read() ends
	  //   up calling push() with more data.
	  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
	    var len = state.length;
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length) // didn't get any data, stop spinning.
	      break;
	  }

	  state.readingMore = false;
	} // abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.


	Readable.prototype._read = function (n) {
	  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;

	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;

	    default:
	      state.pipes.push(dest);
	      break;
	  }

	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== browserExports.stdout && dest !== browserExports.stderr;
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) browserExports.nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);

	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');

	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  } // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.


	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;

	  function cleanup() {
	    debug('cleanup'); // cleanup event handlers once the pipe is broken

	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	    cleanedUp = true; // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.

	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  src.on('data', ondata);

	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    debug('dest.write', ret);

	    if (ret === false) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', state.awaitDrain);
	        state.awaitDrain++;
	      }

	      src.pause();
	    }
	  } // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.


	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
	  } // Make sure our error handler is attached before userland ones.


	  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }

	  dest.once('close', onclose);

	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }

	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  } // tell the dest that it's being piped to


	  dest.emit('pipe', src); // start the flow if it hasn't been started already.

	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function pipeOnDrainFunctionResult() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;

	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = {
	    hasUnpiped: false
	  }; // if we're not piping anywhere, then do nothing.

	  if (state.pipesCount === 0) return this; // just one destination.  most common case.

	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes; // got a match.

	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  } // slow case. multiple pipe destinations.


	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this, {
	        hasUnpiped: false
	      });
	    }

	    return this;
	  } // try to find the right one.


	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this, unpipeInfo);
	  return this;
	}; // set up data events if they are asked for
	// Ensure readable listeners eventually get something


	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	  var state = this._readableState;

	  if (ev === 'data') {
	    // update readableListening so that resume() may be a no-op
	    // a few lines down. This is needed to support once('readable').
	    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

	    if (state.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.flowing = false;
	      state.emittedReadable = false;
	      debug('on readable', state.length, state.reading);

	      if (state.length) {
	        emitReadable(this);
	      } else if (!state.reading) {
	        browserExports.nextTick(nReadingNextTick, this);
	      }
	    }
	  }

	  return res;
	};

	Readable.prototype.addListener = Readable.prototype.on;

	Readable.prototype.removeListener = function (ev, fn) {
	  var res = Stream.prototype.removeListener.call(this, ev, fn);

	  if (ev === 'readable') {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    browserExports.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	Readable.prototype.removeAllListeners = function (ev) {
	  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

	  if (ev === 'readable' || ev === undefined) {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    browserExports.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	function updateReadableListening(self) {
	  var state = self._readableState;
	  state.readableListening = self.listenerCount('readable') > 0;

	  if (state.resumeScheduled && !state.paused) {
	    // flowing needs to be set to true now, otherwise
	    // the upcoming resume will not flow.
	    state.flowing = true; // crude way to check if we should resume
	  } else if (self.listenerCount('data') > 0) {
	    self.resume();
	  }
	}

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	} // pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.


	Readable.prototype.resume = function () {
	  var state = this._readableState;

	  if (!state.flowing) {
	    debug('resume'); // we flow only if there is no one listening
	    // for readable, but we still have to call
	    // resume()

	    state.flowing = !state.readableListening;
	    resume(this, state);
	  }

	  state.paused = false;
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    browserExports.nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  debug('resume', state.reading);

	  if (!state.reading) {
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);

	  if (this._readableState.flowing !== false) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }

	  this._readableState.paused = true;
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);

	  while (state.flowing && stream.read() !== null) {
	  }
	} // wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.


	Readable.prototype.wrap = function (stream) {
	  var _this = this;

	  var state = this._readableState;
	  var paused = false;
	  stream.on('end', function () {
	    debug('wrapped end');

	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) _this.push(chunk);
	    }

	    _this.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = _this.push(chunk);

	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  }); // proxy all the other methods.
	  // important when wrapping filters and duplexes.

	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function methodWrap(method) {
	        return function methodWrapReturnFunction() {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  } // proxy certain important events.


	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
	  } // when we try to consume some more bytes, simply unpause the
	  // underlying stream.


	  this._read = function (n) {
	    debug('wrapped _read', n);

	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return this;
	};

	if (typeof Symbol === 'function') {
	  Readable.prototype[Symbol.asyncIterator] = function () {
	    if (createReadableStreamAsyncIterator === undefined) {
	      createReadableStreamAsyncIterator = requireAsync_iterator();
	    }

	    return createReadableStreamAsyncIterator(this);
	  };
	}

	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.highWaterMark;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState && this._readableState.buffer;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableFlowing', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.flowing;
	  },
	  set: function set(state) {
	    if (this._readableState) {
	      this._readableState.flowing = state;
	    }
	  }
	}); // exposed for testing purposes only.

	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, 'readableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.length;
	  }
	}); // Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.

	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = state.buffer.consume(n, state.decoder);
	  }
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;
	  debug('endReadable', state.endEmitted);

	  if (!state.endEmitted) {
	    state.ended = true;
	    browserExports.nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');

	    if (state.autoDestroy) {
	      // In case of duplex streams we need a way to detect
	      // if the writable side is ready for autoDestroy as well
	      var wState = stream._writableState;

	      if (!wState || wState.autoDestroy && wState.finished) {
	        stream.destroy();
	      }
	    }
	  }
	}

	if (typeof Symbol === 'function') {
	  Readable.from = function (iterable, opts) {
	    if (from === undefined) {
	      from = requireFromBrowser();
	    }

	    return from(Readable, iterable, opts);
	  };
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }

	  return -1;
	}
	return _stream_readable;
}

var _stream_transform = Transform$3;

var _require$codes$1 = errorsBrowser.codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes$1.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$1.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$1.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require_stream_duplex();

inherits_browserExports(Transform$3, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform$3(options) {
  if (!(this instanceof Transform$3)) return new Transform$3(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform$3.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform$3.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform$3.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform$3.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform$3.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

var _stream_passthrough = PassThrough;

var Transform$2 = _stream_transform;

inherits_browserExports(PassThrough, Transform$2);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform$2.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = errorsBrowser.codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = endOfStream;
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

var pipeline_1 = pipeline;

(function (module, exports) {
	exports = module.exports = require_stream_readable();
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = require_stream_writable();
	exports.Duplex = require_stream_duplex();
	exports.Transform = _stream_transform;
	exports.PassThrough = _stream_passthrough;
	exports.finished = endOfStream;
	exports.pipeline = pipeline_1;
} (readableBrowser, readableBrowserExports));

var Buffer$c = safeBufferExports.Buffer;
var Transform$1 = readableBrowserExports.Transform;
var inherits$a = inherits_browserExports;

function throwIfNotStringOrBuffer (val, prefix) {
  if (!Buffer$c.isBuffer(val) && typeof val !== 'string') {
    throw new TypeError(prefix + ' must be a string or a buffer')
  }
}

function HashBase$2 (blockSize) {
  Transform$1.call(this);

  this._block = Buffer$c.allocUnsafe(blockSize);
  this._blockSize = blockSize;
  this._blockOffset = 0;
  this._length = [0, 0, 0, 0];

  this._finalized = false;
}

inherits$a(HashBase$2, Transform$1);

HashBase$2.prototype._transform = function (chunk, encoding, callback) {
  var error = null;
  try {
    this.update(chunk, encoding);
  } catch (err) {
    error = err;
  }

  callback(error);
};

HashBase$2.prototype._flush = function (callback) {
  var error = null;
  try {
    this.push(this.digest());
  } catch (err) {
    error = err;
  }

  callback(error);
};

HashBase$2.prototype.update = function (data, encoding) {
  throwIfNotStringOrBuffer(data, 'Data');
  if (this._finalized) throw new Error('Digest already called')
  if (!Buffer$c.isBuffer(data)) data = Buffer$c.from(data, encoding);

  // consume data
  var block = this._block;
  var offset = 0;
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++];
    this._update();
    this._blockOffset = 0;
  }
  while (offset < data.length) block[this._blockOffset++] = data[offset++];

  // update length
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry;
    carry = (this._length[j] / 0x0100000000) | 0;
    if (carry > 0) this._length[j] -= 0x0100000000 * carry;
  }

  return this
};

HashBase$2.prototype._update = function () {
  throw new Error('_update is not implemented')
};

HashBase$2.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called')
  this._finalized = true;

  var digest = this._digest();
  if (encoding !== undefined) digest = digest.toString(encoding);

  // reset state
  this._block.fill(0);
  this._blockOffset = 0;
  for (var i = 0; i < 4; ++i) this._length[i] = 0;

  return digest
};

HashBase$2.prototype._digest = function () {
  throw new Error('_digest is not implemented')
};

var hashBase = HashBase$2;

var inherits$9 = inherits_browserExports;
var HashBase$1 = hashBase;
var Buffer$b = safeBufferExports.Buffer;

var ARRAY16$1 = new Array(16);

function MD5$1 () {
  HashBase$1.call(this, 64);

  // state
  this._a = 0x67452301;
  this._b = 0xefcdab89;
  this._c = 0x98badcfe;
  this._d = 0x10325476;
}

inherits$9(MD5$1, HashBase$1);

MD5$1.prototype._update = function () {
  var M = ARRAY16$1;
  for (var i = 0; i < 16; ++i) M[i] = this._block.readInt32LE(i * 4);

  var a = this._a;
  var b = this._b;
  var c = this._c;
  var d = this._d;

  a = fnF(a, b, c, d, M[0], 0xd76aa478, 7);
  d = fnF(d, a, b, c, M[1], 0xe8c7b756, 12);
  c = fnF(c, d, a, b, M[2], 0x242070db, 17);
  b = fnF(b, c, d, a, M[3], 0xc1bdceee, 22);
  a = fnF(a, b, c, d, M[4], 0xf57c0faf, 7);
  d = fnF(d, a, b, c, M[5], 0x4787c62a, 12);
  c = fnF(c, d, a, b, M[6], 0xa8304613, 17);
  b = fnF(b, c, d, a, M[7], 0xfd469501, 22);
  a = fnF(a, b, c, d, M[8], 0x698098d8, 7);
  d = fnF(d, a, b, c, M[9], 0x8b44f7af, 12);
  c = fnF(c, d, a, b, M[10], 0xffff5bb1, 17);
  b = fnF(b, c, d, a, M[11], 0x895cd7be, 22);
  a = fnF(a, b, c, d, M[12], 0x6b901122, 7);
  d = fnF(d, a, b, c, M[13], 0xfd987193, 12);
  c = fnF(c, d, a, b, M[14], 0xa679438e, 17);
  b = fnF(b, c, d, a, M[15], 0x49b40821, 22);

  a = fnG(a, b, c, d, M[1], 0xf61e2562, 5);
  d = fnG(d, a, b, c, M[6], 0xc040b340, 9);
  c = fnG(c, d, a, b, M[11], 0x265e5a51, 14);
  b = fnG(b, c, d, a, M[0], 0xe9b6c7aa, 20);
  a = fnG(a, b, c, d, M[5], 0xd62f105d, 5);
  d = fnG(d, a, b, c, M[10], 0x02441453, 9);
  c = fnG(c, d, a, b, M[15], 0xd8a1e681, 14);
  b = fnG(b, c, d, a, M[4], 0xe7d3fbc8, 20);
  a = fnG(a, b, c, d, M[9], 0x21e1cde6, 5);
  d = fnG(d, a, b, c, M[14], 0xc33707d6, 9);
  c = fnG(c, d, a, b, M[3], 0xf4d50d87, 14);
  b = fnG(b, c, d, a, M[8], 0x455a14ed, 20);
  a = fnG(a, b, c, d, M[13], 0xa9e3e905, 5);
  d = fnG(d, a, b, c, M[2], 0xfcefa3f8, 9);
  c = fnG(c, d, a, b, M[7], 0x676f02d9, 14);
  b = fnG(b, c, d, a, M[12], 0x8d2a4c8a, 20);

  a = fnH(a, b, c, d, M[5], 0xfffa3942, 4);
  d = fnH(d, a, b, c, M[8], 0x8771f681, 11);
  c = fnH(c, d, a, b, M[11], 0x6d9d6122, 16);
  b = fnH(b, c, d, a, M[14], 0xfde5380c, 23);
  a = fnH(a, b, c, d, M[1], 0xa4beea44, 4);
  d = fnH(d, a, b, c, M[4], 0x4bdecfa9, 11);
  c = fnH(c, d, a, b, M[7], 0xf6bb4b60, 16);
  b = fnH(b, c, d, a, M[10], 0xbebfbc70, 23);
  a = fnH(a, b, c, d, M[13], 0x289b7ec6, 4);
  d = fnH(d, a, b, c, M[0], 0xeaa127fa, 11);
  c = fnH(c, d, a, b, M[3], 0xd4ef3085, 16);
  b = fnH(b, c, d, a, M[6], 0x04881d05, 23);
  a = fnH(a, b, c, d, M[9], 0xd9d4d039, 4);
  d = fnH(d, a, b, c, M[12], 0xe6db99e5, 11);
  c = fnH(c, d, a, b, M[15], 0x1fa27cf8, 16);
  b = fnH(b, c, d, a, M[2], 0xc4ac5665, 23);

  a = fnI(a, b, c, d, M[0], 0xf4292244, 6);
  d = fnI(d, a, b, c, M[7], 0x432aff97, 10);
  c = fnI(c, d, a, b, M[14], 0xab9423a7, 15);
  b = fnI(b, c, d, a, M[5], 0xfc93a039, 21);
  a = fnI(a, b, c, d, M[12], 0x655b59c3, 6);
  d = fnI(d, a, b, c, M[3], 0x8f0ccc92, 10);
  c = fnI(c, d, a, b, M[10], 0xffeff47d, 15);
  b = fnI(b, c, d, a, M[1], 0x85845dd1, 21);
  a = fnI(a, b, c, d, M[8], 0x6fa87e4f, 6);
  d = fnI(d, a, b, c, M[15], 0xfe2ce6e0, 10);
  c = fnI(c, d, a, b, M[6], 0xa3014314, 15);
  b = fnI(b, c, d, a, M[13], 0x4e0811a1, 21);
  a = fnI(a, b, c, d, M[4], 0xf7537e82, 6);
  d = fnI(d, a, b, c, M[11], 0xbd3af235, 10);
  c = fnI(c, d, a, b, M[2], 0x2ad7d2bb, 15);
  b = fnI(b, c, d, a, M[9], 0xeb86d391, 21);

  this._a = (this._a + a) | 0;
  this._b = (this._b + b) | 0;
  this._c = (this._c + c) | 0;
  this._d = (this._d + d) | 0;
};

MD5$1.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80;
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64);
    this._update();
    this._blockOffset = 0;
  }

  this._block.fill(0, this._blockOffset, 56);
  this._block.writeUInt32LE(this._length[0], 56);
  this._block.writeUInt32LE(this._length[1], 60);
  this._update();

  // produce result
  var buffer = Buffer$b.allocUnsafe(16);
  buffer.writeInt32LE(this._a, 0);
  buffer.writeInt32LE(this._b, 4);
  buffer.writeInt32LE(this._c, 8);
  buffer.writeInt32LE(this._d, 12);
  return buffer
};

function rotl$1 (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fnF (a, b, c, d, m, k, s) {
  return (rotl$1((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + b) | 0
}

function fnG (a, b, c, d, m, k, s) {
  return (rotl$1((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + b) | 0
}

function fnH (a, b, c, d, m, k, s) {
  return (rotl$1((a + (b ^ c ^ d) + m + k) | 0, s) + b) | 0
}

function fnI (a, b, c, d, m, k, s) {
  return (rotl$1((a + ((c ^ (b | (~d)))) + m + k) | 0, s) + b) | 0
}

var md5_js = MD5$1;

var Buffer$a = buffer.Buffer;
var inherits$8 = inherits_browserExports;
var HashBase = hashBase;

var ARRAY16 = new Array(16);

var zl = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var zr = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var sl = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sr = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

var hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
var hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];

function RIPEMD160$1 () {
  HashBase.call(this, 64);

  // state
  this._a = 0x67452301;
  this._b = 0xefcdab89;
  this._c = 0x98badcfe;
  this._d = 0x10325476;
  this._e = 0xc3d2e1f0;
}

inherits$8(RIPEMD160$1, HashBase);

RIPEMD160$1.prototype._update = function () {
  var words = ARRAY16;
  for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4);

  var al = this._a | 0;
  var bl = this._b | 0;
  var cl = this._c | 0;
  var dl = this._d | 0;
  var el = this._e | 0;

  var ar = this._a | 0;
  var br = this._b | 0;
  var cr = this._c | 0;
  var dr = this._d | 0;
  var er = this._e | 0;

  // computation
  for (var i = 0; i < 80; i += 1) {
    var tl;
    var tr;
    if (i < 16) {
      tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i]);
      tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i]);
    } else if (i < 32) {
      tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i]);
      tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i]);
    } else if (i < 48) {
      tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i]);
      tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i]);
    } else if (i < 64) {
      tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i]);
      tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i]);
    } else { // if (i<80) {
      tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i]);
      tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i]);
    }

    al = el;
    el = dl;
    dl = rotl(cl, 10);
    cl = bl;
    bl = tl;

    ar = er;
    er = dr;
    dr = rotl(cr, 10);
    cr = br;
    br = tr;
  }

  // update state
  var t = (this._b + cl + dr) | 0;
  this._b = (this._c + dl + er) | 0;
  this._c = (this._d + el + ar) | 0;
  this._d = (this._e + al + br) | 0;
  this._e = (this._a + bl + cr) | 0;
  this._a = t;
};

RIPEMD160$1.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80;
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64);
    this._update();
    this._blockOffset = 0;
  }

  this._block.fill(0, this._blockOffset, 56);
  this._block.writeUInt32LE(this._length[0], 56);
  this._block.writeUInt32LE(this._length[1], 60);
  this._update();

  // produce result
  var buffer = Buffer$a.alloc ? Buffer$a.alloc(20) : new Buffer$a(20);
  buffer.writeInt32LE(this._a, 0);
  buffer.writeInt32LE(this._b, 4);
  buffer.writeInt32LE(this._c, 8);
  buffer.writeInt32LE(this._d, 12);
  buffer.writeInt32LE(this._e, 16);
  return buffer
};

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fn1 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
}

function fn2 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
}

function fn3 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
}

function fn4 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
}

function fn5 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
}

var ripemd160$1 = RIPEMD160$1;

var sha_jsExports = {};
var sha_js = {
  get exports(){ return sha_jsExports; },
  set exports(v){ sha_jsExports = v; },
};

var Buffer$9 = safeBufferExports.Buffer;

// prototype class for hash functions
function Hash$7 (blockSize, finalSize) {
  this._block = Buffer$9.alloc(blockSize);
  this._finalSize = finalSize;
  this._blockSize = blockSize;
  this._len = 0;
}

Hash$7.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    enc = enc || 'utf8';
    data = Buffer$9.from(data, enc);
  }

  var block = this._block;
  var blockSize = this._blockSize;
  var length = data.length;
  var accum = this._len;

  for (var offset = 0; offset < length;) {
    var assigned = accum % blockSize;
    var remainder = Math.min(length - offset, blockSize - assigned);

    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i];
    }

    accum += remainder;
    offset += remainder;

    if ((accum % blockSize) === 0) {
      this._update(block);
    }
  }

  this._len += length;
  return this
};

Hash$7.prototype.digest = function (enc) {
  var rem = this._len % this._blockSize;

  this._block[rem] = 0x80;

  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
  this._block.fill(0, rem + 1);

  if (rem >= this._finalSize) {
    this._update(this._block);
    this._block.fill(0);
  }

  var bits = this._len * 8;

  // uint32
  if (bits <= 0xffffffff) {
    this._block.writeUInt32BE(bits, this._blockSize - 4);

  // uint64
  } else {
    var lowBits = (bits & 0xffffffff) >>> 0;
    var highBits = (bits - lowBits) / 0x100000000;

    this._block.writeUInt32BE(highBits, this._blockSize - 8);
    this._block.writeUInt32BE(lowBits, this._blockSize - 4);
  }

  this._update(this._block);
  var hash = this._hash();

  return enc ? hash.toString(enc) : hash
};

Hash$7.prototype._update = function () {
  throw new Error('_update must be implemented by subclass')
};

var hash = Hash$7;

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */

var inherits$7 = inherits_browserExports;
var Hash$6 = hash;
var Buffer$8 = safeBufferExports.Buffer;

var K$3 = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
];

var W$5 = new Array(80);

function Sha () {
  this.init();
  this._w = W$5;

  Hash$6.call(this, 64, 56);
}

inherits$7(Sha, Hash$6);

Sha.prototype.init = function () {
  this._a = 0x67452301;
  this._b = 0xefcdab89;
  this._c = 0x98badcfe;
  this._d = 0x10325476;
  this._e = 0xc3d2e1f0;

  return this
};

function rotl5$1 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30$1 (num) {
  return (num << 30) | (num >>> 2)
}

function ft$1 (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha.prototype._update = function (M) {
  var W = this._w;

  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4);
  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20);
    var t = (rotl5$1(a) + ft$1(s, b, c, d) + e + W[j] + K$3[s]) | 0;

    e = d;
    d = c;
    c = rotl30$1(b);
    b = a;
    a = t;
  }

  this._a = (a + this._a) | 0;
  this._b = (b + this._b) | 0;
  this._c = (c + this._c) | 0;
  this._d = (d + this._d) | 0;
  this._e = (e + this._e) | 0;
};

Sha.prototype._hash = function () {
  var H = Buffer$8.allocUnsafe(20);

  H.writeInt32BE(this._a | 0, 0);
  H.writeInt32BE(this._b | 0, 4);
  H.writeInt32BE(this._c | 0, 8);
  H.writeInt32BE(this._d | 0, 12);
  H.writeInt32BE(this._e | 0, 16);

  return H
};

var sha$1 = Sha;

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var inherits$6 = inherits_browserExports;
var Hash$5 = hash;
var Buffer$7 = safeBufferExports.Buffer;

var K$2 = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
];

var W$4 = new Array(80);

function Sha1 () {
  this.init();
  this._w = W$4;

  Hash$5.call(this, 64, 56);
}

inherits$6(Sha1, Hash$5);

Sha1.prototype.init = function () {
  this._a = 0x67452301;
  this._b = 0xefcdab89;
  this._c = 0x98badcfe;
  this._d = 0x10325476;
  this._e = 0xc3d2e1f0;

  return this
};

function rotl1 (num) {
  return (num << 1) | (num >>> 31)
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha1.prototype._update = function (M) {
  var W = this._w;

  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4);
  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]);

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20);
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K$2[s]) | 0;

    e = d;
    d = c;
    c = rotl30(b);
    b = a;
    a = t;
  }

  this._a = (a + this._a) | 0;
  this._b = (b + this._b) | 0;
  this._c = (c + this._c) | 0;
  this._d = (d + this._d) | 0;
  this._e = (e + this._e) | 0;
};

Sha1.prototype._hash = function () {
  var H = Buffer$7.allocUnsafe(20);

  H.writeInt32BE(this._a | 0, 0);
  H.writeInt32BE(this._b | 0, 4);
  H.writeInt32BE(this._c | 0, 8);
  H.writeInt32BE(this._d | 0, 12);
  H.writeInt32BE(this._e | 0, 16);

  return H
};

var sha1$1 = Sha1;

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits$5 = inherits_browserExports;
var Hash$4 = hash;
var Buffer$6 = safeBufferExports.Buffer;

var K$1 = [
  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
];

var W$3 = new Array(64);

function Sha256$1 () {
  this.init();

  this._w = W$3; // new Array(64)

  Hash$4.call(this, 64, 56);
}

inherits$5(Sha256$1, Hash$4);

Sha256$1.prototype.init = function () {
  this._a = 0x6a09e667;
  this._b = 0xbb67ae85;
  this._c = 0x3c6ef372;
  this._d = 0xa54ff53a;
  this._e = 0x510e527f;
  this._f = 0x9b05688c;
  this._g = 0x1f83d9ab;
  this._h = 0x5be0cd19;

  return this
};

function ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj$1 (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0$1 (x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
}

function sigma1$1 (x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
}

function gamma0 (x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
}

function gamma1 (x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
}

Sha256$1.prototype._update = function (M) {
  var W = this._w;

  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;
  var f = this._f | 0;
  var g = this._g | 0;
  var h = this._h | 0;

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4);
  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0;

  for (var j = 0; j < 64; ++j) {
    var T1 = (h + sigma1$1(e) + ch(e, f, g) + K$1[j] + W[j]) | 0;
    var T2 = (sigma0$1(a) + maj$1(a, b, c)) | 0;

    h = g;
    g = f;
    f = e;
    e = (d + T1) | 0;
    d = c;
    c = b;
    b = a;
    a = (T1 + T2) | 0;
  }

  this._a = (a + this._a) | 0;
  this._b = (b + this._b) | 0;
  this._c = (c + this._c) | 0;
  this._d = (d + this._d) | 0;
  this._e = (e + this._e) | 0;
  this._f = (f + this._f) | 0;
  this._g = (g + this._g) | 0;
  this._h = (h + this._h) | 0;
};

Sha256$1.prototype._hash = function () {
  var H = Buffer$6.allocUnsafe(32);

  H.writeInt32BE(this._a, 0);
  H.writeInt32BE(this._b, 4);
  H.writeInt32BE(this._c, 8);
  H.writeInt32BE(this._d, 12);
  H.writeInt32BE(this._e, 16);
  H.writeInt32BE(this._f, 20);
  H.writeInt32BE(this._g, 24);
  H.writeInt32BE(this._h, 28);

  return H
};

var sha256$1 = Sha256$1;

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits$4 = inherits_browserExports;
var Sha256 = sha256$1;
var Hash$3 = hash;
var Buffer$5 = safeBufferExports.Buffer;

var W$2 = new Array(64);

function Sha224 () {
  this.init();

  this._w = W$2; // new Array(64)

  Hash$3.call(this, 64, 56);
}

inherits$4(Sha224, Sha256);

Sha224.prototype.init = function () {
  this._a = 0xc1059ed8;
  this._b = 0x367cd507;
  this._c = 0x3070dd17;
  this._d = 0xf70e5939;
  this._e = 0xffc00b31;
  this._f = 0x68581511;
  this._g = 0x64f98fa7;
  this._h = 0xbefa4fa4;

  return this
};

Sha224.prototype._hash = function () {
  var H = Buffer$5.allocUnsafe(28);

  H.writeInt32BE(this._a, 0);
  H.writeInt32BE(this._b, 4);
  H.writeInt32BE(this._c, 8);
  H.writeInt32BE(this._d, 12);
  H.writeInt32BE(this._e, 16);
  H.writeInt32BE(this._f, 20);
  H.writeInt32BE(this._g, 24);

  return H
};

var sha224 = Sha224;

var inherits$3 = inherits_browserExports;
var Hash$2 = hash;
var Buffer$4 = safeBufferExports.Buffer;

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

var W$1 = new Array(160);

function Sha512 () {
  this.init();
  this._w = W$1;

  Hash$2.call(this, 128, 112);
}

inherits$3(Sha512, Hash$2);

Sha512.prototype.init = function () {
  this._ah = 0x6a09e667;
  this._bh = 0xbb67ae85;
  this._ch = 0x3c6ef372;
  this._dh = 0xa54ff53a;
  this._eh = 0x510e527f;
  this._fh = 0x9b05688c;
  this._gh = 0x1f83d9ab;
  this._hh = 0x5be0cd19;

  this._al = 0xf3bcc908;
  this._bl = 0x84caa73b;
  this._cl = 0xfe94f82b;
  this._dl = 0x5f1d36f1;
  this._el = 0xade682d1;
  this._fl = 0x2b3e6c1f;
  this._gl = 0xfb41bd6b;
  this._hl = 0x137e2179;

  return this
};

function Ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
}

function sigma1 (x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
}

function Gamma0 (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
}

function Gamma0l (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
}

function Gamma1 (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
}

function Gamma1l (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
}

function getCarry (a, b) {
  return (a >>> 0) < (b >>> 0) ? 1 : 0
}

Sha512.prototype._update = function (M) {
  var W = this._w;

  var ah = this._ah | 0;
  var bh = this._bh | 0;
  var ch = this._ch | 0;
  var dh = this._dh | 0;
  var eh = this._eh | 0;
  var fh = this._fh | 0;
  var gh = this._gh | 0;
  var hh = this._hh | 0;

  var al = this._al | 0;
  var bl = this._bl | 0;
  var cl = this._cl | 0;
  var dl = this._dl | 0;
  var el = this._el | 0;
  var fl = this._fl | 0;
  var gl = this._gl | 0;
  var hl = this._hl | 0;

  for (var i = 0; i < 32; i += 2) {
    W[i] = M.readInt32BE(i * 4);
    W[i + 1] = M.readInt32BE(i * 4 + 4);
  }
  for (; i < 160; i += 2) {
    var xh = W[i - 15 * 2];
    var xl = W[i - 15 * 2 + 1];
    var gamma0 = Gamma0(xh, xl);
    var gamma0l = Gamma0l(xl, xh);

    xh = W[i - 2 * 2];
    xl = W[i - 2 * 2 + 1];
    var gamma1 = Gamma1(xh, xl);
    var gamma1l = Gamma1l(xl, xh);

    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
    var Wi7h = W[i - 7 * 2];
    var Wi7l = W[i - 7 * 2 + 1];

    var Wi16h = W[i - 16 * 2];
    var Wi16l = W[i - 16 * 2 + 1];

    var Wil = (gamma0l + Wi7l) | 0;
    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0;
    Wil = (Wil + gamma1l) | 0;
    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0;
    Wil = (Wil + Wi16l) | 0;
    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0;

    W[i] = Wih;
    W[i + 1] = Wil;
  }

  for (var j = 0; j < 160; j += 2) {
    Wih = W[j];
    Wil = W[j + 1];

    var majh = maj(ah, bh, ch);
    var majl = maj(al, bl, cl);

    var sigma0h = sigma0(ah, al);
    var sigma0l = sigma0(al, ah);
    var sigma1h = sigma1(eh, el);
    var sigma1l = sigma1(el, eh);

    // t1 = h + sigma1 + ch + K[j] + W[j]
    var Kih = K[j];
    var Kil = K[j + 1];

    var chh = Ch(eh, fh, gh);
    var chl = Ch(el, fl, gl);

    var t1l = (hl + sigma1l) | 0;
    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0;
    t1l = (t1l + chl) | 0;
    t1h = (t1h + chh + getCarry(t1l, chl)) | 0;
    t1l = (t1l + Kil) | 0;
    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0;
    t1l = (t1l + Wil) | 0;
    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0;

    // t2 = sigma0 + maj
    var t2l = (sigma0l + majl) | 0;
    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0;

    hh = gh;
    hl = gl;
    gh = fh;
    gl = fl;
    fh = eh;
    fl = el;
    el = (dl + t1l) | 0;
    eh = (dh + t1h + getCarry(el, dl)) | 0;
    dh = ch;
    dl = cl;
    ch = bh;
    cl = bl;
    bh = ah;
    bl = al;
    al = (t1l + t2l) | 0;
    ah = (t1h + t2h + getCarry(al, t1l)) | 0;
  }

  this._al = (this._al + al) | 0;
  this._bl = (this._bl + bl) | 0;
  this._cl = (this._cl + cl) | 0;
  this._dl = (this._dl + dl) | 0;
  this._el = (this._el + el) | 0;
  this._fl = (this._fl + fl) | 0;
  this._gl = (this._gl + gl) | 0;
  this._hl = (this._hl + hl) | 0;

  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0;
  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0;
  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0;
  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0;
  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0;
  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0;
  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0;
  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0;
};

Sha512.prototype._hash = function () {
  var H = Buffer$4.allocUnsafe(64);

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset);
    H.writeInt32BE(l, offset + 4);
  }

  writeInt64BE(this._ah, this._al, 0);
  writeInt64BE(this._bh, this._bl, 8);
  writeInt64BE(this._ch, this._cl, 16);
  writeInt64BE(this._dh, this._dl, 24);
  writeInt64BE(this._eh, this._el, 32);
  writeInt64BE(this._fh, this._fl, 40);
  writeInt64BE(this._gh, this._gl, 48);
  writeInt64BE(this._hh, this._hl, 56);

  return H
};

var sha512 = Sha512;

var inherits$2 = inherits_browserExports;
var SHA512 = sha512;
var Hash$1 = hash;
var Buffer$3 = safeBufferExports.Buffer;

var W = new Array(160);

function Sha384 () {
  this.init();
  this._w = W;

  Hash$1.call(this, 128, 112);
}

inherits$2(Sha384, SHA512);

Sha384.prototype.init = function () {
  this._ah = 0xcbbb9d5d;
  this._bh = 0x629a292a;
  this._ch = 0x9159015a;
  this._dh = 0x152fecd8;
  this._eh = 0x67332667;
  this._fh = 0x8eb44a87;
  this._gh = 0xdb0c2e0d;
  this._hh = 0x47b5481d;

  this._al = 0xc1059ed8;
  this._bl = 0x367cd507;
  this._cl = 0x3070dd17;
  this._dl = 0xf70e5939;
  this._el = 0xffc00b31;
  this._fl = 0x68581511;
  this._gl = 0x64f98fa7;
  this._hl = 0xbefa4fa4;

  return this
};

Sha384.prototype._hash = function () {
  var H = Buffer$3.allocUnsafe(48);

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset);
    H.writeInt32BE(l, offset + 4);
  }

  writeInt64BE(this._ah, this._al, 0);
  writeInt64BE(this._bh, this._bl, 8);
  writeInt64BE(this._ch, this._cl, 16);
  writeInt64BE(this._dh, this._dl, 24);
  writeInt64BE(this._eh, this._el, 32);
  writeInt64BE(this._fh, this._fl, 40);

  return H
};

var sha384 = Sha384;

var exports = sha_js.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase();

  var Algorithm = exports[algorithm];
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
};

exports.sha = sha$1;
exports.sha1 = sha1$1;
exports.sha224 = sha224;
exports.sha256 = sha256$1;
exports.sha384 = sha384;
exports.sha512 = sha512;

var Buffer$2 = safeBufferExports.Buffer;
var Transform = require$$1.Transform;
var StringDecoder = string_decoder.StringDecoder;
var inherits$1 = inherits_browserExports;

function CipherBase (hashMode) {
  Transform.call(this);
  this.hashMode = typeof hashMode === 'string';
  if (this.hashMode) {
    this[hashMode] = this._finalOrDigest;
  } else {
    this.final = this._finalOrDigest;
  }
  if (this._final) {
    this.__final = this._final;
    this._final = null;
  }
  this._decoder = null;
  this._encoding = null;
}
inherits$1(CipherBase, Transform);

CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
  if (typeof data === 'string') {
    data = Buffer$2.from(data, inputEnc);
  }

  var outData = this._update(data);
  if (this.hashMode) return this

  if (outputEnc) {
    outData = this._toString(outData, outputEnc);
  }

  return outData
};

CipherBase.prototype.setAutoPadding = function () {};
CipherBase.prototype.getAuthTag = function () {
  throw new Error('trying to get auth tag in unsupported state')
};

CipherBase.prototype.setAuthTag = function () {
  throw new Error('trying to set auth tag in unsupported state')
};

CipherBase.prototype.setAAD = function () {
  throw new Error('trying to set aad in unsupported state')
};

CipherBase.prototype._transform = function (data, _, next) {
  var err;
  try {
    if (this.hashMode) {
      this._update(data);
    } else {
      this.push(this._update(data));
    }
  } catch (e) {
    err = e;
  } finally {
    next(err);
  }
};
CipherBase.prototype._flush = function (done) {
  var err;
  try {
    this.push(this.__final());
  } catch (e) {
    err = e;
  }

  done(err);
};
CipherBase.prototype._finalOrDigest = function (outputEnc) {
  var outData = this.__final() || Buffer$2.alloc(0);
  if (outputEnc) {
    outData = this._toString(outData, outputEnc, true);
  }
  return outData
};

CipherBase.prototype._toString = function (value, enc, fin) {
  if (!this._decoder) {
    this._decoder = new StringDecoder(enc);
    this._encoding = enc;
  }

  if (this._encoding !== enc) throw new Error('can\'t switch encodings')

  var out = this._decoder.write(value);
  if (fin) {
    out += this._decoder.end();
  }

  return out
};

var cipherBase = CipherBase;

var inherits = inherits_browserExports;
var MD5 = md5_js;
var RIPEMD160 = ripemd160$1;
var sha = sha_jsExports;
var Base = cipherBase;

function Hash (hash) {
  Base.call(this, 'digest');

  this._hash = hash;
}

inherits(Hash, Base);

Hash.prototype._update = function (data) {
  this._hash.update(data);
};

Hash.prototype._final = function () {
  return this._hash.digest()
};

var browser = function createHash (alg) {
  alg = alg.toLowerCase();
  if (alg === 'md5') return new MD5()
  if (alg === 'rmd160' || alg === 'ripemd160') return new RIPEMD160()

  return new Hash(sha(alg))
};

Object.defineProperty(crypto, '__esModule', { value: true });
crypto.taggedHash =
  crypto.hash256 =
  crypto.hash160 =
  crypto.sha256 =
  crypto.sha1 =
  crypto.ripemd160 =
    void 0;
const createHash$1 = browser;
const RipeMd160 = ripemd160$1;
function ripemd160(buffer) {
  try {
    return createHash$1('rmd160').update(buffer).digest();
  } catch (err) {
    try {
      return createHash$1('ripemd160').update(buffer).digest();
    } catch (err2) {
      return new RipeMd160().update(buffer).digest();
    }
  }
}
crypto.ripemd160 = ripemd160;
function sha1(buffer) {
  return createHash$1('sha1').update(buffer).digest();
}
crypto.sha1 = sha1;
function sha256(buffer) {
  return createHash$1('sha256').update(buffer).digest();
}
crypto.sha256 = sha256;
function hash160(buffer) {
  return ripemd160(sha256(buffer));
}
crypto.hash160 = hash160;
function hash256(buffer) {
  return sha256(sha256(buffer));
}
crypto.hash256 = hash256;
const TAGS = [
  'BIP0340/challenge',
  'BIP0340/aux',
  'BIP0340/nonce',
  'TapLeaf',
  'TapBranch',
  'TapSighash',
  'TapTweak',
  'KeyAgg list',
  'KeyAgg coefficient',
];
/** An object mapping tags to their tagged hash prefix of [SHA256(tag) | SHA256(tag)] */
const TAGGED_HASH_PREFIXES = Object.fromEntries(
  TAGS.map(tag => {
    const tagHash = sha256(buffer.Buffer.from(tag));
    return [tag, buffer.Buffer.concat([tagHash, tagHash])];
  }),
);
function taggedHash(prefix, data) {
  return sha256(buffer.Buffer.concat([TAGGED_HASH_PREFIXES[prefix], data]));
}
crypto.taggedHash = taggedHash;

// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
// @ts-ignore
var _Buffer = safeBufferExports.Buffer;
function base$1 (ALPHABET) {
  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
  var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up
  function encode (source) {
    if (Array.isArray(source) || source instanceof Uint8Array) { source = _Buffer.from(source); }
    if (!_Buffer.isBuffer(source)) { throw new TypeError('Expected Buffer') }
    if (source.length === 0) { return '' }
        // Skip & count leading zeroes.
    var zeroes = 0;
    var length = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
        // Allocate enough space in big-endian base58 representation.
    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
    var b58 = new Uint8Array(size);
        // Process the bytes.
    while (pbegin !== pend) {
      var carry = source[pbegin];
            // Apply "b58 = b58 * 256 + ch".
      var i = 0;
      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0;
        b58[it1] = (carry % BASE) >>> 0;
        carry = (carry / BASE) >>> 0;
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i;
      pbegin++;
    }
        // Skip leading zeroes in base58 result.
    var it2 = size - length;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
        // Translate the result into a string.
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]); }
    return str
  }
  function decodeUnsafe (source) {
    if (typeof source !== 'string') { throw new TypeError('Expected String') }
    if (source.length === 0) { return _Buffer.alloc(0) }
    var psz = 0;
        // Skip and count leading '1's.
    var zeroes = 0;
    var length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
        // Allocate enough space in big-endian base256 representation.
    var size = (((source.length - psz) * FACTOR) + 1) >>> 0; // log(58) / log(256), rounded up.
    var b256 = new Uint8Array(size);
        // Process the characters.
    while (source[psz]) {
            // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)];
            // Invalid character
      if (carry === 255) { return }
      var i = 0;
      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0;
        b256[it3] = (carry % 256) >>> 0;
        carry = (carry / 256) >>> 0;
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i;
      psz++;
    }
        // Skip leading zeroes in b256.
    var it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
    vch.fill(0x00, 0, zeroes);
    var j = zeroes;
    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }
    return vch
  }
  function decode (string) {
    var buffer = decodeUnsafe(string);
    if (buffer) { return buffer }
    throw new Error('Non-base' + BASE + ' character')
  }
  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}
var src = base$1;

var basex = src;
var ALPHABET$1 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

var bs58 = basex(ALPHABET$1);

var base58 = bs58;
var Buffer$1 = safeBufferExports.Buffer;

var base = function (checksumFn) {
  // Encode a buffer as a base58-check encoded string
  function encode (payload) {
    var checksum = checksumFn(payload);

    return base58.encode(Buffer$1.concat([
      payload,
      checksum
    ], payload.length + 4))
  }

  function decodeRaw (buffer) {
    var payload = buffer.slice(0, -4);
    var checksum = buffer.slice(-4);
    var newChecksum = checksumFn(payload);

    if (checksum[0] ^ newChecksum[0] |
        checksum[1] ^ newChecksum[1] |
        checksum[2] ^ newChecksum[2] |
        checksum[3] ^ newChecksum[3]) return

    return payload
  }

  // Decode a base58-check encoded string to a buffer, no result if checksum is wrong
  function decodeUnsafe (string) {
    var buffer = base58.decodeUnsafe(string);
    if (!buffer) return

    return decodeRaw(buffer)
  }

  function decode (string) {
    var buffer = base58.decode(string);
    var payload = decodeRaw(buffer);
    if (!payload) throw new Error('Invalid checksum')
    return payload
  }

  return {
    encode: encode,
    decode: decode,
    decodeUnsafe: decodeUnsafe
  }
};

var createHash = browser;
var bs58checkBase = base;

// SHA256(SHA256(buffer))
function sha256x2 (buffer) {
  var tmp = createHash('sha256').update(buffer).digest();
  return createHash('sha256').update(tmp).digest()
}

var bs58check$3 = bs58checkBase(sha256x2);

Object.defineProperty(p2pkh$1, '__esModule', { value: true });
p2pkh$1.p2pkh = void 0;
const bcrypto$5 = crypto;
const networks_1$5 = networks$1;
const bscript$8 = script;
const types_1$6 = types$5;
const lazy$4 = lazy$8;
const bs58check$2 = bs58check$3;
const OPS$4 = bscript$8.OPS;
// input: {signature} {pubkey}
// output: OP_DUP OP_HASH160 {hash160(pubkey)} OP_EQUALVERIFY OP_CHECKSIG
function p2pkh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.pubkey && !a.input)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  (0, types_1$6.typeforce)(
    {
      network: types_1$6.typeforce.maybe(types_1$6.typeforce.Object),
      address: types_1$6.typeforce.maybe(types_1$6.typeforce.String),
      hash: types_1$6.typeforce.maybe(types_1$6.typeforce.BufferN(20)),
      output: types_1$6.typeforce.maybe(types_1$6.typeforce.BufferN(25)),
      pubkey: types_1$6.typeforce.maybe(types_1$6.isPoint),
      signature: types_1$6.typeforce.maybe(bscript$8.isCanonicalScriptSignature),
      input: types_1$6.typeforce.maybe(types_1$6.typeforce.Buffer),
    },
    a,
  );
  const _address = lazy$4.value(() => {
    const payload = bs58check$2.decode(a.address);
    const version = payload.readUInt8(0);
    const hash = payload.slice(1);
    return { version, hash };
  });
  const _chunks = lazy$4.value(() => {
    return bscript$8.decompile(a.input);
  });
  const network = a.network || networks_1$5.bitcoin;
  const o = { name: 'p2pkh', network };
  lazy$4.prop(o, 'address', () => {
    if (!o.hash) return;
    const payload = buffer.Buffer.allocUnsafe(21);
    payload.writeUInt8(network.pubKeyHash, 0);
    o.hash.copy(payload, 1);
    return bs58check$2.encode(payload);
  });
  lazy$4.prop(o, 'hash', () => {
    if (a.output) return a.output.slice(3, 23);
    if (a.address) return _address().hash;
    if (a.pubkey || o.pubkey) return bcrypto$5.hash160(a.pubkey || o.pubkey);
  });
  lazy$4.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript$8.compile([
      OPS$4.OP_DUP,
      OPS$4.OP_HASH160,
      o.hash,
      OPS$4.OP_EQUALVERIFY,
      OPS$4.OP_CHECKSIG,
    ]);
  });
  lazy$4.prop(o, 'pubkey', () => {
    if (!a.input) return;
    return _chunks()[1];
  });
  lazy$4.prop(o, 'signature', () => {
    if (!a.input) return;
    return _chunks()[0];
  });
  lazy$4.prop(o, 'input', () => {
    if (!a.pubkey) return;
    if (!a.signature) return;
    return bscript$8.compile([a.signature, a.pubkey]);
  });
  lazy$4.prop(o, 'witness', () => {
    if (!o.input) return;
    return [];
  });
  // extended validation
  if (opts.validate) {
    let hash = buffer.Buffer.from([]);
    if (a.address) {
      if (_address().version !== network.pubKeyHash)
        throw new TypeError('Invalid version or Network mismatch');
      if (_address().hash.length !== 20) throw new TypeError('Invalid address');
      hash = _address().hash;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 25 ||
        a.output[0] !== OPS$4.OP_DUP ||
        a.output[1] !== OPS$4.OP_HASH160 ||
        a.output[2] !== 0x14 ||
        a.output[23] !== OPS$4.OP_EQUALVERIFY ||
        a.output[24] !== OPS$4.OP_CHECKSIG
      )
        throw new TypeError('Output is invalid');
      const hash2 = a.output.slice(3, 23);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError('Hash mismatch');
      else hash = hash2;
    }
    if (a.pubkey) {
      const pkh = bcrypto$5.hash160(a.pubkey);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
      else hash = pkh;
    }
    if (a.input) {
      const chunks = _chunks();
      if (chunks.length !== 2) throw new TypeError('Input is invalid');
      if (!bscript$8.isCanonicalScriptSignature(chunks[0]))
        throw new TypeError('Input has invalid signature');
      if (!(0, types_1$6.isPoint)(chunks[1]))
        throw new TypeError('Input has invalid pubkey');
      if (a.signature && !a.signature.equals(chunks[0]))
        throw new TypeError('Signature mismatch');
      if (a.pubkey && !a.pubkey.equals(chunks[1]))
        throw new TypeError('Pubkey mismatch');
      const pkh = bcrypto$5.hash160(chunks[1]);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
    }
  }
  return Object.assign(o, a);
}
p2pkh$1.p2pkh = p2pkh;

var p2sh$1 = {};

Object.defineProperty(p2sh$1, '__esModule', { value: true });
p2sh$1.p2sh = void 0;
const bcrypto$4 = crypto;
const networks_1$4 = networks$1;
const bscript$7 = script;
const types_1$5 = types$5;
const lazy$3 = lazy$8;
const bs58check$1 = bs58check$3;
const OPS$3 = bscript$7.OPS;
function stacksEqual$2(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
// input: [redeemScriptSig ...] {redeemScript}
// witness: <?>
// output: OP_HASH160 {hash160(redeemScript)} OP_EQUAL
function p2sh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.redeem && !a.input)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  (0, types_1$5.typeforce)(
    {
      network: types_1$5.typeforce.maybe(types_1$5.typeforce.Object),
      address: types_1$5.typeforce.maybe(types_1$5.typeforce.String),
      hash: types_1$5.typeforce.maybe(types_1$5.typeforce.BufferN(20)),
      output: types_1$5.typeforce.maybe(types_1$5.typeforce.BufferN(23)),
      redeem: types_1$5.typeforce.maybe({
        network: types_1$5.typeforce.maybe(types_1$5.typeforce.Object),
        output: types_1$5.typeforce.maybe(types_1$5.typeforce.Buffer),
        input: types_1$5.typeforce.maybe(types_1$5.typeforce.Buffer),
        witness: types_1$5.typeforce.maybe(
          types_1$5.typeforce.arrayOf(types_1$5.typeforce.Buffer),
        ),
      }),
      input: types_1$5.typeforce.maybe(types_1$5.typeforce.Buffer),
      witness: types_1$5.typeforce.maybe(
        types_1$5.typeforce.arrayOf(types_1$5.typeforce.Buffer),
      ),
    },
    a,
  );
  let network = a.network;
  if (!network) {
    network = (a.redeem && a.redeem.network) || networks_1$4.bitcoin;
  }
  const o = { network };
  const _address = lazy$3.value(() => {
    const payload = bs58check$1.decode(a.address);
    const version = payload.readUInt8(0);
    const hash = payload.slice(1);
    return { version, hash };
  });
  const _chunks = lazy$3.value(() => {
    return bscript$7.decompile(a.input);
  });
  const _redeem = lazy$3.value(() => {
    const chunks = _chunks();
    const lastChunk = chunks[chunks.length - 1];
    return {
      network,
      output: lastChunk === OPS$3.OP_FALSE ? buffer.Buffer.from([]) : lastChunk,
      input: bscript$7.compile(chunks.slice(0, -1)),
      witness: a.witness || [],
    };
  });
  // output dependents
  lazy$3.prop(o, 'address', () => {
    if (!o.hash) return;
    const payload = buffer.Buffer.allocUnsafe(21);
    payload.writeUInt8(o.network.scriptHash, 0);
    o.hash.copy(payload, 1);
    return bs58check$1.encode(payload);
  });
  lazy$3.prop(o, 'hash', () => {
    // in order of least effort
    if (a.output) return a.output.slice(2, 22);
    if (a.address) return _address().hash;
    if (o.redeem && o.redeem.output) return bcrypto$4.hash160(o.redeem.output);
  });
  lazy$3.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript$7.compile([OPS$3.OP_HASH160, o.hash, OPS$3.OP_EQUAL]);
  });
  // input dependents
  lazy$3.prop(o, 'redeem', () => {
    if (!a.input) return;
    return _redeem();
  });
  lazy$3.prop(o, 'input', () => {
    if (!a.redeem || !a.redeem.input || !a.redeem.output) return;
    return bscript$7.compile(
      [].concat(bscript$7.decompile(a.redeem.input), a.redeem.output),
    );
  });
  lazy$3.prop(o, 'witness', () => {
    if (o.redeem && o.redeem.witness) return o.redeem.witness;
    if (o.input) return [];
  });
  lazy$3.prop(o, 'name', () => {
    const nameParts = ['p2sh'];
    if (o.redeem !== undefined && o.redeem.name !== undefined)
      nameParts.push(o.redeem.name);
    return nameParts.join('-');
  });
  if (opts.validate) {
    let hash = buffer.Buffer.from([]);
    if (a.address) {
      if (_address().version !== network.scriptHash)
        throw new TypeError('Invalid version or Network mismatch');
      if (_address().hash.length !== 20) throw new TypeError('Invalid address');
      hash = _address().hash;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 23 ||
        a.output[0] !== OPS$3.OP_HASH160 ||
        a.output[1] !== 0x14 ||
        a.output[22] !== OPS$3.OP_EQUAL
      )
        throw new TypeError('Output is invalid');
      const hash2 = a.output.slice(2, 22);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError('Hash mismatch');
      else hash = hash2;
    }
    // inlined to prevent 'no-inner-declarations' failing
    const checkRedeem = redeem => {
      // is the redeem output empty/invalid?
      if (redeem.output) {
        const decompile = bscript$7.decompile(redeem.output);
        if (!decompile || decompile.length < 1)
          throw new TypeError('Redeem.output too short');
        // match hash against other sources
        const hash2 = bcrypto$4.hash160(redeem.output);
        if (hash.length > 0 && !hash.equals(hash2))
          throw new TypeError('Hash mismatch');
        else hash = hash2;
      }
      if (redeem.input) {
        const hasInput = redeem.input.length > 0;
        const hasWitness = redeem.witness && redeem.witness.length > 0;
        if (!hasInput && !hasWitness) throw new TypeError('Empty input');
        if (hasInput && hasWitness)
          throw new TypeError('Input and witness provided');
        if (hasInput) {
          const richunks = bscript$7.decompile(redeem.input);
          if (!bscript$7.isPushOnly(richunks))
            throw new TypeError('Non push-only scriptSig');
        }
      }
    };
    if (a.input) {
      const chunks = _chunks();
      if (!chunks || chunks.length < 1) throw new TypeError('Input too short');
      if (!buffer.Buffer.isBuffer(_redeem().output))
        throw new TypeError('Input is invalid');
      checkRedeem(_redeem());
    }
    if (a.redeem) {
      if (a.redeem.network && a.redeem.network !== network)
        throw new TypeError('Network mismatch');
      if (a.input) {
        const redeem = _redeem();
        if (a.redeem.output && !a.redeem.output.equals(redeem.output))
          throw new TypeError('Redeem.output mismatch');
        if (a.redeem.input && !a.redeem.input.equals(redeem.input))
          throw new TypeError('Redeem.input mismatch');
      }
      checkRedeem(a.redeem);
    }
    if (a.witness) {
      if (
        a.redeem &&
        a.redeem.witness &&
        !stacksEqual$2(a.redeem.witness, a.witness)
      )
        throw new TypeError('Witness and redeem.witness mismatch');
    }
  }
  return Object.assign(o, a);
}
p2sh$1.p2sh = p2sh;

var p2wpkh$1 = {};

var dist = {};

Object.defineProperty(dist, "__esModule", { value: true });
dist.bech32m = dist.bech32 = void 0;
const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const ALPHABET_MAP = {};
for (let z = 0; z < ALPHABET.length; z++) {
    const x = ALPHABET.charAt(z);
    ALPHABET_MAP[x] = z;
}
function polymodStep(pre) {
    const b = pre >> 25;
    return (((pre & 0x1ffffff) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3));
}
function prefixChk(prefix) {
    let chk = 1;
    for (let i = 0; i < prefix.length; ++i) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
            return 'Invalid prefix (' + prefix + ')';
        chk = polymodStep(chk) ^ (c >> 5);
    }
    chk = polymodStep(chk);
    for (let i = 0; i < prefix.length; ++i) {
        const v = prefix.charCodeAt(i);
        chk = polymodStep(chk) ^ (v & 0x1f);
    }
    return chk;
}
function convert$2(data, inBits, outBits, pad) {
    let value = 0;
    let bits = 0;
    const maxV = (1 << outBits) - 1;
    const result = [];
    for (let i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i];
        bits += inBits;
        while (bits >= outBits) {
            bits -= outBits;
            result.push((value >> bits) & maxV);
        }
    }
    if (pad) {
        if (bits > 0) {
            result.push((value << (outBits - bits)) & maxV);
        }
    }
    else {
        if (bits >= inBits)
            return 'Excess padding';
        if ((value << (outBits - bits)) & maxV)
            return 'Non-zero padding';
    }
    return result;
}
function toWords(bytes) {
    return convert$2(bytes, 8, 5, true);
}
function fromWordsUnsafe(words) {
    const res = convert$2(words, 5, 8, false);
    if (Array.isArray(res))
        return res;
}
function fromWords(words) {
    const res = convert$2(words, 5, 8, false);
    if (Array.isArray(res))
        return res;
    throw new Error(res);
}
function getLibraryFromEncoding(encoding) {
    let ENCODING_CONST;
    if (encoding === 'bech32') {
        ENCODING_CONST = 1;
    }
    else {
        ENCODING_CONST = 0x2bc830a3;
    }
    function encode(prefix, words, LIMIT) {
        LIMIT = LIMIT || 90;
        if (prefix.length + 7 + words.length > LIMIT)
            throw new TypeError('Exceeds length limit');
        prefix = prefix.toLowerCase();
        // determine chk mod
        let chk = prefixChk(prefix);
        if (typeof chk === 'string')
            throw new Error(chk);
        let result = prefix + '1';
        for (let i = 0; i < words.length; ++i) {
            const x = words[i];
            if (x >> 5 !== 0)
                throw new Error('Non 5-bit word');
            chk = polymodStep(chk) ^ x;
            result += ALPHABET.charAt(x);
        }
        for (let i = 0; i < 6; ++i) {
            chk = polymodStep(chk);
        }
        chk ^= ENCODING_CONST;
        for (let i = 0; i < 6; ++i) {
            const v = (chk >> ((5 - i) * 5)) & 0x1f;
            result += ALPHABET.charAt(v);
        }
        return result;
    }
    function __decode(str, LIMIT) {
        LIMIT = LIMIT || 90;
        if (str.length < 8)
            return str + ' too short';
        if (str.length > LIMIT)
            return 'Exceeds length limit';
        // don't allow mixed case
        const lowered = str.toLowerCase();
        const uppered = str.toUpperCase();
        if (str !== lowered && str !== uppered)
            return 'Mixed-case string ' + str;
        str = lowered;
        const split = str.lastIndexOf('1');
        if (split === -1)
            return 'No separator character for ' + str;
        if (split === 0)
            return 'Missing prefix for ' + str;
        const prefix = str.slice(0, split);
        const wordChars = str.slice(split + 1);
        if (wordChars.length < 6)
            return 'Data too short';
        let chk = prefixChk(prefix);
        if (typeof chk === 'string')
            return chk;
        const words = [];
        for (let i = 0; i < wordChars.length; ++i) {
            const c = wordChars.charAt(i);
            const v = ALPHABET_MAP[c];
            if (v === undefined)
                return 'Unknown character ' + c;
            chk = polymodStep(chk) ^ v;
            // not in the checksum?
            if (i + 6 >= wordChars.length)
                continue;
            words.push(v);
        }
        if (chk !== ENCODING_CONST)
            return 'Invalid checksum for ' + str;
        return { prefix, words };
    }
    function decodeUnsafe(str, LIMIT) {
        const res = __decode(str, LIMIT);
        if (typeof res === 'object')
            return res;
    }
    function decode(str, LIMIT) {
        const res = __decode(str, LIMIT);
        if (typeof res === 'object')
            return res;
        throw new Error(res);
    }
    return {
        decodeUnsafe,
        decode,
        encode,
        toWords,
        fromWordsUnsafe,
        fromWords,
    };
}
dist.bech32 = getLibraryFromEncoding('bech32');
dist.bech32m = getLibraryFromEncoding('bech32m');

Object.defineProperty(p2wpkh$1, '__esModule', { value: true });
p2wpkh$1.p2wpkh = void 0;
const bcrypto$3 = crypto;
const networks_1$3 = networks$1;
const bscript$6 = script;
const types_1$4 = types$5;
const lazy$2 = lazy$8;
const bech32_1$3 = dist;
const OPS$2 = bscript$6.OPS;
const EMPTY_BUFFER$2 = buffer.Buffer.alloc(0);
// witness: {signature} {pubKey}
// input: <>
// output: OP_0 {pubKeyHash}
function p2wpkh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.pubkey && !a.witness)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  (0, types_1$4.typeforce)(
    {
      address: types_1$4.typeforce.maybe(types_1$4.typeforce.String),
      hash: types_1$4.typeforce.maybe(types_1$4.typeforce.BufferN(20)),
      input: types_1$4.typeforce.maybe(types_1$4.typeforce.BufferN(0)),
      network: types_1$4.typeforce.maybe(types_1$4.typeforce.Object),
      output: types_1$4.typeforce.maybe(types_1$4.typeforce.BufferN(22)),
      pubkey: types_1$4.typeforce.maybe(types_1$4.isPoint),
      signature: types_1$4.typeforce.maybe(bscript$6.isCanonicalScriptSignature),
      witness: types_1$4.typeforce.maybe(
        types_1$4.typeforce.arrayOf(types_1$4.typeforce.Buffer),
      ),
    },
    a,
  );
  const _address = lazy$2.value(() => {
    const result = bech32_1$3.bech32.decode(a.address);
    const version = result.words.shift();
    const data = bech32_1$3.bech32.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: buffer.Buffer.from(data),
    };
  });
  const network = a.network || networks_1$3.bitcoin;
  const o = { name: 'p2wpkh', network };
  lazy$2.prop(o, 'address', () => {
    if (!o.hash) return;
    const words = bech32_1$3.bech32.toWords(o.hash);
    words.unshift(0x00);
    return bech32_1$3.bech32.encode(network.bech32, words);
  });
  lazy$2.prop(o, 'hash', () => {
    if (a.output) return a.output.slice(2, 22);
    if (a.address) return _address().data;
    if (a.pubkey || o.pubkey) return bcrypto$3.hash160(a.pubkey || o.pubkey);
  });
  lazy$2.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript$6.compile([OPS$2.OP_0, o.hash]);
  });
  lazy$2.prop(o, 'pubkey', () => {
    if (a.pubkey) return a.pubkey;
    if (!a.witness) return;
    return a.witness[1];
  });
  lazy$2.prop(o, 'signature', () => {
    if (!a.witness) return;
    return a.witness[0];
  });
  lazy$2.prop(o, 'input', () => {
    if (!o.witness) return;
    return EMPTY_BUFFER$2;
  });
  lazy$2.prop(o, 'witness', () => {
    if (!a.pubkey) return;
    if (!a.signature) return;
    return [a.signature, a.pubkey];
  });
  // extended validation
  if (opts.validate) {
    let hash = buffer.Buffer.from([]);
    if (a.address) {
      if (network && network.bech32 !== _address().prefix)
        throw new TypeError('Invalid prefix or Network mismatch');
      if (_address().version !== 0x00)
        throw new TypeError('Invalid address version');
      if (_address().data.length !== 20)
        throw new TypeError('Invalid address data');
      hash = _address().data;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 22 ||
        a.output[0] !== OPS$2.OP_0 ||
        a.output[1] !== 0x14
      )
        throw new TypeError('Output is invalid');
      if (hash.length > 0 && !hash.equals(a.output.slice(2)))
        throw new TypeError('Hash mismatch');
      else hash = a.output.slice(2);
    }
    if (a.pubkey) {
      const pkh = bcrypto$3.hash160(a.pubkey);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
      else hash = pkh;
      if (!(0, types_1$4.isPoint)(a.pubkey) || a.pubkey.length !== 33)
        throw new TypeError('Invalid pubkey for p2wpkh');
    }
    if (a.witness) {
      if (a.witness.length !== 2) throw new TypeError('Witness is invalid');
      if (!bscript$6.isCanonicalScriptSignature(a.witness[0]))
        throw new TypeError('Witness has invalid signature');
      if (!(0, types_1$4.isPoint)(a.witness[1]) || a.witness[1].length !== 33)
        throw new TypeError('Witness has invalid pubkey');
      if (a.signature && !a.signature.equals(a.witness[0]))
        throw new TypeError('Signature mismatch');
      if (a.pubkey && !a.pubkey.equals(a.witness[1]))
        throw new TypeError('Pubkey mismatch');
      const pkh = bcrypto$3.hash160(a.witness[1]);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
    }
  }
  return Object.assign(o, a);
}
p2wpkh$1.p2wpkh = p2wpkh;

var p2wsh$1 = {};

Object.defineProperty(p2wsh$1, '__esModule', { value: true });
p2wsh$1.p2wsh = void 0;
const bcrypto$2 = crypto;
const networks_1$2 = networks$1;
const bscript$5 = script;
const types_1$3 = types$5;
const lazy$1 = lazy$8;
const bech32_1$2 = dist;
const OPS$1 = bscript$5.OPS;
const EMPTY_BUFFER$1 = buffer.Buffer.alloc(0);
function stacksEqual$1(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
function chunkHasUncompressedPubkey(chunk) {
  if (
    buffer.Buffer.isBuffer(chunk) &&
    chunk.length === 65 &&
    chunk[0] === 0x04 &&
    (0, types_1$3.isPoint)(chunk)
  ) {
    return true;
  } else {
    return false;
  }
}
// input: <>
// witness: [redeemScriptSig ...] {redeemScript}
// output: OP_0 {sha256(redeemScript)}
function p2wsh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.redeem && !a.witness)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  (0, types_1$3.typeforce)(
    {
      network: types_1$3.typeforce.maybe(types_1$3.typeforce.Object),
      address: types_1$3.typeforce.maybe(types_1$3.typeforce.String),
      hash: types_1$3.typeforce.maybe(types_1$3.typeforce.BufferN(32)),
      output: types_1$3.typeforce.maybe(types_1$3.typeforce.BufferN(34)),
      redeem: types_1$3.typeforce.maybe({
        input: types_1$3.typeforce.maybe(types_1$3.typeforce.Buffer),
        network: types_1$3.typeforce.maybe(types_1$3.typeforce.Object),
        output: types_1$3.typeforce.maybe(types_1$3.typeforce.Buffer),
        witness: types_1$3.typeforce.maybe(
          types_1$3.typeforce.arrayOf(types_1$3.typeforce.Buffer),
        ),
      }),
      input: types_1$3.typeforce.maybe(types_1$3.typeforce.BufferN(0)),
      witness: types_1$3.typeforce.maybe(
        types_1$3.typeforce.arrayOf(types_1$3.typeforce.Buffer),
      ),
    },
    a,
  );
  const _address = lazy$1.value(() => {
    const result = bech32_1$2.bech32.decode(a.address);
    const version = result.words.shift();
    const data = bech32_1$2.bech32.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: buffer.Buffer.from(data),
    };
  });
  const _rchunks = lazy$1.value(() => {
    return bscript$5.decompile(a.redeem.input);
  });
  let network = a.network;
  if (!network) {
    network = (a.redeem && a.redeem.network) || networks_1$2.bitcoin;
  }
  const o = { network };
  lazy$1.prop(o, 'address', () => {
    if (!o.hash) return;
    const words = bech32_1$2.bech32.toWords(o.hash);
    words.unshift(0x00);
    return bech32_1$2.bech32.encode(network.bech32, words);
  });
  lazy$1.prop(o, 'hash', () => {
    if (a.output) return a.output.slice(2);
    if (a.address) return _address().data;
    if (o.redeem && o.redeem.output) return bcrypto$2.sha256(o.redeem.output);
  });
  lazy$1.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript$5.compile([OPS$1.OP_0, o.hash]);
  });
  lazy$1.prop(o, 'redeem', () => {
    if (!a.witness) return;
    return {
      output: a.witness[a.witness.length - 1],
      input: EMPTY_BUFFER$1,
      witness: a.witness.slice(0, -1),
    };
  });
  lazy$1.prop(o, 'input', () => {
    if (!o.witness) return;
    return EMPTY_BUFFER$1;
  });
  lazy$1.prop(o, 'witness', () => {
    // transform redeem input to witness stack?
    if (
      a.redeem &&
      a.redeem.input &&
      a.redeem.input.length > 0 &&
      a.redeem.output &&
      a.redeem.output.length > 0
    ) {
      const stack = bscript$5.toStack(_rchunks());
      // assign, and blank the existing input
      o.redeem = Object.assign({ witness: stack }, a.redeem);
      o.redeem.input = EMPTY_BUFFER$1;
      return [].concat(stack, a.redeem.output);
    }
    if (!a.redeem) return;
    if (!a.redeem.output) return;
    if (!a.redeem.witness) return;
    return [].concat(a.redeem.witness, a.redeem.output);
  });
  lazy$1.prop(o, 'name', () => {
    const nameParts = ['p2wsh'];
    if (o.redeem !== undefined && o.redeem.name !== undefined)
      nameParts.push(o.redeem.name);
    return nameParts.join('-');
  });
  // extended validation
  if (opts.validate) {
    let hash = buffer.Buffer.from([]);
    if (a.address) {
      if (_address().prefix !== network.bech32)
        throw new TypeError('Invalid prefix or Network mismatch');
      if (_address().version !== 0x00)
        throw new TypeError('Invalid address version');
      if (_address().data.length !== 32)
        throw new TypeError('Invalid address data');
      hash = _address().data;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 34 ||
        a.output[0] !== OPS$1.OP_0 ||
        a.output[1] !== 0x20
      )
        throw new TypeError('Output is invalid');
      const hash2 = a.output.slice(2);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError('Hash mismatch');
      else hash = hash2;
    }
    if (a.redeem) {
      if (a.redeem.network && a.redeem.network !== network)
        throw new TypeError('Network mismatch');
      // is there two redeem sources?
      if (
        a.redeem.input &&
        a.redeem.input.length > 0 &&
        a.redeem.witness &&
        a.redeem.witness.length > 0
      )
        throw new TypeError('Ambiguous witness source');
      // is the redeem output non-empty?
      if (a.redeem.output) {
        if (bscript$5.decompile(a.redeem.output).length === 0)
          throw new TypeError('Redeem.output is invalid');
        // match hash against other sources
        const hash2 = bcrypto$2.sha256(a.redeem.output);
        if (hash.length > 0 && !hash.equals(hash2))
          throw new TypeError('Hash mismatch');
        else hash = hash2;
      }
      if (a.redeem.input && !bscript$5.isPushOnly(_rchunks()))
        throw new TypeError('Non push-only scriptSig');
      if (
        a.witness &&
        a.redeem.witness &&
        !stacksEqual$1(a.witness, a.redeem.witness)
      )
        throw new TypeError('Witness and redeem.witness mismatch');
      if (
        (a.redeem.input && _rchunks().some(chunkHasUncompressedPubkey)) ||
        (a.redeem.output &&
          (bscript$5.decompile(a.redeem.output) || []).some(
            chunkHasUncompressedPubkey,
          ))
      ) {
        throw new TypeError(
          'redeem.input or redeem.output contains uncompressed pubkey',
        );
      }
    }
    if (a.witness && a.witness.length > 0) {
      const wScript = a.witness[a.witness.length - 1];
      if (a.redeem && a.redeem.output && !a.redeem.output.equals(wScript))
        throw new TypeError('Witness and redeem.output mismatch');
      if (
        a.witness.some(chunkHasUncompressedPubkey) ||
        (bscript$5.decompile(wScript) || []).some(chunkHasUncompressedPubkey)
      )
        throw new TypeError('Witness contains uncompressed pubkey');
    }
  }
  return Object.assign(o, a);
}
p2wsh$1.p2wsh = p2wsh;

var p2tr$1 = {};

var ecc_lib = {};

Object.defineProperty(ecc_lib, '__esModule', { value: true });
ecc_lib.getEccLib = ecc_lib.initEccLib = void 0;
const _ECCLIB_CACHE = {};
function initEccLib(eccLib) {
  if (!eccLib) {
    // allow clearing the library
    _ECCLIB_CACHE.eccLib = eccLib;
  } else if (eccLib !== _ECCLIB_CACHE.eccLib) {
    // new instance, verify it
    verifyEcc(eccLib);
    _ECCLIB_CACHE.eccLib = eccLib;
  }
}
ecc_lib.initEccLib = initEccLib;
function getEccLib() {
  if (!_ECCLIB_CACHE.eccLib)
    throw new Error(
      'No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance',
    );
  return _ECCLIB_CACHE.eccLib;
}
ecc_lib.getEccLib = getEccLib;
const h = hex => buffer.Buffer.from(hex, 'hex');
function verifyEcc(ecc) {
  assert(typeof ecc.isXOnlyPoint === 'function');
  assert(
    ecc.isXOnlyPoint(
      h('79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'),
    ),
  );
  assert(
    ecc.isXOnlyPoint(
      h('fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e'),
    ),
  );
  assert(
    ecc.isXOnlyPoint(
      h('f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9'),
    ),
  );
  assert(
    ecc.isXOnlyPoint(
      h('0000000000000000000000000000000000000000000000000000000000000001'),
    ),
  );
  assert(
    !ecc.isXOnlyPoint(
      h('0000000000000000000000000000000000000000000000000000000000000000'),
    ),
  );
  assert(
    !ecc.isXOnlyPoint(
      h('fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f'),
    ),
  );
  assert(typeof ecc.xOnlyPointAddTweak === 'function');
  tweakAddVectors.forEach(t => {
    const r = ecc.xOnlyPointAddTweak(h(t.pubkey), h(t.tweak));
    if (t.result === null) {
      assert(r === null);
    } else {
      assert(r !== null);
      assert(r.parity === t.parity);
      assert(buffer.Buffer.from(r.xOnlyPubkey).equals(h(t.result)));
    }
  });
}
function assert(bool) {
  if (!bool) throw new Error('ecc library invalid');
}
const tweakAddVectors = [
  {
    pubkey: '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    tweak: 'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140',
    parity: -1,
    result: null,
  },
  {
    pubkey: '1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b',
    tweak: 'a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac',
    parity: 1,
    result: 'e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf',
  },
  {
    pubkey: '2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991',
    tweak: '823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47',
    parity: 0,
    result: '9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c',
  },
];

var bip341 = {};

var bufferutils = {};

var Buffer = safeBufferExports.Buffer;

// Number.MAX_SAFE_INTEGER
var MAX_SAFE_INTEGER$1 = 9007199254740991;

function checkUInt53$1 (n) {
  if (n < 0 || n > MAX_SAFE_INTEGER$1 || n % 1 !== 0) throw new RangeError('value out of range')
}

function encode$f (number, buffer, offset) {
  checkUInt53$1(number);

  if (!buffer) buffer = Buffer.allocUnsafe(encodingLength$1(number));
  if (!Buffer.isBuffer(buffer)) throw new TypeError('buffer must be a Buffer instance')
  if (!offset) offset = 0;

  // 8 bit
  if (number < 0xfd) {
    buffer.writeUInt8(number, offset);
    encode$f.bytes = 1;

  // 16 bit
  } else if (number <= 0xffff) {
    buffer.writeUInt8(0xfd, offset);
    buffer.writeUInt16LE(number, offset + 1);
    encode$f.bytes = 3;

  // 32 bit
  } else if (number <= 0xffffffff) {
    buffer.writeUInt8(0xfe, offset);
    buffer.writeUInt32LE(number, offset + 1);
    encode$f.bytes = 5;

  // 64 bit
  } else {
    buffer.writeUInt8(0xff, offset);
    buffer.writeUInt32LE(number >>> 0, offset + 1);
    buffer.writeUInt32LE((number / 0x100000000) | 0, offset + 5);
    encode$f.bytes = 9;
  }

  return buffer
}

function decode$e (buffer, offset) {
  if (!Buffer.isBuffer(buffer)) throw new TypeError('buffer must be a Buffer instance')
  if (!offset) offset = 0;

  var first = buffer.readUInt8(offset);

  // 8 bit
  if (first < 0xfd) {
    decode$e.bytes = 1;
    return first

  // 16 bit
  } else if (first === 0xfd) {
    decode$e.bytes = 3;
    return buffer.readUInt16LE(offset + 1)

  // 32 bit
  } else if (first === 0xfe) {
    decode$e.bytes = 5;
    return buffer.readUInt32LE(offset + 1)

  // 64 bit
  } else {
    decode$e.bytes = 9;
    var lo = buffer.readUInt32LE(offset + 1);
    var hi = buffer.readUInt32LE(offset + 5);
    var number = hi * 0x0100000000 + lo;
    checkUInt53$1(number);

    return number
  }
}

function encodingLength$1 (number) {
  checkUInt53$1(number);

  return (
    number < 0xfd ? 1
      : number <= 0xffff ? 3
        : number <= 0xffffffff ? 5
          : 9
  )
}

var varuintBitcoin = { encode: encode$f, decode: decode$e, encodingLength: encodingLength$1 };

Object.defineProperty(bufferutils, '__esModule', { value: true });
bufferutils.BufferReader =
  bufferutils.BufferWriter =
  bufferutils.cloneBuffer =
  bufferutils.reverseBuffer =
  bufferutils.writeUInt64LE =
  bufferutils.readUInt64LE =
  bufferutils.varuint =
    void 0;
const types$2 = types$5;
const { typeforce: typeforce$2 } = types$2;
const varuint$7 = varuintBitcoin;
bufferutils.varuint = varuint$7;
// https://github.com/feross/buffer/blob/master/index.js#L1127
function verifuint$1(value, max) {
  if (typeof value !== 'number')
    throw new Error('cannot write a non-number as a number');
  if (value < 0)
    throw new Error('specified a negative value for writing an unsigned value');
  if (value > max) throw new Error('RangeError: value out of range');
  if (Math.floor(value) !== value)
    throw new Error('value has a fractional component');
}
function readUInt64LE$1(buffer, offset) {
  const a = buffer.readUInt32LE(offset);
  let b = buffer.readUInt32LE(offset + 4);
  b *= 0x100000000;
  verifuint$1(b + a, 0x001fffffffffffff);
  return b + a;
}
bufferutils.readUInt64LE = readUInt64LE$1;
function writeUInt64LE$1(buffer, value, offset) {
  verifuint$1(value, 0x001fffffffffffff);
  buffer.writeInt32LE(value & -1, offset);
  buffer.writeUInt32LE(Math.floor(value / 0x100000000), offset + 4);
  return offset + 8;
}
bufferutils.writeUInt64LE = writeUInt64LE$1;
function reverseBuffer$1(buffer) {
  if (buffer.length < 1) return buffer;
  let j = buffer.length - 1;
  let tmp = 0;
  for (let i = 0; i < buffer.length / 2; i++) {
    tmp = buffer[i];
    buffer[i] = buffer[j];
    buffer[j] = tmp;
    j--;
  }
  return buffer;
}
bufferutils.reverseBuffer = reverseBuffer$1;
function cloneBuffer(buffer$1) {
  const clone = buffer.Buffer.allocUnsafe(buffer$1.length);
  buffer$1.copy(clone);
  return clone;
}
bufferutils.cloneBuffer = cloneBuffer;
/**
 * Helper class for serialization of bitcoin data types into a pre-allocated buffer.
 */
class BufferWriter {
  static withCapacity(size) {
    return new BufferWriter(buffer.Buffer.alloc(size));
  }
  constructor(buffer, offset = 0) {
    this.buffer = buffer;
    this.offset = offset;
    typeforce$2(types$2.tuple(types$2.Buffer, types$2.UInt32), [buffer, offset]);
  }
  writeUInt8(i) {
    this.offset = this.buffer.writeUInt8(i, this.offset);
  }
  writeInt32(i) {
    this.offset = this.buffer.writeInt32LE(i, this.offset);
  }
  writeUInt32(i) {
    this.offset = this.buffer.writeUInt32LE(i, this.offset);
  }
  writeUInt64(i) {
    this.offset = writeUInt64LE$1(this.buffer, i, this.offset);
  }
  writeVarInt(i) {
    varuint$7.encode(i, this.buffer, this.offset);
    this.offset += varuint$7.encode.bytes;
  }
  writeSlice(slice) {
    if (this.buffer.length < this.offset + slice.length) {
      throw new Error('Cannot write slice out of bounds');
    }
    this.offset += slice.copy(this.buffer, this.offset);
  }
  writeVarSlice(slice) {
    this.writeVarInt(slice.length);
    this.writeSlice(slice);
  }
  writeVector(vector) {
    this.writeVarInt(vector.length);
    vector.forEach(buf => this.writeVarSlice(buf));
  }
  end() {
    if (this.buffer.length === this.offset) {
      return this.buffer;
    }
    throw new Error(`buffer size ${this.buffer.length}, offset ${this.offset}`);
  }
}
bufferutils.BufferWriter = BufferWriter;
/**
 * Helper class for reading of bitcoin data types from a buffer.
 */
class BufferReader {
  constructor(buffer, offset = 0) {
    this.buffer = buffer;
    this.offset = offset;
    typeforce$2(types$2.tuple(types$2.Buffer, types$2.UInt32), [buffer, offset]);
  }
  readUInt8() {
    const result = this.buffer.readUInt8(this.offset);
    this.offset++;
    return result;
  }
  readInt32() {
    const result = this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return result;
  }
  readUInt32() {
    const result = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return result;
  }
  readUInt64() {
    const result = readUInt64LE$1(this.buffer, this.offset);
    this.offset += 8;
    return result;
  }
  readVarInt() {
    const vi = varuint$7.decode(this.buffer, this.offset);
    this.offset += varuint$7.decode.bytes;
    return vi;
  }
  readSlice(n) {
    if (this.buffer.length < this.offset + n) {
      throw new Error('Cannot read slice out of bounds');
    }
    const result = this.buffer.slice(this.offset, this.offset + n);
    this.offset += n;
    return result;
  }
  readVarSlice() {
    return this.readSlice(this.readVarInt());
  }
  readVector() {
    const count = this.readVarInt();
    const vector = [];
    for (let i = 0; i < count; i++) vector.push(this.readVarSlice());
    return vector;
  }
}
bufferutils.BufferReader = BufferReader;

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	exports.tweakKey =
	  exports.tapTweakHash =
	  exports.tapleafHash =
	  exports.findScriptPath =
	  exports.toHashTree =
	  exports.rootHashFromPath =
	  exports.MAX_TAPTREE_DEPTH =
	  exports.LEAF_VERSION_TAPSCRIPT =
	    void 0;
	const buffer_1 = buffer;
	const ecc_lib_1 = ecc_lib;
	const bcrypto = crypto;
	const bufferutils_1 = bufferutils;
	const types_1 = types$5;
	exports.LEAF_VERSION_TAPSCRIPT = 0xc0;
	exports.MAX_TAPTREE_DEPTH = 128;
	const isHashBranch = ht => 'left' in ht && 'right' in ht;
	function rootHashFromPath(controlBlock, leafHash) {
	  if (controlBlock.length < 33)
	    throw new TypeError(
	      `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`,
	    );
	  const m = (controlBlock.length - 33) / 32;
	  let kj = leafHash;
	  for (let j = 0; j < m; j++) {
	    const ej = controlBlock.slice(33 + 32 * j, 65 + 32 * j);
	    if (kj.compare(ej) < 0) {
	      kj = tapBranchHash(kj, ej);
	    } else {
	      kj = tapBranchHash(ej, kj);
	    }
	  }
	  return kj;
	}
	exports.rootHashFromPath = rootHashFromPath;
	/**
	 * Build a hash tree of merkle nodes from the scripts binary tree.
	 * @param scriptTree - the tree of scripts to pairwise hash.
	 */
	function toHashTree(scriptTree) {
	  if ((0, types_1.isTapleaf)(scriptTree))
	    return { hash: tapleafHash(scriptTree) };
	  const hashes = [toHashTree(scriptTree[0]), toHashTree(scriptTree[1])];
	  hashes.sort((a, b) => a.hash.compare(b.hash));
	  const [left, right] = hashes;
	  return {
	    hash: tapBranchHash(left.hash, right.hash),
	    left,
	    right,
	  };
	}
	exports.toHashTree = toHashTree;
	/**
	 * Given a HashTree, finds the path from a particular hash to the root.
	 * @param node - the root of the tree
	 * @param hash - the hash to search for
	 * @returns - array of sibling hashes, from leaf (inclusive) to root
	 * (exclusive) needed to prove inclusion of the specified hash. undefined if no
	 * path is found
	 */
	function findScriptPath(node, hash) {
	  if (isHashBranch(node)) {
	    const leftPath = findScriptPath(node.left, hash);
	    if (leftPath !== undefined) return [...leftPath, node.right.hash];
	    const rightPath = findScriptPath(node.right, hash);
	    if (rightPath !== undefined) return [...rightPath, node.left.hash];
	  } else if (node.hash.equals(hash)) {
	    return [];
	  }
	  return undefined;
	}
	exports.findScriptPath = findScriptPath;
	function tapleafHash(leaf) {
	  const version = leaf.version || exports.LEAF_VERSION_TAPSCRIPT;
	  return bcrypto.taggedHash(
	    'TapLeaf',
	    buffer_1.Buffer.concat([
	      buffer_1.Buffer.from([version]),
	      serializeScript(leaf.output),
	    ]),
	  );
	}
	exports.tapleafHash = tapleafHash;
	function tapTweakHash(pubKey, h) {
	  return bcrypto.taggedHash(
	    'TapTweak',
	    buffer_1.Buffer.concat(h ? [pubKey, h] : [pubKey]),
	  );
	}
	exports.tapTweakHash = tapTweakHash;
	function tweakKey(pubKey, h) {
	  if (!buffer_1.Buffer.isBuffer(pubKey)) return null;
	  if (pubKey.length !== 32) return null;
	  if (h && h.length !== 32) return null;
	  const tweakHash = tapTweakHash(pubKey, h);
	  const res = (0, ecc_lib_1.getEccLib)().xOnlyPointAddTweak(pubKey, tweakHash);
	  if (!res || res.xOnlyPubkey === null) return null;
	  return {
	    parity: res.parity,
	    x: buffer_1.Buffer.from(res.xOnlyPubkey),
	  };
	}
	exports.tweakKey = tweakKey;
	function tapBranchHash(a, b) {
	  return bcrypto.taggedHash('TapBranch', buffer_1.Buffer.concat([a, b]));
	}
	function serializeScript(s) {
	  const varintLen = bufferutils_1.varuint.encodingLength(s.length);
	  const buffer = buffer_1.Buffer.allocUnsafe(varintLen); // better
	  bufferutils_1.varuint.encode(s.length, buffer);
	  return buffer_1.Buffer.concat([buffer, s]);
	}
} (bip341));

Object.defineProperty(p2tr$1, '__esModule', { value: true });
p2tr$1.p2tr = void 0;
const buffer_1 = buffer;
const networks_1$1 = networks$1;
const bscript$4 = script;
const types_1$2 = types$5;
const ecc_lib_1 = ecc_lib;
const bip341_1$2 = bip341;
const lazy = lazy$8;
const bech32_1$1 = dist;
const OPS = bscript$4.OPS;
const TAPROOT_WITNESS_VERSION = 0x01;
const ANNEX_PREFIX = 0x50;
function p2tr(a, opts) {
  if (
    !a.address &&
    !a.output &&
    !a.pubkey &&
    !a.internalPubkey &&
    !(a.witness && a.witness.length > 1)
  )
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  (0, types_1$2.typeforce)(
    {
      address: types_1$2.typeforce.maybe(types_1$2.typeforce.String),
      input: types_1$2.typeforce.maybe(types_1$2.typeforce.BufferN(0)),
      network: types_1$2.typeforce.maybe(types_1$2.typeforce.Object),
      output: types_1$2.typeforce.maybe(types_1$2.typeforce.BufferN(34)),
      internalPubkey: types_1$2.typeforce.maybe(types_1$2.typeforce.BufferN(32)),
      hash: types_1$2.typeforce.maybe(types_1$2.typeforce.BufferN(32)),
      pubkey: types_1$2.typeforce.maybe(types_1$2.typeforce.BufferN(32)),
      signature: types_1$2.typeforce.maybe(types_1$2.typeforce.BufferN(64)),
      witness: types_1$2.typeforce.maybe(
        types_1$2.typeforce.arrayOf(types_1$2.typeforce.Buffer),
      ),
      scriptTree: types_1$2.typeforce.maybe(types_1$2.isTaptree),
      redeem: types_1$2.typeforce.maybe({
        output: types_1$2.typeforce.maybe(types_1$2.typeforce.Buffer),
        redeemVersion: types_1$2.typeforce.maybe(types_1$2.typeforce.Number),
        witness: types_1$2.typeforce.maybe(
          types_1$2.typeforce.arrayOf(types_1$2.typeforce.Buffer),
        ),
      }),
      redeemVersion: types_1$2.typeforce.maybe(types_1$2.typeforce.Number),
    },
    a,
  );
  const _address = lazy.value(() => {
    const result = bech32_1$1.bech32m.decode(a.address);
    const version = result.words.shift();
    const data = bech32_1$1.bech32m.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: buffer_1.Buffer.from(data),
    };
  });
  // remove annex if present, ignored by taproot
  const _witness = lazy.value(() => {
    if (!a.witness || !a.witness.length) return;
    if (
      a.witness.length >= 2 &&
      a.witness[a.witness.length - 1][0] === ANNEX_PREFIX
    ) {
      return a.witness.slice(0, -1);
    }
    return a.witness.slice();
  });
  const _hashTree = lazy.value(() => {
    if (a.scriptTree) return (0, bip341_1$2.toHashTree)(a.scriptTree);
    if (a.hash) return { hash: a.hash };
    return;
  });
  const network = a.network || networks_1$1.bitcoin;
  const o = { name: 'p2tr', network };
  lazy.prop(o, 'address', () => {
    if (!o.pubkey) return;
    const words = bech32_1$1.bech32m.toWords(o.pubkey);
    words.unshift(TAPROOT_WITNESS_VERSION);
    return bech32_1$1.bech32m.encode(network.bech32, words);
  });
  lazy.prop(o, 'hash', () => {
    const hashTree = _hashTree();
    if (hashTree) return hashTree.hash;
    const w = _witness();
    if (w && w.length > 1) {
      const controlBlock = w[w.length - 1];
      const leafVersion = controlBlock[0] & types_1$2.TAPLEAF_VERSION_MASK;
      const script = w[w.length - 2];
      const leafHash = (0, bip341_1$2.tapleafHash)({
        output: script,
        version: leafVersion,
      });
      return (0, bip341_1$2.rootHashFromPath)(controlBlock, leafHash);
    }
    return null;
  });
  lazy.prop(o, 'output', () => {
    if (!o.pubkey) return;
    return bscript$4.compile([OPS.OP_1, o.pubkey]);
  });
  lazy.prop(o, 'redeemVersion', () => {
    if (a.redeemVersion) return a.redeemVersion;
    if (
      a.redeem &&
      a.redeem.redeemVersion !== undefined &&
      a.redeem.redeemVersion !== null
    ) {
      return a.redeem.redeemVersion;
    }
    return bip341_1$2.LEAF_VERSION_TAPSCRIPT;
  });
  lazy.prop(o, 'redeem', () => {
    const witness = _witness(); // witness without annex
    if (!witness || witness.length < 2) return;
    return {
      output: witness[witness.length - 2],
      witness: witness.slice(0, -2),
      redeemVersion:
        witness[witness.length - 1][0] & types_1$2.TAPLEAF_VERSION_MASK,
    };
  });
  lazy.prop(o, 'pubkey', () => {
    if (a.pubkey) return a.pubkey;
    if (a.output) return a.output.slice(2);
    if (a.address) return _address().data;
    if (o.internalPubkey) {
      const tweakedKey = (0, bip341_1$2.tweakKey)(o.internalPubkey, o.hash);
      if (tweakedKey) return tweakedKey.x;
    }
  });
  lazy.prop(o, 'internalPubkey', () => {
    if (a.internalPubkey) return a.internalPubkey;
    const witness = _witness();
    if (witness && witness.length > 1)
      return witness[witness.length - 1].slice(1, 33);
  });
  lazy.prop(o, 'signature', () => {
    if (a.signature) return a.signature;
    const witness = _witness(); // witness without annex
    if (!witness || witness.length !== 1) return;
    return witness[0];
  });
  lazy.prop(o, 'witness', () => {
    if (a.witness) return a.witness;
    const hashTree = _hashTree();
    if (hashTree && a.redeem && a.redeem.output && a.internalPubkey) {
      const leafHash = (0, bip341_1$2.tapleafHash)({
        output: a.redeem.output,
        version: o.redeemVersion,
      });
      const path = (0, bip341_1$2.findScriptPath)(hashTree, leafHash);
      if (!path) return;
      const outputKey = (0, bip341_1$2.tweakKey)(a.internalPubkey, hashTree.hash);
      if (!outputKey) return;
      const controlBock = buffer_1.Buffer.concat(
        [
          buffer_1.Buffer.from([o.redeemVersion | outputKey.parity]),
          a.internalPubkey,
        ].concat(path),
      );
      return [a.redeem.output, controlBock];
    }
    if (a.signature) return [a.signature];
  });
  // extended validation
  if (opts.validate) {
    let pubkey = buffer_1.Buffer.from([]);
    if (a.address) {
      if (network && network.bech32 !== _address().prefix)
        throw new TypeError('Invalid prefix or Network mismatch');
      if (_address().version !== TAPROOT_WITNESS_VERSION)
        throw new TypeError('Invalid address version');
      if (_address().data.length !== 32)
        throw new TypeError('Invalid address data');
      pubkey = _address().data;
    }
    if (a.pubkey) {
      if (pubkey.length > 0 && !pubkey.equals(a.pubkey))
        throw new TypeError('Pubkey mismatch');
      else pubkey = a.pubkey;
    }
    if (a.output) {
      if (
        a.output.length !== 34 ||
        a.output[0] !== OPS.OP_1 ||
        a.output[1] !== 0x20
      )
        throw new TypeError('Output is invalid');
      if (pubkey.length > 0 && !pubkey.equals(a.output.slice(2)))
        throw new TypeError('Pubkey mismatch');
      else pubkey = a.output.slice(2);
    }
    if (a.internalPubkey) {
      const tweakedKey = (0, bip341_1$2.tweakKey)(a.internalPubkey, o.hash);
      if (pubkey.length > 0 && !pubkey.equals(tweakedKey.x))
        throw new TypeError('Pubkey mismatch');
      else pubkey = tweakedKey.x;
    }
    if (pubkey && pubkey.length) {
      if (!(0, ecc_lib_1.getEccLib)().isXOnlyPoint(pubkey))
        throw new TypeError('Invalid pubkey for p2tr');
    }
    const hashTree = _hashTree();
    if (a.hash && hashTree) {
      if (!a.hash.equals(hashTree.hash)) throw new TypeError('Hash mismatch');
    }
    if (a.redeem && a.redeem.output && hashTree) {
      const leafHash = (0, bip341_1$2.tapleafHash)({
        output: a.redeem.output,
        version: o.redeemVersion,
      });
      if (!(0, bip341_1$2.findScriptPath)(hashTree, leafHash))
        throw new TypeError('Redeem script not in tree');
    }
    const witness = _witness();
    // compare the provided redeem data with the one computed from witness
    if (a.redeem && o.redeem) {
      if (a.redeem.redeemVersion) {
        if (a.redeem.redeemVersion !== o.redeem.redeemVersion)
          throw new TypeError('Redeem.redeemVersion and witness mismatch');
      }
      if (a.redeem.output) {
        if (bscript$4.decompile(a.redeem.output).length === 0)
          throw new TypeError('Redeem.output is invalid');
        // output redeem is constructed from the witness
        if (o.redeem.output && !a.redeem.output.equals(o.redeem.output))
          throw new TypeError('Redeem.output and witness mismatch');
      }
      if (a.redeem.witness) {
        if (
          o.redeem.witness &&
          !stacksEqual(a.redeem.witness, o.redeem.witness)
        )
          throw new TypeError('Redeem.witness and witness mismatch');
      }
    }
    if (witness && witness.length) {
      if (witness.length === 1) {
        // key spending
        if (a.signature && !a.signature.equals(witness[0]))
          throw new TypeError('Signature mismatch');
      } else {
        // script path spending
        const controlBlock = witness[witness.length - 1];
        if (controlBlock.length < 33)
          throw new TypeError(
            `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`,
          );
        if ((controlBlock.length - 33) % 32 !== 0)
          throw new TypeError(
            `The control-block length of ${controlBlock.length} is incorrect!`,
          );
        const m = (controlBlock.length - 33) / 32;
        if (m > 128)
          throw new TypeError(
            `The script path is too long. Got ${m}, expected max 128.`,
          );
        const internalPubkey = controlBlock.slice(1, 33);
        if (a.internalPubkey && !a.internalPubkey.equals(internalPubkey))
          throw new TypeError('Internal pubkey mismatch');
        if (!(0, ecc_lib_1.getEccLib)().isXOnlyPoint(internalPubkey))
          throw new TypeError('Invalid internalPubkey for p2tr witness');
        const leafVersion = controlBlock[0] & types_1$2.TAPLEAF_VERSION_MASK;
        const script = witness[witness.length - 2];
        const leafHash = (0, bip341_1$2.tapleafHash)({
          output: script,
          version: leafVersion,
        });
        const hash = (0, bip341_1$2.rootHashFromPath)(controlBlock, leafHash);
        const outputKey = (0, bip341_1$2.tweakKey)(internalPubkey, hash);
        if (!outputKey)
          // todo: needs test data
          throw new TypeError('Invalid outputKey for p2tr witness');
        if (pubkey.length && !pubkey.equals(outputKey.x))
          throw new TypeError('Pubkey mismatch for p2tr witness');
        if (outputKey.parity !== (controlBlock[0] & 1))
          throw new Error('Incorrect parity');
      }
    }
  }
  return Object.assign(o, a);
}
p2tr$1.p2tr = p2tr;
function stacksEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	exports.p2tr =
	  exports.p2wsh =
	  exports.p2wpkh =
	  exports.p2sh =
	  exports.p2pkh =
	  exports.p2pk =
	  exports.p2ms =
	  exports.embed =
	    void 0;
	const embed_1 = embed;
	Object.defineProperty(exports, 'embed', {
	  enumerable: true,
	  get: function () {
	    return embed_1.p2data;
	  },
	});
	const p2ms_1 = p2ms$1;
	Object.defineProperty(exports, 'p2ms', {
	  enumerable: true,
	  get: function () {
	    return p2ms_1.p2ms;
	  },
	});
	const p2pk_1 = p2pk$1;
	Object.defineProperty(exports, 'p2pk', {
	  enumerable: true,
	  get: function () {
	    return p2pk_1.p2pk;
	  },
	});
	const p2pkh_1 = p2pkh$1;
	Object.defineProperty(exports, 'p2pkh', {
	  enumerable: true,
	  get: function () {
	    return p2pkh_1.p2pkh;
	  },
	});
	const p2sh_1 = p2sh$1;
	Object.defineProperty(exports, 'p2sh', {
	  enumerable: true,
	  get: function () {
	    return p2sh_1.p2sh;
	  },
	});
	const p2wpkh_1 = p2wpkh$1;
	Object.defineProperty(exports, 'p2wpkh', {
	  enumerable: true,
	  get: function () {
	    return p2wpkh_1.p2wpkh;
	  },
	});
	const p2wsh_1 = p2wsh$1;
	Object.defineProperty(exports, 'p2wsh', {
	  enumerable: true,
	  get: function () {
	    return p2wsh_1.p2wsh;
	  },
	});
	const p2tr_1 = p2tr$1;
	Object.defineProperty(exports, 'p2tr', {
	  enumerable: true,
	  get: function () {
	    return p2tr_1.p2tr;
	  },
	});
	// TODO
	// witness commitment
} (payments$3));

Object.defineProperty(address, '__esModule', { value: true });
address.toOutputScript =
  address.fromOutputScript =
  address.toBech32 =
  address.toBase58Check =
  address.fromBech32 =
  address.fromBase58Check =
    void 0;
const networks = networks$1;
const payments$2 = payments$3;
const bscript$3 = script;
const types_1$1 = types$5;
const bech32_1 = dist;
const bs58check = bs58check$3;
const FUTURE_SEGWIT_MAX_SIZE = 40;
const FUTURE_SEGWIT_MIN_SIZE = 2;
const FUTURE_SEGWIT_MAX_VERSION = 16;
const FUTURE_SEGWIT_MIN_VERSION = 2;
const FUTURE_SEGWIT_VERSION_DIFF = 0x50;
const FUTURE_SEGWIT_VERSION_WARNING =
  'WARNING: Sending to a future segwit version address can lead to loss of funds. ' +
  'End users MUST be warned carefully in the GUI and asked if they wish to proceed ' +
  'with caution. Wallets should verify the segwit version from the output of fromBech32, ' +
  'then decide when it is safe to use which version of segwit.';
function _toFutureSegwitAddress(output, network) {
  const data = output.slice(2);
  if (
    data.length < FUTURE_SEGWIT_MIN_SIZE ||
    data.length > FUTURE_SEGWIT_MAX_SIZE
  )
    throw new TypeError('Invalid program length for segwit address');
  const version = output[0] - FUTURE_SEGWIT_VERSION_DIFF;
  if (
    version < FUTURE_SEGWIT_MIN_VERSION ||
    version > FUTURE_SEGWIT_MAX_VERSION
  )
    throw new TypeError('Invalid version for segwit address');
  if (output[1] !== data.length)
    throw new TypeError('Invalid script for segwit address');
  console.warn(FUTURE_SEGWIT_VERSION_WARNING);
  return toBech32(data, version, network.bech32);
}
function fromBase58Check(address) {
  const payload = bs58check.decode(address);
  // TODO: 4.0.0, move to "toOutputScript"
  if (payload.length < 21) throw new TypeError(address + ' is too short');
  if (payload.length > 21) throw new TypeError(address + ' is too long');
  const version = payload.readUInt8(0);
  const hash = payload.slice(1);
  return { version, hash };
}
address.fromBase58Check = fromBase58Check;
function fromBech32(address) {
  let result;
  let version;
  try {
    result = bech32_1.bech32.decode(address);
  } catch (e) {}
  if (result) {
    version = result.words[0];
    if (version !== 0) throw new TypeError(address + ' uses wrong encoding');
  } else {
    result = bech32_1.bech32m.decode(address);
    version = result.words[0];
    if (version === 0) throw new TypeError(address + ' uses wrong encoding');
  }
  const data = bech32_1.bech32.fromWords(result.words.slice(1));
  return {
    version,
    prefix: result.prefix,
    data: buffer.Buffer.from(data),
  };
}
address.fromBech32 = fromBech32;
function toBase58Check(hash, version) {
  (0, types_1$1.typeforce)(
    (0, types_1$1.tuple)(types_1$1.Hash160bit, types_1$1.UInt8),
    arguments,
  );
  const payload = buffer.Buffer.allocUnsafe(21);
  payload.writeUInt8(version, 0);
  hash.copy(payload, 1);
  return bs58check.encode(payload);
}
address.toBase58Check = toBase58Check;
function toBech32(data, version, prefix) {
  const words = bech32_1.bech32.toWords(data);
  words.unshift(version);
  return version === 0
    ? bech32_1.bech32.encode(prefix, words)
    : bech32_1.bech32m.encode(prefix, words);
}
address.toBech32 = toBech32;
function fromOutputScript(output, network) {
  // TODO: Network
  network = network || networks.bitcoin;
  try {
    return payments$2.p2pkh({ output, network }).address;
  } catch (e) {}
  try {
    return payments$2.p2sh({ output, network }).address;
  } catch (e) {}
  try {
    return payments$2.p2wpkh({ output, network }).address;
  } catch (e) {}
  try {
    return payments$2.p2wsh({ output, network }).address;
  } catch (e) {}
  try {
    return payments$2.p2tr({ output, network }).address;
  } catch (e) {}
  try {
    return _toFutureSegwitAddress(output, network);
  } catch (e) {}
  throw new Error(bscript$3.toASM(output) + ' has no matching Address');
}
address.fromOutputScript = fromOutputScript;
function toOutputScript(address, network) {
  network = network || networks.bitcoin;
  let decodeBase58;
  let decodeBech32;
  try {
    decodeBase58 = fromBase58Check(address);
  } catch (e) {}
  if (decodeBase58) {
    if (decodeBase58.version === network.pubKeyHash)
      return payments$2.p2pkh({ hash: decodeBase58.hash }).output;
    if (decodeBase58.version === network.scriptHash)
      return payments$2.p2sh({ hash: decodeBase58.hash }).output;
  } else {
    try {
      decodeBech32 = fromBech32(address);
    } catch (e) {}
    if (decodeBech32) {
      if (decodeBech32.prefix !== network.bech32)
        throw new Error(address + ' has an invalid prefix');
      if (decodeBech32.version === 0) {
        if (decodeBech32.data.length === 20)
          return payments$2.p2wpkh({ hash: decodeBech32.data }).output;
        if (decodeBech32.data.length === 32)
          return payments$2.p2wsh({ hash: decodeBech32.data }).output;
      } else if (decodeBech32.version === 1) {
        if (decodeBech32.data.length === 32)
          return payments$2.p2tr({ pubkey: decodeBech32.data }).output;
      } else if (
        decodeBech32.version >= FUTURE_SEGWIT_MIN_VERSION &&
        decodeBech32.version <= FUTURE_SEGWIT_MAX_VERSION &&
        decodeBech32.data.length >= FUTURE_SEGWIT_MIN_SIZE &&
        decodeBech32.data.length <= FUTURE_SEGWIT_MAX_SIZE
      ) {
        console.warn(FUTURE_SEGWIT_VERSION_WARNING);
        return bscript$3.compile([
          decodeBech32.version + FUTURE_SEGWIT_VERSION_DIFF,
          decodeBech32.data,
        ]);
      }
    }
  }
  throw new Error(address + ' has no matching Script');
}
address.toOutputScript = toOutputScript;

var block = {};

var merkle = {};

Object.defineProperty(merkle, '__esModule', { value: true });
merkle.fastMerkleRoot = void 0;
function fastMerkleRoot(values, digestFn) {
  if (!Array.isArray(values)) throw TypeError('Expected values Array');
  if (typeof digestFn !== 'function')
    throw TypeError('Expected digest Function');
  let length = values.length;
  const results = values.concat();
  while (length > 1) {
    let j = 0;
    for (let i = 0; i < length; i += 2, ++j) {
      const left = results[i];
      const right = i + 1 === length ? left : results[i + 1];
      const data = buffer.Buffer.concat([left, right]);
      results[j] = digestFn(data);
    }
    length = j;
  }
  return results[0];
}
merkle.fastMerkleRoot = fastMerkleRoot;

var transaction = {};

Object.defineProperty(transaction, '__esModule', { value: true });
transaction.Transaction = void 0;
const bufferutils_1$2 = bufferutils;
const bcrypto$1 = crypto;
const bscript$2 = script;
const script_1 = script;
const types$1 = types$5;
const { typeforce: typeforce$1 } = types$1;
function varSliceSize(someScript) {
  const length = someScript.length;
  return bufferutils_1$2.varuint.encodingLength(length) + length;
}
function vectorSize(someVector) {
  const length = someVector.length;
  return (
    bufferutils_1$2.varuint.encodingLength(length) +
    someVector.reduce((sum, witness) => {
      return sum + varSliceSize(witness);
    }, 0)
  );
}
const EMPTY_BUFFER = buffer.Buffer.allocUnsafe(0);
const EMPTY_WITNESS = [];
const ZERO = buffer.Buffer.from(
  '0000000000000000000000000000000000000000000000000000000000000000',
  'hex',
);
const ONE = buffer.Buffer.from(
  '0000000000000000000000000000000000000000000000000000000000000001',
  'hex',
);
const VALUE_UINT64_MAX = buffer.Buffer.from('ffffffffffffffff', 'hex');
const BLANK_OUTPUT = {
  script: EMPTY_BUFFER,
  valueBuffer: VALUE_UINT64_MAX,
};
function isOutput(out) {
  return out.value !== undefined;
}
class Transaction {
  constructor() {
    this.version = 1;
    this.locktime = 0;
    this.ins = [];
    this.outs = [];
  }
  static fromBuffer(buffer, _NO_STRICT) {
    const bufferReader = new bufferutils_1$2.BufferReader(buffer);
    const tx = new Transaction();
    tx.version = bufferReader.readInt32();
    const marker = bufferReader.readUInt8();
    const flag = bufferReader.readUInt8();
    let hasWitnesses = false;
    if (
      marker === Transaction.ADVANCED_TRANSACTION_MARKER &&
      flag === Transaction.ADVANCED_TRANSACTION_FLAG
    ) {
      hasWitnesses = true;
    } else {
      bufferReader.offset -= 2;
    }
    const vinLen = bufferReader.readVarInt();
    for (let i = 0; i < vinLen; ++i) {
      tx.ins.push({
        hash: bufferReader.readSlice(32),
        index: bufferReader.readUInt32(),
        script: bufferReader.readVarSlice(),
        sequence: bufferReader.readUInt32(),
        witness: EMPTY_WITNESS,
      });
    }
    const voutLen = bufferReader.readVarInt();
    for (let i = 0; i < voutLen; ++i) {
      tx.outs.push({
        value: bufferReader.readUInt64(),
        script: bufferReader.readVarSlice(),
      });
    }
    if (hasWitnesses) {
      for (let i = 0; i < vinLen; ++i) {
        tx.ins[i].witness = bufferReader.readVector();
      }
      // was this pointless?
      if (!tx.hasWitnesses())
        throw new Error('Transaction has superfluous witness data');
    }
    tx.locktime = bufferReader.readUInt32();
    if (_NO_STRICT) return tx;
    if (bufferReader.offset !== buffer.length)
      throw new Error('Transaction has unexpected data');
    return tx;
  }
  static fromHex(hex) {
    return Transaction.fromBuffer(buffer.Buffer.from(hex, 'hex'), false);
  }
  static isCoinbaseHash(buffer) {
    typeforce$1(types$1.Hash256bit, buffer);
    for (let i = 0; i < 32; ++i) {
      if (buffer[i] !== 0) return false;
    }
    return true;
  }
  isCoinbase() {
    return (
      this.ins.length === 1 && Transaction.isCoinbaseHash(this.ins[0].hash)
    );
  }
  addInput(hash, index, sequence, scriptSig) {
    typeforce$1(
      types$1.tuple(
        types$1.Hash256bit,
        types$1.UInt32,
        types$1.maybe(types$1.UInt32),
        types$1.maybe(types$1.Buffer),
      ),
      arguments,
    );
    if (types$1.Null(sequence)) {
      sequence = Transaction.DEFAULT_SEQUENCE;
    }
    // Add the input and return the input's index
    return (
      this.ins.push({
        hash,
        index,
        script: scriptSig || EMPTY_BUFFER,
        sequence: sequence,
        witness: EMPTY_WITNESS,
      }) - 1
    );
  }
  addOutput(scriptPubKey, value) {
    typeforce$1(types$1.tuple(types$1.Buffer, types$1.Satoshi), arguments);
    // Add the output and return the output's index
    return (
      this.outs.push({
        script: scriptPubKey,
        value,
      }) - 1
    );
  }
  hasWitnesses() {
    return this.ins.some(x => {
      return x.witness.length !== 0;
    });
  }
  weight() {
    const base = this.byteLength(false);
    const total = this.byteLength(true);
    return base * 3 + total;
  }
  virtualSize() {
    return Math.ceil(this.weight() / 4);
  }
  byteLength(_ALLOW_WITNESS = true) {
    const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
    return (
      (hasWitnesses ? 10 : 8) +
      bufferutils_1$2.varuint.encodingLength(this.ins.length) +
      bufferutils_1$2.varuint.encodingLength(this.outs.length) +
      this.ins.reduce((sum, input) => {
        return sum + 40 + varSliceSize(input.script);
      }, 0) +
      this.outs.reduce((sum, output) => {
        return sum + 8 + varSliceSize(output.script);
      }, 0) +
      (hasWitnesses
        ? this.ins.reduce((sum, input) => {
            return sum + vectorSize(input.witness);
          }, 0)
        : 0)
    );
  }
  clone() {
    const newTx = new Transaction();
    newTx.version = this.version;
    newTx.locktime = this.locktime;
    newTx.ins = this.ins.map(txIn => {
      return {
        hash: txIn.hash,
        index: txIn.index,
        script: txIn.script,
        sequence: txIn.sequence,
        witness: txIn.witness,
      };
    });
    newTx.outs = this.outs.map(txOut => {
      return {
        script: txOut.script,
        value: txOut.value,
      };
    });
    return newTx;
  }
  /**
   * Hash transaction for signing a specific input.
   *
   * Bitcoin uses a different hash for each signed transaction input.
   * This method copies the transaction, makes the necessary changes based on the
   * hashType, and then hashes the result.
   * This hash can then be used to sign the provided transaction input.
   */
  hashForSignature(inIndex, prevOutScript, hashType) {
    typeforce$1(
      types$1.tuple(types$1.UInt32, types$1.Buffer, /* types.UInt8 */ types$1.Number),
      arguments,
    );
    // https://github.com/bitcoin/bitcoin/blob/master/src/test/sighash_tests.cpp#L29
    if (inIndex >= this.ins.length) return ONE;
    // ignore OP_CODESEPARATOR
    const ourScript = bscript$2.compile(
      bscript$2.decompile(prevOutScript).filter(x => {
        return x !== script_1.OPS.OP_CODESEPARATOR;
      }),
    );
    const txTmp = this.clone();
    // SIGHASH_NONE: ignore all outputs? (wildcard payee)
    if ((hashType & 0x1f) === Transaction.SIGHASH_NONE) {
      txTmp.outs = [];
      // ignore sequence numbers (except at inIndex)
      txTmp.ins.forEach((input, i) => {
        if (i === inIndex) return;
        input.sequence = 0;
      });
      // SIGHASH_SINGLE: ignore all outputs, except at the same index?
    } else if ((hashType & 0x1f) === Transaction.SIGHASH_SINGLE) {
      // https://github.com/bitcoin/bitcoin/blob/master/src/test/sighash_tests.cpp#L60
      if (inIndex >= this.outs.length) return ONE;
      // truncate outputs after
      txTmp.outs.length = inIndex + 1;
      // "blank" outputs before
      for (let i = 0; i < inIndex; i++) {
        txTmp.outs[i] = BLANK_OUTPUT;
      }
      // ignore sequence numbers (except at inIndex)
      txTmp.ins.forEach((input, y) => {
        if (y === inIndex) return;
        input.sequence = 0;
      });
    }
    // SIGHASH_ANYONECANPAY: ignore inputs entirely?
    if (hashType & Transaction.SIGHASH_ANYONECANPAY) {
      txTmp.ins = [txTmp.ins[inIndex]];
      txTmp.ins[0].script = ourScript;
      // SIGHASH_ALL: only ignore input scripts
    } else {
      // "blank" others input scripts
      txTmp.ins.forEach(input => {
        input.script = EMPTY_BUFFER;
      });
      txTmp.ins[inIndex].script = ourScript;
    }
    // serialize and hash
    const buffer$1 = buffer.Buffer.allocUnsafe(txTmp.byteLength(false) + 4);
    buffer$1.writeInt32LE(hashType, buffer$1.length - 4);
    txTmp.__toBuffer(buffer$1, 0, false);
    return bcrypto$1.hash256(buffer$1);
  }
  hashForWitnessV1(inIndex, prevOutScripts, values, hashType, leafHash, annex) {
    // https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki#common-signature-message
    typeforce$1(
      types$1.tuple(
        types$1.UInt32,
        typeforce$1.arrayOf(types$1.Buffer),
        typeforce$1.arrayOf(types$1.Satoshi),
        types$1.UInt32,
      ),
      arguments,
    );
    if (
      values.length !== this.ins.length ||
      prevOutScripts.length !== this.ins.length
    ) {
      throw new Error('Must supply prevout script and value for all inputs');
    }
    const outputType =
      hashType === Transaction.SIGHASH_DEFAULT
        ? Transaction.SIGHASH_ALL
        : hashType & Transaction.SIGHASH_OUTPUT_MASK;
    const inputType = hashType & Transaction.SIGHASH_INPUT_MASK;
    const isAnyoneCanPay = inputType === Transaction.SIGHASH_ANYONECANPAY;
    const isNone = outputType === Transaction.SIGHASH_NONE;
    const isSingle = outputType === Transaction.SIGHASH_SINGLE;
    let hashPrevouts = EMPTY_BUFFER;
    let hashAmounts = EMPTY_BUFFER;
    let hashScriptPubKeys = EMPTY_BUFFER;
    let hashSequences = EMPTY_BUFFER;
    let hashOutputs = EMPTY_BUFFER;
    if (!isAnyoneCanPay) {
      let bufferWriter = bufferutils_1$2.BufferWriter.withCapacity(
        36 * this.ins.length,
      );
      this.ins.forEach(txIn => {
        bufferWriter.writeSlice(txIn.hash);
        bufferWriter.writeUInt32(txIn.index);
      });
      hashPrevouts = bcrypto$1.sha256(bufferWriter.end());
      bufferWriter = bufferutils_1$2.BufferWriter.withCapacity(
        8 * this.ins.length,
      );
      values.forEach(value => bufferWriter.writeUInt64(value));
      hashAmounts = bcrypto$1.sha256(bufferWriter.end());
      bufferWriter = bufferutils_1$2.BufferWriter.withCapacity(
        prevOutScripts.map(varSliceSize).reduce((a, b) => a + b),
      );
      prevOutScripts.forEach(prevOutScript =>
        bufferWriter.writeVarSlice(prevOutScript),
      );
      hashScriptPubKeys = bcrypto$1.sha256(bufferWriter.end());
      bufferWriter = bufferutils_1$2.BufferWriter.withCapacity(
        4 * this.ins.length,
      );
      this.ins.forEach(txIn => bufferWriter.writeUInt32(txIn.sequence));
      hashSequences = bcrypto$1.sha256(bufferWriter.end());
    }
    if (!(isNone || isSingle)) {
      const txOutsSize = this.outs
        .map(output => 8 + varSliceSize(output.script))
        .reduce((a, b) => a + b);
      const bufferWriter = bufferutils_1$2.BufferWriter.withCapacity(txOutsSize);
      this.outs.forEach(out => {
        bufferWriter.writeUInt64(out.value);
        bufferWriter.writeVarSlice(out.script);
      });
      hashOutputs = bcrypto$1.sha256(bufferWriter.end());
    } else if (isSingle && inIndex < this.outs.length) {
      const output = this.outs[inIndex];
      const bufferWriter = bufferutils_1$2.BufferWriter.withCapacity(
        8 + varSliceSize(output.script),
      );
      bufferWriter.writeUInt64(output.value);
      bufferWriter.writeVarSlice(output.script);
      hashOutputs = bcrypto$1.sha256(bufferWriter.end());
    }
    const spendType = (leafHash ? 2 : 0) + (annex ? 1 : 0);
    // Length calculation from:
    // https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki#cite_note-14
    // With extension from:
    // https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki#signature-validation
    const sigMsgSize =
      174 -
      (isAnyoneCanPay ? 49 : 0) -
      (isNone ? 32 : 0) +
      (annex ? 32 : 0) +
      (leafHash ? 37 : 0);
    const sigMsgWriter = bufferutils_1$2.BufferWriter.withCapacity(sigMsgSize);
    sigMsgWriter.writeUInt8(hashType);
    // Transaction
    sigMsgWriter.writeInt32(this.version);
    sigMsgWriter.writeUInt32(this.locktime);
    sigMsgWriter.writeSlice(hashPrevouts);
    sigMsgWriter.writeSlice(hashAmounts);
    sigMsgWriter.writeSlice(hashScriptPubKeys);
    sigMsgWriter.writeSlice(hashSequences);
    if (!(isNone || isSingle)) {
      sigMsgWriter.writeSlice(hashOutputs);
    }
    // Input
    sigMsgWriter.writeUInt8(spendType);
    if (isAnyoneCanPay) {
      const input = this.ins[inIndex];
      sigMsgWriter.writeSlice(input.hash);
      sigMsgWriter.writeUInt32(input.index);
      sigMsgWriter.writeUInt64(values[inIndex]);
      sigMsgWriter.writeVarSlice(prevOutScripts[inIndex]);
      sigMsgWriter.writeUInt32(input.sequence);
    } else {
      sigMsgWriter.writeUInt32(inIndex);
    }
    if (annex) {
      const bufferWriter = bufferutils_1$2.BufferWriter.withCapacity(
        varSliceSize(annex),
      );
      bufferWriter.writeVarSlice(annex);
      sigMsgWriter.writeSlice(bcrypto$1.sha256(bufferWriter.end()));
    }
    // Output
    if (isSingle) {
      sigMsgWriter.writeSlice(hashOutputs);
    }
    // BIP342 extension
    if (leafHash) {
      sigMsgWriter.writeSlice(leafHash);
      sigMsgWriter.writeUInt8(0);
      sigMsgWriter.writeUInt32(0xffffffff);
    }
    // Extra zero byte because:
    // https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki#cite_note-19
    return bcrypto$1.taggedHash(
      'TapSighash',
      buffer.Buffer.concat([buffer.Buffer.of(0x00), sigMsgWriter.end()]),
    );
  }
  hashForWitnessV0(inIndex, prevOutScript, value, hashType) {
    typeforce$1(
      types$1.tuple(types$1.UInt32, types$1.Buffer, types$1.Satoshi, types$1.UInt32),
      arguments,
    );
    let tbuffer = buffer.Buffer.from([]);
    let bufferWriter;
    let hashOutputs = ZERO;
    let hashPrevouts = ZERO;
    let hashSequence = ZERO;
    if (!(hashType & Transaction.SIGHASH_ANYONECANPAY)) {
      tbuffer = buffer.Buffer.allocUnsafe(36 * this.ins.length);
      bufferWriter = new bufferutils_1$2.BufferWriter(tbuffer, 0);
      this.ins.forEach(txIn => {
        bufferWriter.writeSlice(txIn.hash);
        bufferWriter.writeUInt32(txIn.index);
      });
      hashPrevouts = bcrypto$1.hash256(tbuffer);
    }
    if (
      !(hashType & Transaction.SIGHASH_ANYONECANPAY) &&
      (hashType & 0x1f) !== Transaction.SIGHASH_SINGLE &&
      (hashType & 0x1f) !== Transaction.SIGHASH_NONE
    ) {
      tbuffer = buffer.Buffer.allocUnsafe(4 * this.ins.length);
      bufferWriter = new bufferutils_1$2.BufferWriter(tbuffer, 0);
      this.ins.forEach(txIn => {
        bufferWriter.writeUInt32(txIn.sequence);
      });
      hashSequence = bcrypto$1.hash256(tbuffer);
    }
    if (
      (hashType & 0x1f) !== Transaction.SIGHASH_SINGLE &&
      (hashType & 0x1f) !== Transaction.SIGHASH_NONE
    ) {
      const txOutsSize = this.outs.reduce((sum, output) => {
        return sum + 8 + varSliceSize(output.script);
      }, 0);
      tbuffer = buffer.Buffer.allocUnsafe(txOutsSize);
      bufferWriter = new bufferutils_1$2.BufferWriter(tbuffer, 0);
      this.outs.forEach(out => {
        bufferWriter.writeUInt64(out.value);
        bufferWriter.writeVarSlice(out.script);
      });
      hashOutputs = bcrypto$1.hash256(tbuffer);
    } else if (
      (hashType & 0x1f) === Transaction.SIGHASH_SINGLE &&
      inIndex < this.outs.length
    ) {
      const output = this.outs[inIndex];
      tbuffer = buffer.Buffer.allocUnsafe(8 + varSliceSize(output.script));
      bufferWriter = new bufferutils_1$2.BufferWriter(tbuffer, 0);
      bufferWriter.writeUInt64(output.value);
      bufferWriter.writeVarSlice(output.script);
      hashOutputs = bcrypto$1.hash256(tbuffer);
    }
    tbuffer = buffer.Buffer.allocUnsafe(156 + varSliceSize(prevOutScript));
    bufferWriter = new bufferutils_1$2.BufferWriter(tbuffer, 0);
    const input = this.ins[inIndex];
    bufferWriter.writeInt32(this.version);
    bufferWriter.writeSlice(hashPrevouts);
    bufferWriter.writeSlice(hashSequence);
    bufferWriter.writeSlice(input.hash);
    bufferWriter.writeUInt32(input.index);
    bufferWriter.writeVarSlice(prevOutScript);
    bufferWriter.writeUInt64(value);
    bufferWriter.writeUInt32(input.sequence);
    bufferWriter.writeSlice(hashOutputs);
    bufferWriter.writeUInt32(this.locktime);
    bufferWriter.writeUInt32(hashType);
    return bcrypto$1.hash256(tbuffer);
  }
  getHash(forWitness) {
    // wtxid for coinbase is always 32 bytes of 0x00
    if (forWitness && this.isCoinbase()) return buffer.Buffer.alloc(32, 0);
    return bcrypto$1.hash256(this.__toBuffer(undefined, undefined, forWitness));
  }
  getId() {
    // transaction hash's are displayed in reverse order
    return (0, bufferutils_1$2.reverseBuffer)(this.getHash(false)).toString(
      'hex',
    );
  }
  toBuffer(buffer, initialOffset) {
    return this.__toBuffer(buffer, initialOffset, true);
  }
  toHex() {
    return this.toBuffer(undefined, undefined).toString('hex');
  }
  setInputScript(index, scriptSig) {
    typeforce$1(types$1.tuple(types$1.Number, types$1.Buffer), arguments);
    this.ins[index].script = scriptSig;
  }
  setWitness(index, witness) {
    typeforce$1(types$1.tuple(types$1.Number, [types$1.Buffer]), arguments);
    this.ins[index].witness = witness;
  }
  __toBuffer(buffer$1, initialOffset, _ALLOW_WITNESS = false) {
    if (!buffer$1) buffer$1 = buffer.Buffer.allocUnsafe(this.byteLength(_ALLOW_WITNESS));
    const bufferWriter = new bufferutils_1$2.BufferWriter(
      buffer$1,
      initialOffset || 0,
    );
    bufferWriter.writeInt32(this.version);
    const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
    if (hasWitnesses) {
      bufferWriter.writeUInt8(Transaction.ADVANCED_TRANSACTION_MARKER);
      bufferWriter.writeUInt8(Transaction.ADVANCED_TRANSACTION_FLAG);
    }
    bufferWriter.writeVarInt(this.ins.length);
    this.ins.forEach(txIn => {
      bufferWriter.writeSlice(txIn.hash);
      bufferWriter.writeUInt32(txIn.index);
      bufferWriter.writeVarSlice(txIn.script);
      bufferWriter.writeUInt32(txIn.sequence);
    });
    bufferWriter.writeVarInt(this.outs.length);
    this.outs.forEach(txOut => {
      if (isOutput(txOut)) {
        bufferWriter.writeUInt64(txOut.value);
      } else {
        bufferWriter.writeSlice(txOut.valueBuffer);
      }
      bufferWriter.writeVarSlice(txOut.script);
    });
    if (hasWitnesses) {
      this.ins.forEach(input => {
        bufferWriter.writeVector(input.witness);
      });
    }
    bufferWriter.writeUInt32(this.locktime);
    // avoid slicing unless necessary
    if (initialOffset !== undefined)
      return buffer$1.slice(initialOffset, bufferWriter.offset);
    return buffer$1;
  }
}
transaction.Transaction = Transaction;
Transaction.DEFAULT_SEQUENCE = 0xffffffff;
Transaction.SIGHASH_DEFAULT = 0x00;
Transaction.SIGHASH_ALL = 0x01;
Transaction.SIGHASH_NONE = 0x02;
Transaction.SIGHASH_SINGLE = 0x03;
Transaction.SIGHASH_ANYONECANPAY = 0x80;
Transaction.SIGHASH_OUTPUT_MASK = 0x03;
Transaction.SIGHASH_INPUT_MASK = 0x80;
Transaction.ADVANCED_TRANSACTION_MARKER = 0x00;
Transaction.ADVANCED_TRANSACTION_FLAG = 0x01;

Object.defineProperty(block, '__esModule', { value: true });
block.Block = void 0;
const bufferutils_1$1 = bufferutils;
const bcrypto = crypto;
const merkle_1 = merkle;
const transaction_1$3 = transaction;
const types = types$5;
const { typeforce } = types;
const errorMerkleNoTxes = new TypeError(
  'Cannot compute merkle root for zero transactions',
);
const errorWitnessNotSegwit = new TypeError(
  'Cannot compute witness commit for non-segwit block',
);
class Block {
  constructor() {
    this.version = 1;
    this.prevHash = undefined;
    this.merkleRoot = undefined;
    this.timestamp = 0;
    this.witnessCommit = undefined;
    this.bits = 0;
    this.nonce = 0;
    this.transactions = undefined;
  }
  static fromBuffer(buffer) {
    if (buffer.length < 80) throw new Error('Buffer too small (< 80 bytes)');
    const bufferReader = new bufferutils_1$1.BufferReader(buffer);
    const block = new Block();
    block.version = bufferReader.readInt32();
    block.prevHash = bufferReader.readSlice(32);
    block.merkleRoot = bufferReader.readSlice(32);
    block.timestamp = bufferReader.readUInt32();
    block.bits = bufferReader.readUInt32();
    block.nonce = bufferReader.readUInt32();
    if (buffer.length === 80) return block;
    const readTransaction = () => {
      const tx = transaction_1$3.Transaction.fromBuffer(
        bufferReader.buffer.slice(bufferReader.offset),
        true,
      );
      bufferReader.offset += tx.byteLength();
      return tx;
    };
    const nTransactions = bufferReader.readVarInt();
    block.transactions = [];
    for (let i = 0; i < nTransactions; ++i) {
      const tx = readTransaction();
      block.transactions.push(tx);
    }
    const witnessCommit = block.getWitnessCommit();
    // This Block contains a witness commit
    if (witnessCommit) block.witnessCommit = witnessCommit;
    return block;
  }
  static fromHex(hex) {
    return Block.fromBuffer(buffer.Buffer.from(hex, 'hex'));
  }
  static calculateTarget(bits) {
    const exponent = ((bits & 0xff000000) >> 24) - 3;
    const mantissa = bits & 0x007fffff;
    const target = buffer.Buffer.alloc(32, 0);
    target.writeUIntBE(mantissa, 29 - exponent, 3);
    return target;
  }
  static calculateMerkleRoot(transactions, forWitness) {
    typeforce([{ getHash: types.Function }], transactions);
    if (transactions.length === 0) throw errorMerkleNoTxes;
    if (forWitness && !txesHaveWitnessCommit(transactions))
      throw errorWitnessNotSegwit;
    const hashes = transactions.map(transaction =>
      transaction.getHash(forWitness),
    );
    const rootHash = (0, merkle_1.fastMerkleRoot)(hashes, bcrypto.hash256);
    return forWitness
      ? bcrypto.hash256(
          buffer.Buffer.concat([rootHash, transactions[0].ins[0].witness[0]]),
        )
      : rootHash;
  }
  getWitnessCommit() {
    if (!txesHaveWitnessCommit(this.transactions)) return null;
    // The merkle root for the witness data is in an OP_RETURN output.
    // There is no rule for the index of the output, so use filter to find it.
    // The root is prepended with 0xaa21a9ed so check for 0x6a24aa21a9ed
    // If multiple commits are found, the output with highest index is assumed.
    const witnessCommits = this.transactions[0].outs
      .filter(out =>
        out.script.slice(0, 6).equals(buffer.Buffer.from('6a24aa21a9ed', 'hex')),
      )
      .map(out => out.script.slice(6, 38));
    if (witnessCommits.length === 0) return null;
    // Use the commit with the highest output (should only be one though)
    const result = witnessCommits[witnessCommits.length - 1];
    if (!(result instanceof buffer.Buffer && result.length === 32)) return null;
    return result;
  }
  hasWitnessCommit() {
    if (
      this.witnessCommit instanceof buffer.Buffer &&
      this.witnessCommit.length === 32
    )
      return true;
    if (this.getWitnessCommit() !== null) return true;
    return false;
  }
  hasWitness() {
    return anyTxHasWitness(this.transactions);
  }
  weight() {
    const base = this.byteLength(false, false);
    const total = this.byteLength(false, true);
    return base * 3 + total;
  }
  byteLength(headersOnly, allowWitness = true) {
    if (headersOnly || !this.transactions) return 80;
    return (
      80 +
      bufferutils_1$1.varuint.encodingLength(this.transactions.length) +
      this.transactions.reduce((a, x) => a + x.byteLength(allowWitness), 0)
    );
  }
  getHash() {
    return bcrypto.hash256(this.toBuffer(true));
  }
  getId() {
    return (0, bufferutils_1$1.reverseBuffer)(this.getHash()).toString('hex');
  }
  getUTCDate() {
    const date = new Date(0); // epoch
    date.setUTCSeconds(this.timestamp);
    return date;
  }
  // TODO: buffer, offset compatibility
  toBuffer(headersOnly) {
    const buffer$1 = buffer.Buffer.allocUnsafe(this.byteLength(headersOnly));
    const bufferWriter = new bufferutils_1$1.BufferWriter(buffer$1);
    bufferWriter.writeInt32(this.version);
    bufferWriter.writeSlice(this.prevHash);
    bufferWriter.writeSlice(this.merkleRoot);
    bufferWriter.writeUInt32(this.timestamp);
    bufferWriter.writeUInt32(this.bits);
    bufferWriter.writeUInt32(this.nonce);
    if (headersOnly || !this.transactions) return buffer$1;
    bufferutils_1$1.varuint.encode(
      this.transactions.length,
      buffer$1,
      bufferWriter.offset,
    );
    bufferWriter.offset += bufferutils_1$1.varuint.encode.bytes;
    this.transactions.forEach(tx => {
      const txSize = tx.byteLength(); // TODO: extract from toBuffer?
      tx.toBuffer(buffer$1, bufferWriter.offset);
      bufferWriter.offset += txSize;
    });
    return buffer$1;
  }
  toHex(headersOnly) {
    return this.toBuffer(headersOnly).toString('hex');
  }
  checkTxRoots() {
    // If the Block has segwit transactions but no witness commit,
    // there's no way it can be valid, so fail the check.
    const hasWitnessCommit = this.hasWitnessCommit();
    if (!hasWitnessCommit && this.hasWitness()) return false;
    return (
      this.__checkMerkleRoot() &&
      (hasWitnessCommit ? this.__checkWitnessCommit() : true)
    );
  }
  checkProofOfWork() {
    const hash = (0, bufferutils_1$1.reverseBuffer)(this.getHash());
    const target = Block.calculateTarget(this.bits);
    return hash.compare(target) <= 0;
  }
  __checkMerkleRoot() {
    if (!this.transactions) throw errorMerkleNoTxes;
    const actualMerkleRoot = Block.calculateMerkleRoot(this.transactions);
    return this.merkleRoot.compare(actualMerkleRoot) === 0;
  }
  __checkWitnessCommit() {
    if (!this.transactions) throw errorMerkleNoTxes;
    if (!this.hasWitnessCommit()) throw errorWitnessNotSegwit;
    const actualWitnessCommit = Block.calculateMerkleRoot(
      this.transactions,
      true,
    );
    return this.witnessCommit.compare(actualWitnessCommit) === 0;
  }
}
block.Block = Block;
function txesHaveWitnessCommit(transactions) {
  return (
    transactions instanceof Array &&
    transactions[0] &&
    transactions[0].ins &&
    transactions[0].ins instanceof Array &&
    transactions[0].ins[0] &&
    transactions[0].ins[0].witness &&
    transactions[0].ins[0].witness instanceof Array &&
    transactions[0].ins[0].witness.length > 0
  );
}
function anyTxHasWitness(transactions) {
  return (
    transactions instanceof Array &&
    transactions.some(
      tx =>
        typeof tx === 'object' &&
        tx.ins instanceof Array &&
        tx.ins.some(
          input =>
            typeof input === 'object' &&
            input.witness instanceof Array &&
            input.witness.length > 0,
        ),
    )
  );
}

var psbt$1 = {};

var psbt = {};

var combiner = {};

var parser = {};

var fromBuffer = {};

var converter = {};

var typeFields = {};

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	(function(GlobalTypes) {
	  GlobalTypes[(GlobalTypes['UNSIGNED_TX'] = 0)] = 'UNSIGNED_TX';
	  GlobalTypes[(GlobalTypes['GLOBAL_XPUB'] = 1)] = 'GLOBAL_XPUB';
	})((exports.GlobalTypes || (exports.GlobalTypes = {})));
	exports.GLOBAL_TYPE_NAMES = ['unsignedTx', 'globalXpub'];
	(function(InputTypes) {
	  InputTypes[(InputTypes['NON_WITNESS_UTXO'] = 0)] = 'NON_WITNESS_UTXO';
	  InputTypes[(InputTypes['WITNESS_UTXO'] = 1)] = 'WITNESS_UTXO';
	  InputTypes[(InputTypes['PARTIAL_SIG'] = 2)] = 'PARTIAL_SIG';
	  InputTypes[(InputTypes['SIGHASH_TYPE'] = 3)] = 'SIGHASH_TYPE';
	  InputTypes[(InputTypes['REDEEM_SCRIPT'] = 4)] = 'REDEEM_SCRIPT';
	  InputTypes[(InputTypes['WITNESS_SCRIPT'] = 5)] = 'WITNESS_SCRIPT';
	  InputTypes[(InputTypes['BIP32_DERIVATION'] = 6)] = 'BIP32_DERIVATION';
	  InputTypes[(InputTypes['FINAL_SCRIPTSIG'] = 7)] = 'FINAL_SCRIPTSIG';
	  InputTypes[(InputTypes['FINAL_SCRIPTWITNESS'] = 8)] = 'FINAL_SCRIPTWITNESS';
	  InputTypes[(InputTypes['POR_COMMITMENT'] = 9)] = 'POR_COMMITMENT';
	  InputTypes[(InputTypes['TAP_KEY_SIG'] = 19)] = 'TAP_KEY_SIG';
	  InputTypes[(InputTypes['TAP_SCRIPT_SIG'] = 20)] = 'TAP_SCRIPT_SIG';
	  InputTypes[(InputTypes['TAP_LEAF_SCRIPT'] = 21)] = 'TAP_LEAF_SCRIPT';
	  InputTypes[(InputTypes['TAP_BIP32_DERIVATION'] = 22)] =
	    'TAP_BIP32_DERIVATION';
	  InputTypes[(InputTypes['TAP_INTERNAL_KEY'] = 23)] = 'TAP_INTERNAL_KEY';
	  InputTypes[(InputTypes['TAP_MERKLE_ROOT'] = 24)] = 'TAP_MERKLE_ROOT';
	})((exports.InputTypes || (exports.InputTypes = {})));
	exports.INPUT_TYPE_NAMES = [
	  'nonWitnessUtxo',
	  'witnessUtxo',
	  'partialSig',
	  'sighashType',
	  'redeemScript',
	  'witnessScript',
	  'bip32Derivation',
	  'finalScriptSig',
	  'finalScriptWitness',
	  'porCommitment',
	  'tapKeySig',
	  'tapScriptSig',
	  'tapLeafScript',
	  'tapBip32Derivation',
	  'tapInternalKey',
	  'tapMerkleRoot',
	];
	(function(OutputTypes) {
	  OutputTypes[(OutputTypes['REDEEM_SCRIPT'] = 0)] = 'REDEEM_SCRIPT';
	  OutputTypes[(OutputTypes['WITNESS_SCRIPT'] = 1)] = 'WITNESS_SCRIPT';
	  OutputTypes[(OutputTypes['BIP32_DERIVATION'] = 2)] = 'BIP32_DERIVATION';
	  OutputTypes[(OutputTypes['TAP_INTERNAL_KEY'] = 5)] = 'TAP_INTERNAL_KEY';
	  OutputTypes[(OutputTypes['TAP_TREE'] = 6)] = 'TAP_TREE';
	  OutputTypes[(OutputTypes['TAP_BIP32_DERIVATION'] = 7)] =
	    'TAP_BIP32_DERIVATION';
	})((exports.OutputTypes || (exports.OutputTypes = {})));
	exports.OUTPUT_TYPE_NAMES = [
	  'redeemScript',
	  'witnessScript',
	  'bip32Derivation',
	  'tapInternalKey',
	  'tapTree',
	  'tapBip32Derivation',
	];
} (typeFields));

var globalXpub$1 = {};

Object.defineProperty(globalXpub$1, '__esModule', { value: true });
const typeFields_1$g = typeFields;
const range$2 = n => [...Array(n).keys()];
function decode$d(keyVal) {
  if (keyVal.key[0] !== typeFields_1$g.GlobalTypes.GLOBAL_XPUB) {
    throw new Error(
      'Decode Error: could not decode globalXpub with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (keyVal.key.length !== 79 || ![2, 3].includes(keyVal.key[46])) {
    throw new Error(
      'Decode Error: globalXpub has invalid extended pubkey in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if ((keyVal.value.length / 4) % 1 !== 0) {
    throw new Error(
      'Decode Error: Global GLOBAL_XPUB value length should be multiple of 4',
    );
  }
  const extendedPubkey = keyVal.key.slice(1);
  const data = {
    masterFingerprint: keyVal.value.slice(0, 4),
    extendedPubkey,
    path: 'm',
  };
  for (const i of range$2(keyVal.value.length / 4 - 1)) {
    const val = keyVal.value.readUInt32LE(i * 4 + 4);
    const isHard = !!(val & 0x80000000);
    const idx = val & 0x7fffffff;
    data.path += '/' + idx.toString(10) + (isHard ? "'" : '');
  }
  return data;
}
globalXpub$1.decode = decode$d;
function encode$e(data) {
  const head = buffer.Buffer.from([typeFields_1$g.GlobalTypes.GLOBAL_XPUB]);
  const key = buffer.Buffer.concat([head, data.extendedPubkey]);
  const splitPath = data.path.split('/');
  const value = buffer.Buffer.allocUnsafe(splitPath.length * 4);
  data.masterFingerprint.copy(value, 0);
  let offset = 4;
  splitPath.slice(1).forEach(level => {
    const isHard = level.slice(-1) === "'";
    let num = 0x7fffffff & parseInt(isHard ? level.slice(0, -1) : level, 10);
    if (isHard) num += 0x80000000;
    value.writeUInt32LE(num, offset);
    offset += 4;
  });
  return {
    key,
    value,
  };
}
globalXpub$1.encode = encode$e;
globalXpub$1.expected =
  '{ masterFingerprint: Buffer; extendedPubkey: Buffer; path: string; }';
function check$c(data) {
  const epk = data.extendedPubkey;
  const mfp = data.masterFingerprint;
  const p = data.path;
  return (
    buffer.Buffer.isBuffer(epk) &&
    epk.length === 78 &&
    [2, 3].indexOf(epk[45]) > -1 &&
    buffer.Buffer.isBuffer(mfp) &&
    mfp.length === 4 &&
    typeof p === 'string' &&
    !!p.match(/^m(\/\d+'?)*$/)
  );
}
globalXpub$1.check = check$c;
function canAddToArray$3(array, item, dupeSet) {
  const dupeString = item.extendedPubkey.toString('hex');
  if (dupeSet.has(dupeString)) return false;
  dupeSet.add(dupeString);
  return (
    array.filter(v => v.extendedPubkey.equals(item.extendedPubkey)).length === 0
  );
}
globalXpub$1.canAddToArray = canAddToArray$3;

var unsignedTx$1 = {};

Object.defineProperty(unsignedTx$1, '__esModule', { value: true });
const typeFields_1$f = typeFields;
function encode$d(data) {
  return {
    key: buffer.Buffer.from([typeFields_1$f.GlobalTypes.UNSIGNED_TX]),
    value: data.toBuffer(),
  };
}
unsignedTx$1.encode = encode$d;

var finalScriptSig$1 = {};

Object.defineProperty(finalScriptSig$1, '__esModule', { value: true });
const typeFields_1$e = typeFields;
function decode$c(keyVal) {
  if (keyVal.key[0] !== typeFields_1$e.InputTypes.FINAL_SCRIPTSIG) {
    throw new Error(
      'Decode Error: could not decode finalScriptSig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}
finalScriptSig$1.decode = decode$c;
function encode$c(data) {
  const key = buffer.Buffer.from([typeFields_1$e.InputTypes.FINAL_SCRIPTSIG]);
  return {
    key,
    value: data,
  };
}
finalScriptSig$1.encode = encode$c;
finalScriptSig$1.expected = 'Buffer';
function check$b(data) {
  return buffer.Buffer.isBuffer(data);
}
finalScriptSig$1.check = check$b;
function canAdd$8(currentData, newData) {
  return !!currentData && !!newData && currentData.finalScriptSig === undefined;
}
finalScriptSig$1.canAdd = canAdd$8;

var finalScriptWitness$1 = {};

Object.defineProperty(finalScriptWitness$1, '__esModule', { value: true });
const typeFields_1$d = typeFields;
function decode$b(keyVal) {
  if (keyVal.key[0] !== typeFields_1$d.InputTypes.FINAL_SCRIPTWITNESS) {
    throw new Error(
      'Decode Error: could not decode finalScriptWitness with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}
finalScriptWitness$1.decode = decode$b;
function encode$b(data) {
  const key = buffer.Buffer.from([typeFields_1$d.InputTypes.FINAL_SCRIPTWITNESS]);
  return {
    key,
    value: data,
  };
}
finalScriptWitness$1.encode = encode$b;
finalScriptWitness$1.expected = 'Buffer';
function check$a(data) {
  return buffer.Buffer.isBuffer(data);
}
finalScriptWitness$1.check = check$a;
function canAdd$7(currentData, newData) {
  return (
    !!currentData && !!newData && currentData.finalScriptWitness === undefined
  );
}
finalScriptWitness$1.canAdd = canAdd$7;

var nonWitnessUtxo$1 = {};

Object.defineProperty(nonWitnessUtxo$1, '__esModule', { value: true });
const typeFields_1$c = typeFields;
function decode$a(keyVal) {
  if (keyVal.key[0] !== typeFields_1$c.InputTypes.NON_WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode nonWitnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}
nonWitnessUtxo$1.decode = decode$a;
function encode$a(data) {
  return {
    key: buffer.Buffer.from([typeFields_1$c.InputTypes.NON_WITNESS_UTXO]),
    value: data,
  };
}
nonWitnessUtxo$1.encode = encode$a;
nonWitnessUtxo$1.expected = 'Buffer';
function check$9(data) {
  return buffer.Buffer.isBuffer(data);
}
nonWitnessUtxo$1.check = check$9;
function canAdd$6(currentData, newData) {
  return !!currentData && !!newData && currentData.nonWitnessUtxo === undefined;
}
nonWitnessUtxo$1.canAdd = canAdd$6;

var partialSig$1 = {};

Object.defineProperty(partialSig$1, '__esModule', { value: true });
const typeFields_1$b = typeFields;
function decode$9(keyVal) {
  if (keyVal.key[0] !== typeFields_1$b.InputTypes.PARTIAL_SIG) {
    throw new Error(
      'Decode Error: could not decode partialSig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (
    !(keyVal.key.length === 34 || keyVal.key.length === 66) ||
    ![2, 3, 4].includes(keyVal.key[1])
  ) {
    throw new Error(
      'Decode Error: partialSig has invalid pubkey in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const pubkey = keyVal.key.slice(1);
  return {
    pubkey,
    signature: keyVal.value,
  };
}
partialSig$1.decode = decode$9;
function encode$9(pSig) {
  const head = buffer.Buffer.from([typeFields_1$b.InputTypes.PARTIAL_SIG]);
  return {
    key: buffer.Buffer.concat([head, pSig.pubkey]),
    value: pSig.signature,
  };
}
partialSig$1.encode = encode$9;
partialSig$1.expected = '{ pubkey: Buffer; signature: Buffer; }';
function check$8(data) {
  return (
    buffer.Buffer.isBuffer(data.pubkey) &&
    buffer.Buffer.isBuffer(data.signature) &&
    [33, 65].includes(data.pubkey.length) &&
    [2, 3, 4].includes(data.pubkey[0]) &&
    isDerSigWithSighash(data.signature)
  );
}
partialSig$1.check = check$8;
function isDerSigWithSighash(buf) {
  if (!buffer.Buffer.isBuffer(buf) || buf.length < 9) return false;
  if (buf[0] !== 0x30) return false;
  if (buf.length !== buf[1] + 3) return false;
  if (buf[2] !== 0x02) return false;
  const rLen = buf[3];
  if (rLen > 33 || rLen < 1) return false;
  if (buf[3 + rLen + 1] !== 0x02) return false;
  const sLen = buf[3 + rLen + 2];
  if (sLen > 33 || sLen < 1) return false;
  if (buf.length !== 3 + rLen + 2 + sLen + 2) return false;
  return true;
}
function canAddToArray$2(array, item, dupeSet) {
  const dupeString = item.pubkey.toString('hex');
  if (dupeSet.has(dupeString)) return false;
  dupeSet.add(dupeString);
  return array.filter(v => v.pubkey.equals(item.pubkey)).length === 0;
}
partialSig$1.canAddToArray = canAddToArray$2;

var porCommitment$1 = {};

Object.defineProperty(porCommitment$1, '__esModule', { value: true });
const typeFields_1$a = typeFields;
function decode$8(keyVal) {
  if (keyVal.key[0] !== typeFields_1$a.InputTypes.POR_COMMITMENT) {
    throw new Error(
      'Decode Error: could not decode porCommitment with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value.toString('utf8');
}
porCommitment$1.decode = decode$8;
function encode$8(data) {
  const key = buffer.Buffer.from([typeFields_1$a.InputTypes.POR_COMMITMENT]);
  return {
    key,
    value: buffer.Buffer.from(data, 'utf8'),
  };
}
porCommitment$1.encode = encode$8;
porCommitment$1.expected = 'string';
function check$7(data) {
  return typeof data === 'string';
}
porCommitment$1.check = check$7;
function canAdd$5(currentData, newData) {
  return !!currentData && !!newData && currentData.porCommitment === undefined;
}
porCommitment$1.canAdd = canAdd$5;

var sighashType$1 = {};

Object.defineProperty(sighashType$1, '__esModule', { value: true });
const typeFields_1$9 = typeFields;
function decode$7(keyVal) {
  if (keyVal.key[0] !== typeFields_1$9.InputTypes.SIGHASH_TYPE) {
    throw new Error(
      'Decode Error: could not decode sighashType with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value.readUInt32LE(0);
}
sighashType$1.decode = decode$7;
function encode$7(data) {
  const key = buffer.Buffer.from([typeFields_1$9.InputTypes.SIGHASH_TYPE]);
  const value = buffer.Buffer.allocUnsafe(4);
  value.writeUInt32LE(data, 0);
  return {
    key,
    value,
  };
}
sighashType$1.encode = encode$7;
sighashType$1.expected = 'number';
function check$6(data) {
  return typeof data === 'number';
}
sighashType$1.check = check$6;
function canAdd$4(currentData, newData) {
  return !!currentData && !!newData && currentData.sighashType === undefined;
}
sighashType$1.canAdd = canAdd$4;

var tapKeySig$1 = {};

Object.defineProperty(tapKeySig$1, '__esModule', { value: true });
const typeFields_1$8 = typeFields;
function decode$6(keyVal) {
  if (
    keyVal.key[0] !== typeFields_1$8.InputTypes.TAP_KEY_SIG ||
    keyVal.key.length !== 1
  ) {
    throw new Error(
      'Decode Error: could not decode tapKeySig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (!check$5(keyVal.value)) {
    throw new Error(
      'Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature',
    );
  }
  return keyVal.value;
}
tapKeySig$1.decode = decode$6;
function encode$6(value) {
  const key = buffer.Buffer.from([typeFields_1$8.InputTypes.TAP_KEY_SIG]);
  return { key, value };
}
tapKeySig$1.encode = encode$6;
tapKeySig$1.expected = 'Buffer';
function check$5(data) {
  return buffer.Buffer.isBuffer(data) && (data.length === 64 || data.length === 65);
}
tapKeySig$1.check = check$5;
function canAdd$3(currentData, newData) {
  return !!currentData && !!newData && currentData.tapKeySig === undefined;
}
tapKeySig$1.canAdd = canAdd$3;

var tapLeafScript$1 = {};

Object.defineProperty(tapLeafScript$1, '__esModule', { value: true });
const typeFields_1$7 = typeFields;
function decode$5(keyVal) {
  if (keyVal.key[0] !== typeFields_1$7.InputTypes.TAP_LEAF_SCRIPT) {
    throw new Error(
      'Decode Error: could not decode tapLeafScript with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if ((keyVal.key.length - 2) % 32 !== 0) {
    throw new Error(
      'Decode Error: tapLeafScript has invalid control block in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const leafVersion = keyVal.value[keyVal.value.length - 1];
  if ((keyVal.key[1] & 0xfe) !== leafVersion) {
    throw new Error(
      'Decode Error: tapLeafScript bad leaf version in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const script = keyVal.value.slice(0, -1);
  const controlBlock = keyVal.key.slice(1);
  return { controlBlock, script, leafVersion };
}
tapLeafScript$1.decode = decode$5;
function encode$5(tScript) {
  const head = buffer.Buffer.from([typeFields_1$7.InputTypes.TAP_LEAF_SCRIPT]);
  const verBuf = buffer.Buffer.from([tScript.leafVersion]);
  return {
    key: buffer.Buffer.concat([head, tScript.controlBlock]),
    value: buffer.Buffer.concat([tScript.script, verBuf]),
  };
}
tapLeafScript$1.encode = encode$5;
tapLeafScript$1.expected =
  '{ controlBlock: Buffer; leafVersion: number, script: Buffer; }';
function check$4(data) {
  return (
    buffer.Buffer.isBuffer(data.controlBlock) &&
    (data.controlBlock.length - 1) % 32 === 0 &&
    (data.controlBlock[0] & 0xfe) === data.leafVersion &&
    buffer.Buffer.isBuffer(data.script)
  );
}
tapLeafScript$1.check = check$4;
function canAddToArray$1(array, item, dupeSet) {
  const dupeString = item.controlBlock.toString('hex');
  if (dupeSet.has(dupeString)) return false;
  dupeSet.add(dupeString);
  return (
    array.filter(v => v.controlBlock.equals(item.controlBlock)).length === 0
  );
}
tapLeafScript$1.canAddToArray = canAddToArray$1;

var tapMerkleRoot$1 = {};

Object.defineProperty(tapMerkleRoot$1, '__esModule', { value: true });
const typeFields_1$6 = typeFields;
function decode$4(keyVal) {
  if (
    keyVal.key[0] !== typeFields_1$6.InputTypes.TAP_MERKLE_ROOT ||
    keyVal.key.length !== 1
  ) {
    throw new Error(
      'Decode Error: could not decode tapMerkleRoot with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (!check$3(keyVal.value)) {
    throw new Error('Decode Error: tapMerkleRoot not a 32-byte hash');
  }
  return keyVal.value;
}
tapMerkleRoot$1.decode = decode$4;
function encode$4(value) {
  const key = buffer.Buffer.from([typeFields_1$6.InputTypes.TAP_MERKLE_ROOT]);
  return { key, value };
}
tapMerkleRoot$1.encode = encode$4;
tapMerkleRoot$1.expected = 'Buffer';
function check$3(data) {
  return buffer.Buffer.isBuffer(data) && data.length === 32;
}
tapMerkleRoot$1.check = check$3;
function canAdd$2(currentData, newData) {
  return !!currentData && !!newData && currentData.tapMerkleRoot === undefined;
}
tapMerkleRoot$1.canAdd = canAdd$2;

var tapScriptSig$1 = {};

Object.defineProperty(tapScriptSig$1, '__esModule', { value: true });
const typeFields_1$5 = typeFields;
function decode$3(keyVal) {
  if (keyVal.key[0] !== typeFields_1$5.InputTypes.TAP_SCRIPT_SIG) {
    throw new Error(
      'Decode Error: could not decode tapScriptSig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (keyVal.key.length !== 65) {
    throw new Error(
      'Decode Error: tapScriptSig has invalid key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (keyVal.value.length !== 64 && keyVal.value.length !== 65) {
    throw new Error(
      'Decode Error: tapScriptSig has invalid signature in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const pubkey = keyVal.key.slice(1, 33);
  const leafHash = keyVal.key.slice(33);
  return {
    pubkey,
    leafHash,
    signature: keyVal.value,
  };
}
tapScriptSig$1.decode = decode$3;
function encode$3(tSig) {
  const head = buffer.Buffer.from([typeFields_1$5.InputTypes.TAP_SCRIPT_SIG]);
  return {
    key: buffer.Buffer.concat([head, tSig.pubkey, tSig.leafHash]),
    value: tSig.signature,
  };
}
tapScriptSig$1.encode = encode$3;
tapScriptSig$1.expected = '{ pubkey: Buffer; leafHash: Buffer; signature: Buffer; }';
function check$2(data) {
  return (
    buffer.Buffer.isBuffer(data.pubkey) &&
    buffer.Buffer.isBuffer(data.leafHash) &&
    buffer.Buffer.isBuffer(data.signature) &&
    data.pubkey.length === 32 &&
    data.leafHash.length === 32 &&
    (data.signature.length === 64 || data.signature.length === 65)
  );
}
tapScriptSig$1.check = check$2;
function canAddToArray(array, item, dupeSet) {
  const dupeString =
    item.pubkey.toString('hex') + item.leafHash.toString('hex');
  if (dupeSet.has(dupeString)) return false;
  dupeSet.add(dupeString);
  return (
    array.filter(
      v => v.pubkey.equals(item.pubkey) && v.leafHash.equals(item.leafHash),
    ).length === 0
  );
}
tapScriptSig$1.canAddToArray = canAddToArray;

var witnessUtxo$1 = {};

var tools = {};

var varint = {};

Object.defineProperty(varint, '__esModule', { value: true });
// Number.MAX_SAFE_INTEGER
const MAX_SAFE_INTEGER = 9007199254740991;
function checkUInt53(n) {
  if (n < 0 || n > MAX_SAFE_INTEGER || n % 1 !== 0)
    throw new RangeError('value out of range');
}
function encode$2(_number, buffer$1, offset) {
  checkUInt53(_number);
  if (!buffer$1) buffer$1 = buffer.Buffer.allocUnsafe(encodingLength(_number));
  if (!buffer.Buffer.isBuffer(buffer$1))
    throw new TypeError('buffer must be a Buffer instance');
  if (!offset) offset = 0;
  // 8 bit
  if (_number < 0xfd) {
    buffer$1.writeUInt8(_number, offset);
    Object.assign(encode$2, { bytes: 1 });
    // 16 bit
  } else if (_number <= 0xffff) {
    buffer$1.writeUInt8(0xfd, offset);
    buffer$1.writeUInt16LE(_number, offset + 1);
    Object.assign(encode$2, { bytes: 3 });
    // 32 bit
  } else if (_number <= 0xffffffff) {
    buffer$1.writeUInt8(0xfe, offset);
    buffer$1.writeUInt32LE(_number, offset + 1);
    Object.assign(encode$2, { bytes: 5 });
    // 64 bit
  } else {
    buffer$1.writeUInt8(0xff, offset);
    buffer$1.writeUInt32LE(_number >>> 0, offset + 1);
    buffer$1.writeUInt32LE((_number / 0x100000000) | 0, offset + 5);
    Object.assign(encode$2, { bytes: 9 });
  }
  return buffer$1;
}
varint.encode = encode$2;
function decode$2(buffer$1, offset) {
  if (!buffer.Buffer.isBuffer(buffer$1))
    throw new TypeError('buffer must be a Buffer instance');
  if (!offset) offset = 0;
  const first = buffer$1.readUInt8(offset);
  // 8 bit
  if (first < 0xfd) {
    Object.assign(decode$2, { bytes: 1 });
    return first;
    // 16 bit
  } else if (first === 0xfd) {
    Object.assign(decode$2, { bytes: 3 });
    return buffer$1.readUInt16LE(offset + 1);
    // 32 bit
  } else if (first === 0xfe) {
    Object.assign(decode$2, { bytes: 5 });
    return buffer$1.readUInt32LE(offset + 1);
    // 64 bit
  } else {
    Object.assign(decode$2, { bytes: 9 });
    const lo = buffer$1.readUInt32LE(offset + 1);
    const hi = buffer$1.readUInt32LE(offset + 5);
    const _number = hi * 0x0100000000 + lo;
    checkUInt53(_number);
    return _number;
  }
}
varint.decode = decode$2;
function encodingLength(_number) {
  checkUInt53(_number);
  return _number < 0xfd
    ? 1
    : _number <= 0xffff
    ? 3
    : _number <= 0xffffffff
    ? 5
    : 9;
}
varint.encodingLength = encodingLength;

Object.defineProperty(tools, '__esModule', { value: true });
const varuint$6 = varint;
tools.range = n => [...Array(n).keys()];
function reverseBuffer(buffer) {
  if (buffer.length < 1) return buffer;
  let j = buffer.length - 1;
  let tmp = 0;
  for (let i = 0; i < buffer.length / 2; i++) {
    tmp = buffer[i];
    buffer[i] = buffer[j];
    buffer[j] = tmp;
    j--;
  }
  return buffer;
}
tools.reverseBuffer = reverseBuffer;
function keyValsToBuffer(keyVals) {
  const buffers = keyVals.map(keyValToBuffer);
  buffers.push(buffer.Buffer.from([0]));
  return buffer.Buffer.concat(buffers);
}
tools.keyValsToBuffer = keyValsToBuffer;
function keyValToBuffer(keyVal) {
  const keyLen = keyVal.key.length;
  const valLen = keyVal.value.length;
  const keyVarIntLen = varuint$6.encodingLength(keyLen);
  const valVarIntLen = varuint$6.encodingLength(valLen);
  const buffer$1 = buffer.Buffer.allocUnsafe(
    keyVarIntLen + keyLen + valVarIntLen + valLen,
  );
  varuint$6.encode(keyLen, buffer$1, 0);
  keyVal.key.copy(buffer$1, keyVarIntLen);
  varuint$6.encode(valLen, buffer$1, keyVarIntLen + keyLen);
  keyVal.value.copy(buffer$1, keyVarIntLen + keyLen + valVarIntLen);
  return buffer$1;
}
tools.keyValToBuffer = keyValToBuffer;
// https://github.com/feross/buffer/blob/master/index.js#L1127
function verifuint(value, max) {
  if (typeof value !== 'number')
    throw new Error('cannot write a non-number as a number');
  if (value < 0)
    throw new Error('specified a negative value for writing an unsigned value');
  if (value > max) throw new Error('RangeError: value out of range');
  if (Math.floor(value) !== value)
    throw new Error('value has a fractional component');
}
function readUInt64LE(buffer, offset) {
  const a = buffer.readUInt32LE(offset);
  let b = buffer.readUInt32LE(offset + 4);
  b *= 0x100000000;
  verifuint(b + a, 0x001fffffffffffff);
  return b + a;
}
tools.readUInt64LE = readUInt64LE;
function writeUInt64LE(buffer, value, offset) {
  verifuint(value, 0x001fffffffffffff);
  buffer.writeInt32LE(value & -1, offset);
  buffer.writeUInt32LE(Math.floor(value / 0x100000000), offset + 4);
  return offset + 8;
}
tools.writeUInt64LE = writeUInt64LE;

Object.defineProperty(witnessUtxo$1, '__esModule', { value: true });
const typeFields_1$4 = typeFields;
const tools_1$2 = tools;
const varuint$5 = varint;
function decode$1(keyVal) {
  if (keyVal.key[0] !== typeFields_1$4.InputTypes.WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode witnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const value = tools_1$2.readUInt64LE(keyVal.value, 0);
  let _offset = 8;
  const scriptLen = varuint$5.decode(keyVal.value, _offset);
  _offset += varuint$5.encodingLength(scriptLen);
  const script = keyVal.value.slice(_offset);
  if (script.length !== scriptLen) {
    throw new Error('Decode Error: WITNESS_UTXO script is not proper length');
  }
  return {
    script,
    value,
  };
}
witnessUtxo$1.decode = decode$1;
function encode$1(data) {
  const { script, value } = data;
  const varintLen = varuint$5.encodingLength(script.length);
  const result = buffer.Buffer.allocUnsafe(8 + varintLen + script.length);
  tools_1$2.writeUInt64LE(result, value, 0);
  varuint$5.encode(script.length, result, 8);
  script.copy(result, 8 + varintLen);
  return {
    key: buffer.Buffer.from([typeFields_1$4.InputTypes.WITNESS_UTXO]),
    value: result,
  };
}
witnessUtxo$1.encode = encode$1;
witnessUtxo$1.expected = '{ script: Buffer; value: number; }';
function check$1(data) {
  return buffer.Buffer.isBuffer(data.script) && typeof data.value === 'number';
}
witnessUtxo$1.check = check$1;
function canAdd$1(currentData, newData) {
  return !!currentData && !!newData && currentData.witnessUtxo === undefined;
}
witnessUtxo$1.canAdd = canAdd$1;

var tapTree$1 = {};

Object.defineProperty(tapTree$1, '__esModule', { value: true });
const typeFields_1$3 = typeFields;
const varuint$4 = varint;
function decode(keyVal) {
  if (
    keyVal.key[0] !== typeFields_1$3.OutputTypes.TAP_TREE ||
    keyVal.key.length !== 1
  ) {
    throw new Error(
      'Decode Error: could not decode tapTree with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  let _offset = 0;
  const data = [];
  while (_offset < keyVal.value.length) {
    const depth = keyVal.value[_offset++];
    const leafVersion = keyVal.value[_offset++];
    const scriptLen = varuint$4.decode(keyVal.value, _offset);
    _offset += varuint$4.encodingLength(scriptLen);
    data.push({
      depth,
      leafVersion,
      script: keyVal.value.slice(_offset, _offset + scriptLen),
    });
    _offset += scriptLen;
  }
  return { leaves: data };
}
tapTree$1.decode = decode;
function encode(tree) {
  const key = buffer.Buffer.from([typeFields_1$3.OutputTypes.TAP_TREE]);
  const bufs = [].concat(
    ...tree.leaves.map(tapLeaf => [
      buffer.Buffer.of(tapLeaf.depth, tapLeaf.leafVersion),
      varuint$4.encode(tapLeaf.script.length),
      tapLeaf.script,
    ]),
  );
  return {
    key,
    value: buffer.Buffer.concat(bufs),
  };
}
tapTree$1.encode = encode;
tapTree$1.expected =
  '{ leaves: [{ depth: number; leafVersion: number, script: Buffer; }] }';
function check(data) {
  return (
    Array.isArray(data.leaves) &&
    data.leaves.every(
      tapLeaf =>
        tapLeaf.depth >= 0 &&
        tapLeaf.depth <= 128 &&
        (tapLeaf.leafVersion & 0xfe) === tapLeaf.leafVersion &&
        buffer.Buffer.isBuffer(tapLeaf.script),
    )
  );
}
tapTree$1.check = check;
function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.tapTree === undefined;
}
tapTree$1.canAdd = canAdd;

var bip32Derivation$2 = {};

Object.defineProperty(bip32Derivation$2, '__esModule', { value: true });
const range$1 = n => [...Array(n).keys()];
const isValidDERKey = pubkey =>
  (pubkey.length === 33 && [2, 3].includes(pubkey[0])) ||
  (pubkey.length === 65 && 4 === pubkey[0]);
function makeConverter$4(TYPE_BYTE, isValidPubkey = isValidDERKey) {
  function decode(keyVal) {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode bip32Derivation with key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    const pubkey = keyVal.key.slice(1);
    if (!isValidPubkey(pubkey)) {
      throw new Error(
        'Decode Error: bip32Derivation has invalid pubkey in key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    if ((keyVal.value.length / 4) % 1 !== 0) {
      throw new Error(
        'Decode Error: Input BIP32_DERIVATION value length should be multiple of 4',
      );
    }
    const data = {
      masterFingerprint: keyVal.value.slice(0, 4),
      pubkey,
      path: 'm',
    };
    for (const i of range$1(keyVal.value.length / 4 - 1)) {
      const val = keyVal.value.readUInt32LE(i * 4 + 4);
      const isHard = !!(val & 0x80000000);
      const idx = val & 0x7fffffff;
      data.path += '/' + idx.toString(10) + (isHard ? "'" : '');
    }
    return data;
  }
  function encode(data) {
    const head = buffer.Buffer.from([TYPE_BYTE]);
    const key = buffer.Buffer.concat([head, data.pubkey]);
    const splitPath = data.path.split('/');
    const value = buffer.Buffer.allocUnsafe(splitPath.length * 4);
    data.masterFingerprint.copy(value, 0);
    let offset = 4;
    splitPath.slice(1).forEach(level => {
      const isHard = level.slice(-1) === "'";
      let num = 0x7fffffff & parseInt(isHard ? level.slice(0, -1) : level, 10);
      if (isHard) num += 0x80000000;
      value.writeUInt32LE(num, offset);
      offset += 4;
    });
    return {
      key,
      value,
    };
  }
  const expected =
    '{ masterFingerprint: Buffer; pubkey: Buffer; path: string; }';
  function check(data) {
    return (
      buffer.Buffer.isBuffer(data.pubkey) &&
      buffer.Buffer.isBuffer(data.masterFingerprint) &&
      typeof data.path === 'string' &&
      isValidPubkey(data.pubkey) &&
      data.masterFingerprint.length === 4
    );
  }
  function canAddToArray(array, item, dupeSet) {
    const dupeString = item.pubkey.toString('hex');
    if (dupeSet.has(dupeString)) return false;
    dupeSet.add(dupeString);
    return array.filter(v => v.pubkey.equals(item.pubkey)).length === 0;
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAddToArray,
  };
}
bip32Derivation$2.makeConverter = makeConverter$4;

var checkPubkey$1 = {};

Object.defineProperty(checkPubkey$1, '__esModule', { value: true });
function makeChecker(pubkeyTypes) {
  return checkPubkey;
  function checkPubkey(keyVal) {
    let pubkey;
    if (pubkeyTypes.includes(keyVal.key[0])) {
      pubkey = keyVal.key.slice(1);
      if (
        !(pubkey.length === 33 || pubkey.length === 65) ||
        ![2, 3, 4].includes(pubkey[0])
      ) {
        throw new Error(
          'Format Error: invalid pubkey in key 0x' + keyVal.key.toString('hex'),
        );
      }
    }
    return pubkey;
  }
}
checkPubkey$1.makeChecker = makeChecker;

var redeemScript$1 = {};

Object.defineProperty(redeemScript$1, '__esModule', { value: true });
function makeConverter$3(TYPE_BYTE) {
  function decode(keyVal) {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode redeemScript with key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    return keyVal.value;
  }
  function encode(data) {
    const key = buffer.Buffer.from([TYPE_BYTE]);
    return {
      key,
      value: data,
    };
  }
  const expected = 'Buffer';
  function check(data) {
    return buffer.Buffer.isBuffer(data);
  }
  function canAdd(currentData, newData) {
    return !!currentData && !!newData && currentData.redeemScript === undefined;
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAdd,
  };
}
redeemScript$1.makeConverter = makeConverter$3;

var tapBip32Derivation$1 = {};

Object.defineProperty(tapBip32Derivation$1, '__esModule', { value: true });
const varuint$3 = varint;
const bip32Derivation$1 = bip32Derivation$2;
const isValidBIP340Key = pubkey => pubkey.length === 32;
function makeConverter$2(TYPE_BYTE) {
  const parent = bip32Derivation$1.makeConverter(TYPE_BYTE, isValidBIP340Key);
  function decode(keyVal) {
    const nHashes = varuint$3.decode(keyVal.value);
    const nHashesLen = varuint$3.encodingLength(nHashes);
    const base = parent.decode({
      key: keyVal.key,
      value: keyVal.value.slice(nHashesLen + nHashes * 32),
    });
    const leafHashes = new Array(nHashes);
    for (let i = 0, _offset = nHashesLen; i < nHashes; i++, _offset += 32) {
      leafHashes[i] = keyVal.value.slice(_offset, _offset + 32);
    }
    return Object.assign({}, base, { leafHashes });
  }
  function encode(data) {
    const base = parent.encode(data);
    const nHashesLen = varuint$3.encodingLength(data.leafHashes.length);
    const nHashesBuf = buffer.Buffer.allocUnsafe(nHashesLen);
    varuint$3.encode(data.leafHashes.length, nHashesBuf);
    const value = buffer.Buffer.concat([nHashesBuf, ...data.leafHashes, base.value]);
    return Object.assign({}, base, { value });
  }
  const expected =
    '{ ' +
    'masterFingerprint: Buffer; ' +
    'pubkey: Buffer; ' +
    'path: string; ' +
    'leafHashes: Buffer[]; ' +
    '}';
  function check(data) {
    return (
      Array.isArray(data.leafHashes) &&
      data.leafHashes.every(
        leafHash => buffer.Buffer.isBuffer(leafHash) && leafHash.length === 32,
      ) &&
      parent.check(data)
    );
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAddToArray: parent.canAddToArray,
  };
}
tapBip32Derivation$1.makeConverter = makeConverter$2;

var tapInternalKey$1 = {};

Object.defineProperty(tapInternalKey$1, '__esModule', { value: true });
function makeConverter$1(TYPE_BYTE) {
  function decode(keyVal) {
    if (keyVal.key[0] !== TYPE_BYTE || keyVal.key.length !== 1) {
      throw new Error(
        'Decode Error: could not decode tapInternalKey with key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    if (keyVal.value.length !== 32) {
      throw new Error(
        'Decode Error: tapInternalKey not a 32-byte x-only pubkey',
      );
    }
    return keyVal.value;
  }
  function encode(value) {
    const key = buffer.Buffer.from([TYPE_BYTE]);
    return { key, value };
  }
  const expected = 'Buffer';
  function check(data) {
    return buffer.Buffer.isBuffer(data) && data.length === 32;
  }
  function canAdd(currentData, newData) {
    return (
      !!currentData && !!newData && currentData.tapInternalKey === undefined
    );
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAdd,
  };
}
tapInternalKey$1.makeConverter = makeConverter$1;

var witnessScript$1 = {};

Object.defineProperty(witnessScript$1, '__esModule', { value: true });
function makeConverter(TYPE_BYTE) {
  function decode(keyVal) {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode witnessScript with key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    return keyVal.value;
  }
  function encode(data) {
    const key = buffer.Buffer.from([TYPE_BYTE]);
    return {
      key,
      value: data,
    };
  }
  const expected = 'Buffer';
  function check(data) {
    return buffer.Buffer.isBuffer(data);
  }
  function canAdd(currentData, newData) {
    return (
      !!currentData && !!newData && currentData.witnessScript === undefined
    );
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAdd,
  };
}
witnessScript$1.makeConverter = makeConverter;

Object.defineProperty(converter, '__esModule', { value: true });
const typeFields_1$2 = typeFields;
const globalXpub = globalXpub$1;
const unsignedTx = unsignedTx$1;
const finalScriptSig = finalScriptSig$1;
const finalScriptWitness = finalScriptWitness$1;
const nonWitnessUtxo = nonWitnessUtxo$1;
const partialSig = partialSig$1;
const porCommitment = porCommitment$1;
const sighashType = sighashType$1;
const tapKeySig = tapKeySig$1;
const tapLeafScript = tapLeafScript$1;
const tapMerkleRoot = tapMerkleRoot$1;
const tapScriptSig = tapScriptSig$1;
const witnessUtxo = witnessUtxo$1;
const tapTree = tapTree$1;
const bip32Derivation = bip32Derivation$2;
const checkPubkey = checkPubkey$1;
const redeemScript = redeemScript$1;
const tapBip32Derivation = tapBip32Derivation$1;
const tapInternalKey = tapInternalKey$1;
const witnessScript = witnessScript$1;
const globals = {
  unsignedTx,
  globalXpub,
  // pass an Array of key bytes that require pubkey beside the key
  checkPubkey: checkPubkey.makeChecker([]),
};
converter.globals = globals;
const inputs = {
  nonWitnessUtxo,
  partialSig,
  sighashType,
  finalScriptSig,
  finalScriptWitness,
  porCommitment,
  witnessUtxo,
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_1$2.InputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1$2.InputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1$2.InputTypes.WITNESS_SCRIPT,
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1$2.InputTypes.PARTIAL_SIG,
    typeFields_1$2.InputTypes.BIP32_DERIVATION,
  ]),
  tapKeySig,
  tapScriptSig,
  tapLeafScript,
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1$2.InputTypes.TAP_BIP32_DERIVATION,
  ),
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1$2.InputTypes.TAP_INTERNAL_KEY,
  ),
  tapMerkleRoot,
};
converter.inputs = inputs;
const outputs = {
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_1$2.OutputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1$2.OutputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1$2.OutputTypes.WITNESS_SCRIPT,
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1$2.OutputTypes.BIP32_DERIVATION,
  ]),
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1$2.OutputTypes.TAP_BIP32_DERIVATION,
  ),
  tapTree,
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1$2.OutputTypes.TAP_INTERNAL_KEY,
  ),
};
converter.outputs = outputs;

Object.defineProperty(fromBuffer, '__esModule', { value: true });
const convert$1 = converter;
const tools_1$1 = tools;
const varuint$2 = varint;
const typeFields_1$1 = typeFields;
function psbtFromBuffer(buffer, txGetter) {
  let offset = 0;
  function varSlice() {
    const keyLen = varuint$2.decode(buffer, offset);
    offset += varuint$2.encodingLength(keyLen);
    const key = buffer.slice(offset, offset + keyLen);
    offset += keyLen;
    return key;
  }
  function readUInt32BE() {
    const num = buffer.readUInt32BE(offset);
    offset += 4;
    return num;
  }
  function readUInt8() {
    const num = buffer.readUInt8(offset);
    offset += 1;
    return num;
  }
  function getKeyValue() {
    const key = varSlice();
    const value = varSlice();
    return {
      key,
      value,
    };
  }
  function checkEndOfKeyValPairs() {
    if (offset >= buffer.length) {
      throw new Error('Format Error: Unexpected End of PSBT');
    }
    const isEnd = buffer.readUInt8(offset) === 0;
    if (isEnd) {
      offset++;
    }
    return isEnd;
  }
  if (readUInt32BE() !== 0x70736274) {
    throw new Error('Format Error: Invalid Magic Number');
  }
  if (readUInt8() !== 0xff) {
    throw new Error(
      'Format Error: Magic Number must be followed by 0xff separator',
    );
  }
  const globalMapKeyVals = [];
  const globalKeyIndex = {};
  while (!checkEndOfKeyValPairs()) {
    const keyVal = getKeyValue();
    const hexKey = keyVal.key.toString('hex');
    if (globalKeyIndex[hexKey]) {
      throw new Error(
        'Format Error: Keys must be unique for global keymap: key ' + hexKey,
      );
    }
    globalKeyIndex[hexKey] = 1;
    globalMapKeyVals.push(keyVal);
  }
  const unsignedTxMaps = globalMapKeyVals.filter(
    keyVal => keyVal.key[0] === typeFields_1$1.GlobalTypes.UNSIGNED_TX,
  );
  if (unsignedTxMaps.length !== 1) {
    throw new Error('Format Error: Only one UNSIGNED_TX allowed');
  }
  const unsignedTx = txGetter(unsignedTxMaps[0].value);
  // Get input and output counts to loop the respective fields
  const { inputCount, outputCount } = unsignedTx.getInputOutputCounts();
  const inputKeyVals = [];
  const outputKeyVals = [];
  // Get input fields
  for (const index of tools_1$1.range(inputCount)) {
    const inputKeyIndex = {};
    const input = [];
    while (!checkEndOfKeyValPairs()) {
      const keyVal = getKeyValue();
      const hexKey = keyVal.key.toString('hex');
      if (inputKeyIndex[hexKey]) {
        throw new Error(
          'Format Error: Keys must be unique for each input: ' +
            'input index ' +
            index +
            ' key ' +
            hexKey,
        );
      }
      inputKeyIndex[hexKey] = 1;
      input.push(keyVal);
    }
    inputKeyVals.push(input);
  }
  for (const index of tools_1$1.range(outputCount)) {
    const outputKeyIndex = {};
    const output = [];
    while (!checkEndOfKeyValPairs()) {
      const keyVal = getKeyValue();
      const hexKey = keyVal.key.toString('hex');
      if (outputKeyIndex[hexKey]) {
        throw new Error(
          'Format Error: Keys must be unique for each output: ' +
            'output index ' +
            index +
            ' key ' +
            hexKey,
        );
      }
      outputKeyIndex[hexKey] = 1;
      output.push(keyVal);
    }
    outputKeyVals.push(output);
  }
  return psbtFromKeyVals(unsignedTx, {
    globalMapKeyVals,
    inputKeyVals,
    outputKeyVals,
  });
}
fromBuffer.psbtFromBuffer = psbtFromBuffer;
function checkKeyBuffer(type, keyBuf, keyNum) {
  if (!keyBuf.equals(buffer.Buffer.from([keyNum]))) {
    throw new Error(
      `Format Error: Invalid ${type} key: ${keyBuf.toString('hex')}`,
    );
  }
}
fromBuffer.checkKeyBuffer = checkKeyBuffer;
function psbtFromKeyVals(
  unsignedTx,
  { globalMapKeyVals, inputKeyVals, outputKeyVals },
) {
  // That was easy :-)
  const globalMap = {
    unsignedTx,
  };
  let txCount = 0;
  for (const keyVal of globalMapKeyVals) {
    // If a globalMap item needs pubkey, uncomment
    // const pubkey = convert.globals.checkPubkey(keyVal);
    switch (keyVal.key[0]) {
      case typeFields_1$1.GlobalTypes.UNSIGNED_TX:
        checkKeyBuffer(
          'global',
          keyVal.key,
          typeFields_1$1.GlobalTypes.UNSIGNED_TX,
        );
        if (txCount > 0) {
          throw new Error('Format Error: GlobalMap has multiple UNSIGNED_TX');
        }
        txCount++;
        break;
      case typeFields_1$1.GlobalTypes.GLOBAL_XPUB:
        if (globalMap.globalXpub === undefined) {
          globalMap.globalXpub = [];
        }
        globalMap.globalXpub.push(convert$1.globals.globalXpub.decode(keyVal));
        break;
      default:
        // This will allow inclusion during serialization.
        if (!globalMap.unknownKeyVals) globalMap.unknownKeyVals = [];
        globalMap.unknownKeyVals.push(keyVal);
    }
  }
  // Get input and output counts to loop the respective fields
  const inputCount = inputKeyVals.length;
  const outputCount = outputKeyVals.length;
  const inputs = [];
  const outputs = [];
  // Get input fields
  for (const index of tools_1$1.range(inputCount)) {
    const input = {};
    for (const keyVal of inputKeyVals[index]) {
      convert$1.inputs.checkPubkey(keyVal);
      switch (keyVal.key[0]) {
        case typeFields_1$1.InputTypes.NON_WITNESS_UTXO:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.NON_WITNESS_UTXO,
          );
          if (input.nonWitnessUtxo !== undefined) {
            throw new Error(
              'Format Error: Input has multiple NON_WITNESS_UTXO',
            );
          }
          input.nonWitnessUtxo = convert$1.inputs.nonWitnessUtxo.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.WITNESS_UTXO:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.WITNESS_UTXO,
          );
          if (input.witnessUtxo !== undefined) {
            throw new Error('Format Error: Input has multiple WITNESS_UTXO');
          }
          input.witnessUtxo = convert$1.inputs.witnessUtxo.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.PARTIAL_SIG:
          if (input.partialSig === undefined) {
            input.partialSig = [];
          }
          input.partialSig.push(convert$1.inputs.partialSig.decode(keyVal));
          break;
        case typeFields_1$1.InputTypes.SIGHASH_TYPE:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.SIGHASH_TYPE,
          );
          if (input.sighashType !== undefined) {
            throw new Error('Format Error: Input has multiple SIGHASH_TYPE');
          }
          input.sighashType = convert$1.inputs.sighashType.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.REDEEM_SCRIPT:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.REDEEM_SCRIPT,
          );
          if (input.redeemScript !== undefined) {
            throw new Error('Format Error: Input has multiple REDEEM_SCRIPT');
          }
          input.redeemScript = convert$1.inputs.redeemScript.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.WITNESS_SCRIPT:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.WITNESS_SCRIPT,
          );
          if (input.witnessScript !== undefined) {
            throw new Error('Format Error: Input has multiple WITNESS_SCRIPT');
          }
          input.witnessScript = convert$1.inputs.witnessScript.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.BIP32_DERIVATION:
          if (input.bip32Derivation === undefined) {
            input.bip32Derivation = [];
          }
          input.bip32Derivation.push(
            convert$1.inputs.bip32Derivation.decode(keyVal),
          );
          break;
        case typeFields_1$1.InputTypes.FINAL_SCRIPTSIG:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.FINAL_SCRIPTSIG,
          );
          input.finalScriptSig = convert$1.inputs.finalScriptSig.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.FINAL_SCRIPTWITNESS:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.FINAL_SCRIPTWITNESS,
          );
          input.finalScriptWitness = convert$1.inputs.finalScriptWitness.decode(
            keyVal,
          );
          break;
        case typeFields_1$1.InputTypes.POR_COMMITMENT:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.POR_COMMITMENT,
          );
          input.porCommitment = convert$1.inputs.porCommitment.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.TAP_KEY_SIG:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.TAP_KEY_SIG,
          );
          input.tapKeySig = convert$1.inputs.tapKeySig.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.TAP_SCRIPT_SIG:
          if (input.tapScriptSig === undefined) {
            input.tapScriptSig = [];
          }
          input.tapScriptSig.push(convert$1.inputs.tapScriptSig.decode(keyVal));
          break;
        case typeFields_1$1.InputTypes.TAP_LEAF_SCRIPT:
          if (input.tapLeafScript === undefined) {
            input.tapLeafScript = [];
          }
          input.tapLeafScript.push(convert$1.inputs.tapLeafScript.decode(keyVal));
          break;
        case typeFields_1$1.InputTypes.TAP_BIP32_DERIVATION:
          if (input.tapBip32Derivation === undefined) {
            input.tapBip32Derivation = [];
          }
          input.tapBip32Derivation.push(
            convert$1.inputs.tapBip32Derivation.decode(keyVal),
          );
          break;
        case typeFields_1$1.InputTypes.TAP_INTERNAL_KEY:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.TAP_INTERNAL_KEY,
          );
          input.tapInternalKey = convert$1.inputs.tapInternalKey.decode(keyVal);
          break;
        case typeFields_1$1.InputTypes.TAP_MERKLE_ROOT:
          checkKeyBuffer(
            'input',
            keyVal.key,
            typeFields_1$1.InputTypes.TAP_MERKLE_ROOT,
          );
          input.tapMerkleRoot = convert$1.inputs.tapMerkleRoot.decode(keyVal);
          break;
        default:
          // This will allow inclusion during serialization.
          if (!input.unknownKeyVals) input.unknownKeyVals = [];
          input.unknownKeyVals.push(keyVal);
      }
    }
    inputs.push(input);
  }
  for (const index of tools_1$1.range(outputCount)) {
    const output = {};
    for (const keyVal of outputKeyVals[index]) {
      convert$1.outputs.checkPubkey(keyVal);
      switch (keyVal.key[0]) {
        case typeFields_1$1.OutputTypes.REDEEM_SCRIPT:
          checkKeyBuffer(
            'output',
            keyVal.key,
            typeFields_1$1.OutputTypes.REDEEM_SCRIPT,
          );
          if (output.redeemScript !== undefined) {
            throw new Error('Format Error: Output has multiple REDEEM_SCRIPT');
          }
          output.redeemScript = convert$1.outputs.redeemScript.decode(keyVal);
          break;
        case typeFields_1$1.OutputTypes.WITNESS_SCRIPT:
          checkKeyBuffer(
            'output',
            keyVal.key,
            typeFields_1$1.OutputTypes.WITNESS_SCRIPT,
          );
          if (output.witnessScript !== undefined) {
            throw new Error('Format Error: Output has multiple WITNESS_SCRIPT');
          }
          output.witnessScript = convert$1.outputs.witnessScript.decode(keyVal);
          break;
        case typeFields_1$1.OutputTypes.BIP32_DERIVATION:
          if (output.bip32Derivation === undefined) {
            output.bip32Derivation = [];
          }
          output.bip32Derivation.push(
            convert$1.outputs.bip32Derivation.decode(keyVal),
          );
          break;
        case typeFields_1$1.OutputTypes.TAP_INTERNAL_KEY:
          checkKeyBuffer(
            'output',
            keyVal.key,
            typeFields_1$1.OutputTypes.TAP_INTERNAL_KEY,
          );
          output.tapInternalKey = convert$1.outputs.tapInternalKey.decode(keyVal);
          break;
        case typeFields_1$1.OutputTypes.TAP_TREE:
          checkKeyBuffer(
            'output',
            keyVal.key,
            typeFields_1$1.OutputTypes.TAP_TREE,
          );
          output.tapTree = convert$1.outputs.tapTree.decode(keyVal);
          break;
        case typeFields_1$1.OutputTypes.TAP_BIP32_DERIVATION:
          if (output.tapBip32Derivation === undefined) {
            output.tapBip32Derivation = [];
          }
          output.tapBip32Derivation.push(
            convert$1.outputs.tapBip32Derivation.decode(keyVal),
          );
          break;
        default:
          if (!output.unknownKeyVals) output.unknownKeyVals = [];
          output.unknownKeyVals.push(keyVal);
      }
    }
    outputs.push(output);
  }
  return { globalMap, inputs, outputs };
}
fromBuffer.psbtFromKeyVals = psbtFromKeyVals;

var toBuffer = {};

Object.defineProperty(toBuffer, '__esModule', { value: true });
const convert = converter;
const tools_1 = tools;
function psbtToBuffer({ globalMap, inputs, outputs }) {
  const { globalKeyVals, inputKeyVals, outputKeyVals } = psbtToKeyVals({
    globalMap,
    inputs,
    outputs,
  });
  const globalBuffer = tools_1.keyValsToBuffer(globalKeyVals);
  const keyValsOrEmptyToBuffer = keyVals =>
    keyVals.length === 0
      ? [buffer.Buffer.from([0])]
      : keyVals.map(tools_1.keyValsToBuffer);
  const inputBuffers = keyValsOrEmptyToBuffer(inputKeyVals);
  const outputBuffers = keyValsOrEmptyToBuffer(outputKeyVals);
  const header = buffer.Buffer.allocUnsafe(5);
  header.writeUIntBE(0x70736274ff, 0, 5);
  return buffer.Buffer.concat(
    [header, globalBuffer].concat(inputBuffers, outputBuffers),
  );
}
toBuffer.psbtToBuffer = psbtToBuffer;
const sortKeyVals = (a, b) => {
  return a.key.compare(b.key);
};
function keyValsFromMap(keyValMap, converterFactory) {
  const keyHexSet = new Set();
  const keyVals = Object.entries(keyValMap).reduce((result, [key, value]) => {
    if (key === 'unknownKeyVals') return result;
    // We are checking for undefined anyways. So ignore TS error
    // @ts-ignore
    const converter = converterFactory[key];
    if (converter === undefined) return result;
    const encodedKeyVals = (Array.isArray(value) ? value : [value]).map(
      converter.encode,
    );
    const keyHexes = encodedKeyVals.map(kv => kv.key.toString('hex'));
    keyHexes.forEach(hex => {
      if (keyHexSet.has(hex))
        throw new Error('Serialize Error: Duplicate key: ' + hex);
      keyHexSet.add(hex);
    });
    return result.concat(encodedKeyVals);
  }, []);
  // Get other keyVals that have not yet been gotten
  const otherKeyVals = keyValMap.unknownKeyVals
    ? keyValMap.unknownKeyVals.filter(keyVal => {
        return !keyHexSet.has(keyVal.key.toString('hex'));
      })
    : [];
  return keyVals.concat(otherKeyVals).sort(sortKeyVals);
}
function psbtToKeyVals({ globalMap, inputs, outputs }) {
  // First parse the global keyVals
  // Get any extra keyvals to pass along
  return {
    globalKeyVals: keyValsFromMap(globalMap, convert.globals),
    inputKeyVals: inputs.map(i => keyValsFromMap(i, convert.inputs)),
    outputKeyVals: outputs.map(o => keyValsFromMap(o, convert.outputs)),
  };
}
toBuffer.psbtToKeyVals = psbtToKeyVals;

(function (exports) {
	function __export(m) {
	  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, '__esModule', { value: true });
	__export(fromBuffer);
	__export(toBuffer);
} (parser));

Object.defineProperty(combiner, '__esModule', { value: true });
const parser_1$1 = parser;
function combine(psbts) {
  const self = psbts[0];
  const selfKeyVals = parser_1$1.psbtToKeyVals(self);
  const others = psbts.slice(1);
  if (others.length === 0) throw new Error('Combine: Nothing to combine');
  const selfTx = getTx(self);
  if (selfTx === undefined) {
    throw new Error('Combine: Self missing transaction');
  }
  const selfGlobalSet = getKeySet(selfKeyVals.globalKeyVals);
  const selfInputSets = selfKeyVals.inputKeyVals.map(getKeySet);
  const selfOutputSets = selfKeyVals.outputKeyVals.map(getKeySet);
  for (const other of others) {
    const otherTx = getTx(other);
    if (
      otherTx === undefined ||
      !otherTx.toBuffer().equals(selfTx.toBuffer())
    ) {
      throw new Error(
        'Combine: One of the Psbts does not have the same transaction.',
      );
    }
    const otherKeyVals = parser_1$1.psbtToKeyVals(other);
    const otherGlobalSet = getKeySet(otherKeyVals.globalKeyVals);
    otherGlobalSet.forEach(
      keyPusher(
        selfGlobalSet,
        selfKeyVals.globalKeyVals,
        otherKeyVals.globalKeyVals,
      ),
    );
    const otherInputSets = otherKeyVals.inputKeyVals.map(getKeySet);
    otherInputSets.forEach((inputSet, idx) =>
      inputSet.forEach(
        keyPusher(
          selfInputSets[idx],
          selfKeyVals.inputKeyVals[idx],
          otherKeyVals.inputKeyVals[idx],
        ),
      ),
    );
    const otherOutputSets = otherKeyVals.outputKeyVals.map(getKeySet);
    otherOutputSets.forEach((outputSet, idx) =>
      outputSet.forEach(
        keyPusher(
          selfOutputSets[idx],
          selfKeyVals.outputKeyVals[idx],
          otherKeyVals.outputKeyVals[idx],
        ),
      ),
    );
  }
  return parser_1$1.psbtFromKeyVals(selfTx, {
    globalMapKeyVals: selfKeyVals.globalKeyVals,
    inputKeyVals: selfKeyVals.inputKeyVals,
    outputKeyVals: selfKeyVals.outputKeyVals,
  });
}
combiner.combine = combine;
function keyPusher(selfSet, selfKeyVals, otherKeyVals) {
  return key => {
    if (selfSet.has(key)) return;
    const newKv = otherKeyVals.filter(kv => kv.key.toString('hex') === key)[0];
    selfKeyVals.push(newKv);
    selfSet.add(key);
  };
}
function getTx(psbt) {
  return psbt.globalMap.unsignedTx;
}
function getKeySet(keyVals) {
  const set = new Set();
  keyVals.forEach(keyVal => {
    const hex = keyVal.key.toString('hex');
    if (set.has(hex))
      throw new Error('Combine: KeyValue Map keys should be unique');
    set.add(hex);
  });
  return set;
}

var utils = {};

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	const converter$1 = converter;
	function checkForInput(inputs, inputIndex) {
	  const input = inputs[inputIndex];
	  if (input === undefined) throw new Error(`No input #${inputIndex}`);
	  return input;
	}
	exports.checkForInput = checkForInput;
	function checkForOutput(outputs, outputIndex) {
	  const output = outputs[outputIndex];
	  if (output === undefined) throw new Error(`No output #${outputIndex}`);
	  return output;
	}
	exports.checkForOutput = checkForOutput;
	function checkHasKey(checkKeyVal, keyVals, enumLength) {
	  if (checkKeyVal.key[0] < enumLength) {
	    throw new Error(
	      `Use the method for your specific key instead of addUnknownKeyVal*`,
	    );
	  }
	  if (
	    keyVals &&
	    keyVals.filter(kv => kv.key.equals(checkKeyVal.key)).length !== 0
	  ) {
	    throw new Error(`Duplicate Key: ${checkKeyVal.key.toString('hex')}`);
	  }
	}
	exports.checkHasKey = checkHasKey;
	function getEnumLength(myenum) {
	  let count = 0;
	  Object.keys(myenum).forEach(val => {
	    if (Number(isNaN(Number(val)))) {
	      count++;
	    }
	  });
	  return count;
	}
	exports.getEnumLength = getEnumLength;
	function inputCheckUncleanFinalized(inputIndex, input) {
	  let result = false;
	  if (input.nonWitnessUtxo || input.witnessUtxo) {
	    const needScriptSig = !!input.redeemScript;
	    const needWitnessScript = !!input.witnessScript;
	    const scriptSigOK = !needScriptSig || !!input.finalScriptSig;
	    const witnessScriptOK = !needWitnessScript || !!input.finalScriptWitness;
	    const hasOneFinal = !!input.finalScriptSig || !!input.finalScriptWitness;
	    result = scriptSigOK && witnessScriptOK && hasOneFinal;
	  }
	  if (result === false) {
	    throw new Error(
	      `Input #${inputIndex} has too much or too little data to clean`,
	    );
	  }
	}
	exports.inputCheckUncleanFinalized = inputCheckUncleanFinalized;
	function throwForUpdateMaker(typeName, name, expected, data) {
	  throw new Error(
	    `Data for ${typeName} key ${name} is incorrect: Expected ` +
	      `${expected} and got ${JSON.stringify(data)}`,
	  );
	}
	function updateMaker(typeName) {
	  return (updateData, mainData) => {
	    for (const name of Object.keys(updateData)) {
	      // @ts-ignore
	      const data = updateData[name];
	      // @ts-ignore
	      const { canAdd, canAddToArray, check, expected } =
	        // @ts-ignore
	        converter$1[typeName + 's'][name] || {};
	      const isArray = !!canAddToArray;
	      // If unknown data. ignore and do not add
	      if (check) {
	        if (isArray) {
	          if (
	            !Array.isArray(data) ||
	            // @ts-ignore
	            (mainData[name] && !Array.isArray(mainData[name]))
	          ) {
	            throw new Error(`Key type ${name} must be an array`);
	          }
	          if (!data.every(check)) {
	            throwForUpdateMaker(typeName, name, expected, data);
	          }
	          // @ts-ignore
	          const arr = mainData[name] || [];
	          const dupeCheckSet = new Set();
	          if (!data.every(v => canAddToArray(arr, v, dupeCheckSet))) {
	            throw new Error('Can not add duplicate data to array');
	          }
	          // @ts-ignore
	          mainData[name] = arr.concat(data);
	        } else {
	          if (!check(data)) {
	            throwForUpdateMaker(typeName, name, expected, data);
	          }
	          if (!canAdd(mainData, data)) {
	            throw new Error(`Can not add duplicate data to ${typeName}`);
	          }
	          // @ts-ignore
	          mainData[name] = data;
	        }
	      }
	    }
	  };
	}
	exports.updateGlobal = updateMaker('global');
	exports.updateInput = updateMaker('input');
	exports.updateOutput = updateMaker('output');
	function addInputAttributes(inputs, data) {
	  const index = inputs.length - 1;
	  const input = checkForInput(inputs, index);
	  exports.updateInput(data, input);
	}
	exports.addInputAttributes = addInputAttributes;
	function addOutputAttributes(outputs, data) {
	  const index = outputs.length - 1;
	  const output = checkForOutput(outputs, index);
	  exports.updateOutput(data, output);
	}
	exports.addOutputAttributes = addOutputAttributes;
	function defaultVersionSetter(version, txBuf) {
	  if (!buffer.Buffer.isBuffer(txBuf) || txBuf.length < 4) {
	    throw new Error('Set Version: Invalid Transaction');
	  }
	  txBuf.writeUInt32LE(version, 0);
	  return txBuf;
	}
	exports.defaultVersionSetter = defaultVersionSetter;
	function defaultLocktimeSetter(locktime, txBuf) {
	  if (!buffer.Buffer.isBuffer(txBuf) || txBuf.length < 4) {
	    throw new Error('Set Locktime: Invalid Transaction');
	  }
	  txBuf.writeUInt32LE(locktime, txBuf.length - 4);
	  return txBuf;
	}
	exports.defaultLocktimeSetter = defaultLocktimeSetter;
} (utils));

Object.defineProperty(psbt, '__esModule', { value: true });
const combiner_1 = combiner;
const parser_1 = parser;
const typeFields_1 = typeFields;
const utils_1$1 = utils;
let Psbt$1 = class Psbt {
  constructor(tx) {
    this.inputs = [];
    this.outputs = [];
    this.globalMap = {
      unsignedTx: tx,
    };
  }
  static fromBase64(data, txFromBuffer) {
    const buffer$1 = buffer.Buffer.from(data, 'base64');
    return this.fromBuffer(buffer$1, txFromBuffer);
  }
  static fromHex(data, txFromBuffer) {
    const buffer$1 = buffer.Buffer.from(data, 'hex');
    return this.fromBuffer(buffer$1, txFromBuffer);
  }
  static fromBuffer(buffer, txFromBuffer) {
    const results = parser_1.psbtFromBuffer(buffer, txFromBuffer);
    const psbt = new this(results.globalMap.unsignedTx);
    Object.assign(psbt, results);
    return psbt;
  }
  toBase64() {
    const buffer = this.toBuffer();
    return buffer.toString('base64');
  }
  toHex() {
    const buffer = this.toBuffer();
    return buffer.toString('hex');
  }
  toBuffer() {
    return parser_1.psbtToBuffer(this);
  }
  updateGlobal(updateData) {
    utils_1$1.updateGlobal(updateData, this.globalMap);
    return this;
  }
  updateInput(inputIndex, updateData) {
    const input = utils_1$1.checkForInput(this.inputs, inputIndex);
    utils_1$1.updateInput(updateData, input);
    return this;
  }
  updateOutput(outputIndex, updateData) {
    const output = utils_1$1.checkForOutput(this.outputs, outputIndex);
    utils_1$1.updateOutput(updateData, output);
    return this;
  }
  addUnknownKeyValToGlobal(keyVal) {
    utils_1$1.checkHasKey(
      keyVal,
      this.globalMap.unknownKeyVals,
      utils_1$1.getEnumLength(typeFields_1.GlobalTypes),
    );
    if (!this.globalMap.unknownKeyVals) this.globalMap.unknownKeyVals = [];
    this.globalMap.unknownKeyVals.push(keyVal);
    return this;
  }
  addUnknownKeyValToInput(inputIndex, keyVal) {
    const input = utils_1$1.checkForInput(this.inputs, inputIndex);
    utils_1$1.checkHasKey(
      keyVal,
      input.unknownKeyVals,
      utils_1$1.getEnumLength(typeFields_1.InputTypes),
    );
    if (!input.unknownKeyVals) input.unknownKeyVals = [];
    input.unknownKeyVals.push(keyVal);
    return this;
  }
  addUnknownKeyValToOutput(outputIndex, keyVal) {
    const output = utils_1$1.checkForOutput(this.outputs, outputIndex);
    utils_1$1.checkHasKey(
      keyVal,
      output.unknownKeyVals,
      utils_1$1.getEnumLength(typeFields_1.OutputTypes),
    );
    if (!output.unknownKeyVals) output.unknownKeyVals = [];
    output.unknownKeyVals.push(keyVal);
    return this;
  }
  addInput(inputData) {
    this.globalMap.unsignedTx.addInput(inputData);
    this.inputs.push({
      unknownKeyVals: [],
    });
    const addKeyVals = inputData.unknownKeyVals || [];
    const inputIndex = this.inputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('unknownKeyVals must be an Array');
    }
    addKeyVals.forEach(keyVal =>
      this.addUnknownKeyValToInput(inputIndex, keyVal),
    );
    utils_1$1.addInputAttributes(this.inputs, inputData);
    return this;
  }
  addOutput(outputData) {
    this.globalMap.unsignedTx.addOutput(outputData);
    this.outputs.push({
      unknownKeyVals: [],
    });
    const addKeyVals = outputData.unknownKeyVals || [];
    const outputIndex = this.outputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('unknownKeyVals must be an Array');
    }
    addKeyVals.forEach(keyVal =>
      this.addUnknownKeyValToInput(outputIndex, keyVal),
    );
    utils_1$1.addOutputAttributes(this.outputs, outputData);
    return this;
  }
  clearFinalizedInput(inputIndex) {
    const input = utils_1$1.checkForInput(this.inputs, inputIndex);
    utils_1$1.inputCheckUncleanFinalized(inputIndex, input);
    for (const key of Object.keys(input)) {
      if (
        ![
          'witnessUtxo',
          'nonWitnessUtxo',
          'finalScriptSig',
          'finalScriptWitness',
          'unknownKeyVals',
        ].includes(key)
      ) {
        // @ts-ignore
        delete input[key];
      }
    }
    return this;
  }
  combine(...those) {
    // Combine this with those.
    // Return self for chaining.
    const result = combiner_1.combine([this].concat(those));
    Object.assign(this, result);
    return this;
  }
  getTransaction() {
    return this.globalMap.unsignedTx.toBuffer();
  }
};
psbt.Psbt = Psbt$1;

var bip371 = {};

var psbtutils = {};

Object.defineProperty(psbtutils, '__esModule', { value: true });
psbtutils.signatureBlocksAction =
  psbtutils.checkInputForSig =
  psbtutils.pubkeyInScript =
  psbtutils.pubkeyPositionInScript =
  psbtutils.witnessStackToScriptWitness =
  psbtutils.isP2TR =
  psbtutils.isP2SHScript =
  psbtutils.isP2WSHScript =
  psbtutils.isP2WPKH =
  psbtutils.isP2PKH =
  psbtutils.isP2PK =
  psbtutils.isP2MS =
    void 0;
const varuint$1 = varint;
const bscript$1 = script;
const transaction_1$2 = transaction;
const crypto_1 = crypto;
const payments$1 = payments$3;
function isPaymentFactory(payment) {
  return script => {
    try {
      payment({ output: script });
      return true;
    } catch (err) {
      return false;
    }
  };
}
psbtutils.isP2MS = isPaymentFactory(payments$1.p2ms);
psbtutils.isP2PK = isPaymentFactory(payments$1.p2pk);
psbtutils.isP2PKH = isPaymentFactory(payments$1.p2pkh);
psbtutils.isP2WPKH = isPaymentFactory(payments$1.p2wpkh);
psbtutils.isP2WSHScript = isPaymentFactory(payments$1.p2wsh);
psbtutils.isP2SHScript = isPaymentFactory(payments$1.p2sh);
psbtutils.isP2TR = isPaymentFactory(payments$1.p2tr);
function witnessStackToScriptWitness(witness) {
  let buffer$1 = buffer.Buffer.allocUnsafe(0);
  function writeSlice(slice) {
    buffer$1 = buffer.Buffer.concat([buffer$1, buffer.Buffer.from(slice)]);
  }
  function writeVarInt(i) {
    const currentLen = buffer$1.length;
    const varintLen = varuint$1.encodingLength(i);
    buffer$1 = buffer.Buffer.concat([buffer$1, buffer.Buffer.allocUnsafe(varintLen)]);
    varuint$1.encode(i, buffer$1, currentLen);
  }
  function writeVarSlice(slice) {
    writeVarInt(slice.length);
    writeSlice(slice);
  }
  function writeVector(vector) {
    writeVarInt(vector.length);
    vector.forEach(writeVarSlice);
  }
  writeVector(witness);
  return buffer$1;
}
psbtutils.witnessStackToScriptWitness = witnessStackToScriptWitness;
function pubkeyPositionInScript(pubkey, script) {
  const pubkeyHash = (0, crypto_1.hash160)(pubkey);
  const pubkeyXOnly = pubkey.slice(1, 33); // slice before calling?
  const decompiled = bscript$1.decompile(script);
  if (decompiled === null) throw new Error('Unknown script error');
  return decompiled.findIndex(element => {
    if (typeof element === 'number') return false;
    return (
      element.equals(pubkey) ||
      element.equals(pubkeyHash) ||
      element.equals(pubkeyXOnly)
    );
  });
}
psbtutils.pubkeyPositionInScript = pubkeyPositionInScript;
function pubkeyInScript(pubkey, script) {
  return pubkeyPositionInScript(pubkey, script) !== -1;
}
psbtutils.pubkeyInScript = pubkeyInScript;
function checkInputForSig(input, action) {
  const pSigs = extractPartialSigs(input);
  return pSigs.some(pSig =>
    signatureBlocksAction(pSig, bscript$1.signature.decode, action),
  );
}
psbtutils.checkInputForSig = checkInputForSig;
function signatureBlocksAction(signature, signatureDecodeFn, action) {
  const { hashType } = signatureDecodeFn(signature);
  const whitelist = [];
  const isAnyoneCanPay =
    hashType & transaction_1$2.Transaction.SIGHASH_ANYONECANPAY;
  if (isAnyoneCanPay) whitelist.push('addInput');
  const hashMod = hashType & 0x1f;
  switch (hashMod) {
    case transaction_1$2.Transaction.SIGHASH_ALL:
      break;
    case transaction_1$2.Transaction.SIGHASH_SINGLE:
    case transaction_1$2.Transaction.SIGHASH_NONE:
      whitelist.push('addOutput');
      whitelist.push('setInputSequence');
      break;
  }
  if (whitelist.indexOf(action) === -1) {
    return true;
  }
  return false;
}
psbtutils.signatureBlocksAction = signatureBlocksAction;
function extractPartialSigs(input) {
  let pSigs = [];
  if ((input.partialSig || []).length === 0) {
    if (!input.finalScriptSig && !input.finalScriptWitness) return [];
    pSigs = getPsigsFromInputFinalScripts(input);
  } else {
    pSigs = input.partialSig;
  }
  return pSigs.map(p => p.signature);
}
function getPsigsFromInputFinalScripts(input) {
  const scriptItems = !input.finalScriptSig
    ? []
    : bscript$1.decompile(input.finalScriptSig) || [];
  const witnessItems = !input.finalScriptWitness
    ? []
    : bscript$1.decompile(input.finalScriptWitness) || [];
  return scriptItems
    .concat(witnessItems)
    .filter(item => {
      return buffer.Buffer.isBuffer(item) && bscript$1.isCanonicalScriptSignature(item);
    })
    .map(sig => ({ signature: sig }));
}

Object.defineProperty(bip371, '__esModule', { value: true });
bip371.checkTaprootInputForSigs =
  bip371.tapTreeFromList =
  bip371.tapTreeToList =
  bip371.tweakInternalPubKey =
  bip371.checkTaprootOutputFields =
  bip371.checkTaprootInputFields =
  bip371.isTaprootOutput =
  bip371.isTaprootInput =
  bip371.serializeTaprootSignature =
  bip371.tapScriptFinalizer =
  bip371.toXOnly =
    void 0;
const types_1 = types$5;
const transaction_1$1 = transaction;
const psbtutils_1$1 = psbtutils;
const bip341_1$1 = bip341;
const payments_1 = payments$3;
const psbtutils_2 = psbtutils;
const toXOnly = pubKey => (pubKey.length === 32 ? pubKey : pubKey.slice(1, 33));
bip371.toXOnly = toXOnly;
/**
 * Default tapscript finalizer. It searches for the `tapLeafHashToFinalize` if provided.
 * Otherwise it will search for the tapleaf that has at least one signature and has the shortest path.
 * @param inputIndex the position of the PSBT input.
 * @param input the PSBT input.
 * @param tapLeafHashToFinalize optional, if provided the finalizer will search for a tapleaf that has this hash
 *                              and will try to build the finalScriptWitness.
 * @returns the finalScriptWitness or throws an exception if no tapleaf found.
 */
function tapScriptFinalizer(inputIndex, input, tapLeafHashToFinalize) {
  const tapLeaf = findTapLeafToFinalize(
    input,
    inputIndex,
    tapLeafHashToFinalize,
  );
  try {
    const sigs = sortSignatures(input, tapLeaf);
    const witness = sigs.concat(tapLeaf.script).concat(tapLeaf.controlBlock);
    return {
      finalScriptWitness: (0, psbtutils_1$1.witnessStackToScriptWitness)(witness),
    };
  } catch (err) {
    throw new Error(`Can not finalize taproot input #${inputIndex}: ${err}`);
  }
}
bip371.tapScriptFinalizer = tapScriptFinalizer;
function serializeTaprootSignature(sig, sighashType) {
  const sighashTypeByte = sighashType
    ? buffer.Buffer.from([sighashType])
    : buffer.Buffer.from([]);
  return buffer.Buffer.concat([sig, sighashTypeByte]);
}
bip371.serializeTaprootSignature = serializeTaprootSignature;
function isTaprootInput(input) {
  return (
    input &&
    !!(
      input.tapInternalKey ||
      input.tapMerkleRoot ||
      (input.tapLeafScript && input.tapLeafScript.length) ||
      (input.tapBip32Derivation && input.tapBip32Derivation.length) ||
      (input.witnessUtxo && (0, psbtutils_1$1.isP2TR)(input.witnessUtxo.script))
    )
  );
}
bip371.isTaprootInput = isTaprootInput;
function isTaprootOutput(output, script) {
  return (
    output &&
    !!(
      output.tapInternalKey ||
      output.tapTree ||
      (output.tapBip32Derivation && output.tapBip32Derivation.length) ||
      (script && (0, psbtutils_1$1.isP2TR)(script))
    )
  );
}
bip371.isTaprootOutput = isTaprootOutput;
function checkTaprootInputFields(inputData, newInputData, action) {
  checkMixedTaprootAndNonTaprootInputFields(inputData, newInputData, action);
  checkIfTapLeafInTree(inputData, newInputData, action);
}
bip371.checkTaprootInputFields = checkTaprootInputFields;
function checkTaprootOutputFields(outputData, newOutputData, action) {
  checkMixedTaprootAndNonTaprootOutputFields(outputData, newOutputData, action);
  checkTaprootScriptPubkey(outputData, newOutputData);
}
bip371.checkTaprootOutputFields = checkTaprootOutputFields;
function checkTaprootScriptPubkey(outputData, newOutputData) {
  if (!newOutputData.tapTree && !newOutputData.tapInternalKey) return;
  const tapInternalKey =
    newOutputData.tapInternalKey || outputData.tapInternalKey;
  const tapTree = newOutputData.tapTree || outputData.tapTree;
  if (tapInternalKey) {
    const { script: scriptPubkey } = outputData;
    const script = getTaprootScripPubkey(tapInternalKey, tapTree);
    if (scriptPubkey && !scriptPubkey.equals(script))
      throw new Error('Error adding output. Script or address missmatch.');
  }
}
function getTaprootScripPubkey(tapInternalKey, tapTree) {
  const scriptTree = tapTree && tapTreeFromList(tapTree.leaves);
  const { output } = (0, payments_1.p2tr)({
    internalPubkey: tapInternalKey,
    scriptTree,
  });
  return output;
}
function tweakInternalPubKey(inputIndex, input) {
  const tapInternalKey = input.tapInternalKey;
  const outputKey =
    tapInternalKey &&
    (0, bip341_1$1.tweakKey)(tapInternalKey, input.tapMerkleRoot);
  if (!outputKey)
    throw new Error(
      `Cannot tweak tap internal key for input #${inputIndex}. Public key: ${
        tapInternalKey && tapInternalKey.toString('hex')
      }`,
    );
  return outputKey.x;
}
bip371.tweakInternalPubKey = tweakInternalPubKey;
/**
 * Convert a binary tree to a BIP371 type list. Each element of the list is (according to BIP371):
 * One or more tuples representing the depth, leaf version, and script for a leaf in the Taproot tree,
 * allowing the entire tree to be reconstructed. The tuples must be in depth first search order so that
 * the tree is correctly reconstructed.
 * @param tree the binary tap tree
 * @returns a list of BIP 371 tapleaves
 */
function tapTreeToList(tree) {
  if (!(0, types_1.isTaptree)(tree))
    throw new Error(
      'Cannot convert taptree to tapleaf list. Expecting a tapree structure.',
    );
  return _tapTreeToList(tree);
}
bip371.tapTreeToList = tapTreeToList;
/**
 * Convert a BIP371 TapLeaf list to a TapTree (binary).
 * @param leaves a list of tapleaves where each element of the list is (according to BIP371):
 * One or more tuples representing the depth, leaf version, and script for a leaf in the Taproot tree,
 * allowing the entire tree to be reconstructed. The tuples must be in depth first search order so that
 * the tree is correctly reconstructed.
 * @returns the corresponding taptree, or throws an exception if the tree cannot be reconstructed
 */
function tapTreeFromList(leaves = []) {
  if (leaves.length === 1 && leaves[0].depth === 0)
    return {
      output: leaves[0].script,
      version: leaves[0].leafVersion,
    };
  return instertLeavesInTree(leaves);
}
bip371.tapTreeFromList = tapTreeFromList;
function checkTaprootInputForSigs(input, action) {
  const sigs = extractTaprootSigs(input);
  return sigs.some(sig =>
    (0, psbtutils_2.signatureBlocksAction)(sig, decodeSchnorrSignature, action),
  );
}
bip371.checkTaprootInputForSigs = checkTaprootInputForSigs;
function decodeSchnorrSignature(signature) {
  return {
    signature: signature.slice(0, 64),
    hashType:
      signature.slice(64)[0] || transaction_1$1.Transaction.SIGHASH_DEFAULT,
  };
}
function extractTaprootSigs(input) {
  const sigs = [];
  if (input.tapKeySig) sigs.push(input.tapKeySig);
  if (input.tapScriptSig)
    sigs.push(...input.tapScriptSig.map(s => s.signature));
  if (!sigs.length) {
    const finalTapKeySig = getTapKeySigFromWithness(input.finalScriptWitness);
    if (finalTapKeySig) sigs.push(finalTapKeySig);
  }
  return sigs;
}
function getTapKeySigFromWithness(finalScriptWitness) {
  if (!finalScriptWitness) return;
  const witness = finalScriptWitness.slice(2);
  // todo: add schnorr signature validation
  if (witness.length === 64 || witness.length === 65) return witness;
}
function _tapTreeToList(tree, leaves = [], depth = 0) {
  if (depth > bip341_1$1.MAX_TAPTREE_DEPTH)
    throw new Error('Max taptree depth exceeded.');
  if (!tree) return [];
  if ((0, types_1.isTapleaf)(tree)) {
    leaves.push({
      depth,
      leafVersion: tree.version || bip341_1$1.LEAF_VERSION_TAPSCRIPT,
      script: tree.output,
    });
    return leaves;
  }
  if (tree[0]) _tapTreeToList(tree[0], leaves, depth + 1);
  if (tree[1]) _tapTreeToList(tree[1], leaves, depth + 1);
  return leaves;
}
function instertLeavesInTree(leaves) {
  let tree;
  for (const leaf of leaves) {
    tree = instertLeafInTree(leaf, tree);
    if (!tree) throw new Error(`No room left to insert tapleaf in tree`);
  }
  return tree;
}
function instertLeafInTree(leaf, tree, depth = 0) {
  if (depth > bip341_1$1.MAX_TAPTREE_DEPTH)
    throw new Error('Max taptree depth exceeded.');
  if (leaf.depth === depth) {
    if (!tree)
      return {
        output: leaf.script,
        version: leaf.leafVersion,
      };
    return;
  }
  if ((0, types_1.isTapleaf)(tree)) return;
  const leftSide = instertLeafInTree(leaf, tree && tree[0], depth + 1);
  if (leftSide) return [leftSide, tree && tree[1]];
  const rightSide = instertLeafInTree(leaf, tree && tree[1], depth + 1);
  if (rightSide) return [tree && tree[0], rightSide];
}
function checkMixedTaprootAndNonTaprootInputFields(
  inputData,
  newInputData,
  action,
) {
  const isBadTaprootUpdate =
    isTaprootInput(inputData) && hasNonTaprootFields(newInputData);
  const isBadNonTaprootUpdate =
    hasNonTaprootFields(inputData) && isTaprootInput(newInputData);
  const hasMixedFields =
    inputData === newInputData &&
    isTaprootInput(newInputData) &&
    hasNonTaprootFields(newInputData); // todo: bad? use !===
  if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
    throw new Error(
      `Invalid arguments for Psbt.${action}. ` +
        `Cannot use both taproot and non-taproot fields.`,
    );
}
function checkMixedTaprootAndNonTaprootOutputFields(
  inputData,
  newInputData,
  action,
) {
  const isBadTaprootUpdate =
    isTaprootOutput(inputData) && hasNonTaprootFields(newInputData);
  const isBadNonTaprootUpdate =
    hasNonTaprootFields(inputData) && isTaprootOutput(newInputData);
  const hasMixedFields =
    inputData === newInputData &&
    isTaprootOutput(newInputData) &&
    hasNonTaprootFields(newInputData);
  if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
    throw new Error(
      `Invalid arguments for Psbt.${action}. ` +
        `Cannot use both taproot and non-taproot fields.`,
    );
}
function checkIfTapLeafInTree(inputData, newInputData, action) {
  if (newInputData.tapMerkleRoot) {
    const newLeafsInTree = (newInputData.tapLeafScript || []).every(l =>
      isTapLeafInTree(l, newInputData.tapMerkleRoot),
    );
    const oldLeafsInTree = (inputData.tapLeafScript || []).every(l =>
      isTapLeafInTree(l, newInputData.tapMerkleRoot),
    );
    if (!newLeafsInTree || !oldLeafsInTree)
      throw new Error(
        `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`,
      );
  } else if (inputData.tapMerkleRoot) {
    const newLeafsInTree = (newInputData.tapLeafScript || []).every(l =>
      isTapLeafInTree(l, inputData.tapMerkleRoot),
    );
    if (!newLeafsInTree)
      throw new Error(
        `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`,
      );
  }
}
function isTapLeafInTree(tapLeaf, merkleRoot) {
  if (!merkleRoot) return true;
  const leafHash = (0, bip341_1$1.tapleafHash)({
    output: tapLeaf.script,
    version: tapLeaf.leafVersion,
  });
  const rootHash = (0, bip341_1$1.rootHashFromPath)(
    tapLeaf.controlBlock,
    leafHash,
  );
  return rootHash.equals(merkleRoot);
}
function sortSignatures(input, tapLeaf) {
  const leafHash = (0, bip341_1$1.tapleafHash)({
    output: tapLeaf.script,
    version: tapLeaf.leafVersion,
  });
  return (input.tapScriptSig || [])
    .filter(tss => tss.leafHash.equals(leafHash))
    .map(tss => addPubkeyPositionInScript(tapLeaf.script, tss))
    .sort((t1, t2) => t2.positionInScript - t1.positionInScript)
    .map(t => t.signature);
}
function addPubkeyPositionInScript(script, tss) {
  return Object.assign(
    {
      positionInScript: (0, psbtutils_1$1.pubkeyPositionInScript)(
        tss.pubkey,
        script,
      ),
    },
    tss,
  );
}
/**
 * Find tapleaf by hash, or get the signed tapleaf with the shortest path.
 */
function findTapLeafToFinalize(input, inputIndex, leafHashToFinalize) {
  if (!input.tapScriptSig || !input.tapScriptSig.length)
    throw new Error(
      `Can not finalize taproot input #${inputIndex}. No tapleaf script signature provided.`,
    );
  const tapLeaf = (input.tapLeafScript || [])
    .sort((a, b) => a.controlBlock.length - b.controlBlock.length)
    .find(leaf =>
      canFinalizeLeaf(leaf, input.tapScriptSig, leafHashToFinalize),
    );
  if (!tapLeaf)
    throw new Error(
      `Can not finalize taproot input #${inputIndex}. Signature for tapleaf script not found.`,
    );
  return tapLeaf;
}
function canFinalizeLeaf(leaf, tapScriptSig, hash) {
  const leafHash = (0, bip341_1$1.tapleafHash)({
    output: leaf.script,
    version: leaf.leafVersion,
  });
  const whiteListedHash = !hash || hash.equals(leafHash);
  return (
    whiteListedHash &&
    tapScriptSig.find(tss => tss.leafHash.equals(leafHash)) !== undefined
  );
}
function hasNonTaprootFields(io) {
  return (
    io &&
    !!(
      io.redeemScript ||
      io.witnessScript ||
      (io.bip32Derivation && io.bip32Derivation.length)
    )
  );
}

Object.defineProperty(psbt$1, '__esModule', { value: true });
psbt$1.Psbt = void 0;
const bip174_1 = psbt;
const varuint = varint;
const utils_1 = utils;
const address_1 = address;
const bufferutils_1 = bufferutils;
const networks_1 = networks$1;
const payments = payments$3;
const bip341_1 = bip341;
const bscript = script;
const transaction_1 = transaction;
const bip371_1 = bip371;
const psbtutils_1 = psbtutils;
/**
 * These are the default arguments for a Psbt instance.
 */
const DEFAULT_OPTS = {
  /**
   * A bitcoinjs Network object. This is only used if you pass an `address`
   * parameter to addOutput. Otherwise it is not needed and can be left default.
   */
  network: networks_1.bitcoin,
  /**
   * When extractTransaction is called, the fee rate is checked.
   * THIS IS NOT TO BE RELIED ON.
   * It is only here as a last ditch effort to prevent sending a 500 BTC fee etc.
   */
  maximumFeeRate: 5000, // satoshi per byte
};
/**
 * Psbt class can parse and generate a PSBT binary based off of the BIP174.
 * There are 6 roles that this class fulfills. (Explained in BIP174)
 *
 * Creator: This can be done with `new Psbt()`
 * Updater: This can be done with `psbt.addInput(input)`, `psbt.addInputs(inputs)`,
 *   `psbt.addOutput(output)`, `psbt.addOutputs(outputs)` when you are looking to
 *   add new inputs and outputs to the PSBT, and `psbt.updateGlobal(itemObject)`,
 *   `psbt.updateInput(itemObject)`, `psbt.updateOutput(itemObject)`
 *   addInput requires hash: Buffer | string; and index: number; as attributes
 *   and can also include any attributes that are used in updateInput method.
 *   addOutput requires script: Buffer; and value: number; and likewise can include
 *   data for updateOutput.
 *   For a list of what attributes should be what types. Check the bip174 library.
 *   Also, check the integration tests for some examples of usage.
 * Signer: There are a few methods. signAllInputs and signAllInputsAsync, which will search all input
 *   information for your pubkey or pubkeyhash, and only sign inputs where it finds
 *   your info. Or you can explicitly sign a specific input with signInput and
 *   signInputAsync. For the async methods you can create a SignerAsync object
 *   and use something like a hardware wallet to sign with. (You must implement this)
 * Combiner: psbts can be combined easily with `psbt.combine(psbt2, psbt3, psbt4 ...)`
 *   the psbt calling combine will always have precedence when a conflict occurs.
 *   Combine checks if the internal bitcoin transaction is the same, so be sure that
 *   all sequences, version, locktime, etc. are the same before combining.
 * Input Finalizer: This role is fairly important. Not only does it need to construct
 *   the input scriptSigs and witnesses, but it SHOULD verify the signatures etc.
 *   Before running `psbt.finalizeAllInputs()` please run `psbt.validateSignaturesOfAllInputs()`
 *   Running any finalize method will delete any data in the input(s) that are no longer
 *   needed due to the finalized scripts containing the information.
 * Transaction Extractor: This role will perform some checks before returning a
 *   Transaction object. Such as fee rate not being larger than maximumFeeRate etc.
 */
class Psbt {
  static fromBase64(data, opts = {}) {
    const buffer$1 = buffer.Buffer.from(data, 'base64');
    return this.fromBuffer(buffer$1, opts);
  }
  static fromHex(data, opts = {}) {
    const buffer$1 = buffer.Buffer.from(data, 'hex');
    return this.fromBuffer(buffer$1, opts);
  }
  static fromBuffer(buffer, opts = {}) {
    const psbtBase = bip174_1.Psbt.fromBuffer(buffer, transactionFromBuffer);
    const psbt = new Psbt(opts, psbtBase);
    checkTxForDupeIns(psbt.__CACHE.__TX, psbt.__CACHE);
    return psbt;
  }
  constructor(opts = {}, data = new bip174_1.Psbt(new PsbtTransaction())) {
    this.data = data;
    // set defaults
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this.__CACHE = {
      __NON_WITNESS_UTXO_TX_CACHE: [],
      __NON_WITNESS_UTXO_BUF_CACHE: [],
      __TX_IN_CACHE: {},
      __TX: this.data.globalMap.unsignedTx.tx,
      // Psbt's predecesor (TransactionBuilder - now removed) behavior
      // was to not confirm input values  before signing.
      // Even though we highly encourage people to get
      // the full parent transaction to verify values, the ability to
      // sign non-segwit inputs without the full transaction was often
      // requested. So the only way to activate is to use @ts-ignore.
      // We will disable exporting the Psbt when unsafe sign is active.
      // because it is not BIP174 compliant.
      __UNSAFE_SIGN_NONSEGWIT: false,
    };
    if (this.data.inputs.length === 0) this.setVersion(2);
    // Make data hidden when enumerating
    const dpew = (obj, attr, enumerable, writable) =>
      Object.defineProperty(obj, attr, {
        enumerable,
        writable,
      });
    dpew(this, '__CACHE', false, true);
    dpew(this, 'opts', false, true);
  }
  get inputCount() {
    return this.data.inputs.length;
  }
  get version() {
    return this.__CACHE.__TX.version;
  }
  set version(version) {
    this.setVersion(version);
  }
  get locktime() {
    return this.__CACHE.__TX.locktime;
  }
  set locktime(locktime) {
    this.setLocktime(locktime);
  }
  get txInputs() {
    return this.__CACHE.__TX.ins.map(input => ({
      hash: (0, bufferutils_1.cloneBuffer)(input.hash),
      index: input.index,
      sequence: input.sequence,
    }));
  }
  get txOutputs() {
    return this.__CACHE.__TX.outs.map(output => {
      let address;
      try {
        address = (0, address_1.fromOutputScript)(
          output.script,
          this.opts.network,
        );
      } catch (_) {}
      return {
        script: (0, bufferutils_1.cloneBuffer)(output.script),
        value: output.value,
        address,
      };
    });
  }
  combine(...those) {
    this.data.combine(...those.map(o => o.data));
    return this;
  }
  clone() {
    // TODO: more efficient cloning
    const res = Psbt.fromBuffer(this.data.toBuffer());
    res.opts = JSON.parse(JSON.stringify(this.opts));
    return res;
  }
  setMaximumFeeRate(satoshiPerByte) {
    check32Bit(satoshiPerByte); // 42.9 BTC per byte IS excessive... so throw
    this.opts.maximumFeeRate = satoshiPerByte;
  }
  setVersion(version) {
    check32Bit(version);
    checkInputsForPartialSig(this.data.inputs, 'setVersion');
    const c = this.__CACHE;
    c.__TX.version = version;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  setLocktime(locktime) {
    check32Bit(locktime);
    checkInputsForPartialSig(this.data.inputs, 'setLocktime');
    const c = this.__CACHE;
    c.__TX.locktime = locktime;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  setInputSequence(inputIndex, sequence) {
    check32Bit(sequence);
    checkInputsForPartialSig(this.data.inputs, 'setInputSequence');
    const c = this.__CACHE;
    if (c.__TX.ins.length <= inputIndex) {
      throw new Error('Input index too high');
    }
    c.__TX.ins[inputIndex].sequence = sequence;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  addInputs(inputDatas) {
    inputDatas.forEach(inputData => this.addInput(inputData));
    return this;
  }
  addInput(inputData) {
    if (
      arguments.length > 1 ||
      !inputData ||
      inputData.hash === undefined ||
      inputData.index === undefined
    ) {
      throw new Error(
        `Invalid arguments for Psbt.addInput. ` +
          `Requires single object with at least [hash] and [index]`,
      );
    }
    (0, bip371_1.checkTaprootInputFields)(inputData, inputData, 'addInput');
    checkInputsForPartialSig(this.data.inputs, 'addInput');
    if (inputData.witnessScript) checkInvalidP2WSH(inputData.witnessScript);
    const c = this.__CACHE;
    this.data.addInput(inputData);
    const txIn = c.__TX.ins[c.__TX.ins.length - 1];
    checkTxInputCache(c, txIn);
    const inputIndex = this.data.inputs.length - 1;
    const input = this.data.inputs[inputIndex];
    if (input.nonWitnessUtxo) {
      addNonWitnessTxCache(this.__CACHE, input, inputIndex);
    }
    c.__FEE = undefined;
    c.__FEE_RATE = undefined;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  addOutputs(outputDatas) {
    outputDatas.forEach(outputData => this.addOutput(outputData));
    return this;
  }
  addOutput(outputData) {
    if (
      arguments.length > 1 ||
      !outputData ||
      outputData.value === undefined ||
      (outputData.address === undefined && outputData.script === undefined)
    ) {
      throw new Error(
        `Invalid arguments for Psbt.addOutput. ` +
          `Requires single object with at least [script or address] and [value]`,
      );
    }
    checkInputsForPartialSig(this.data.inputs, 'addOutput');
    const { address } = outputData;
    if (typeof address === 'string') {
      const { network } = this.opts;
      const script = (0, address_1.toOutputScript)(address, network);
      outputData = Object.assign(outputData, { script });
    }
    (0, bip371_1.checkTaprootOutputFields)(outputData, outputData, 'addOutput');
    const c = this.__CACHE;
    this.data.addOutput(outputData);
    c.__FEE = undefined;
    c.__FEE_RATE = undefined;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  extractTransaction(disableFeeCheck) {
    if (!this.data.inputs.every(isFinalized)) throw new Error('Not finalized');
    const c = this.__CACHE;
    if (!disableFeeCheck) {
      checkFees(this, c, this.opts);
    }
    if (c.__EXTRACTED_TX) return c.__EXTRACTED_TX;
    const tx = c.__TX.clone();
    inputFinalizeGetAmts(this.data.inputs, tx, c, true);
    return tx;
  }
  getFeeRate() {
    return getTxCacheValue(
      '__FEE_RATE',
      'fee rate',
      this.data.inputs,
      this.__CACHE,
    );
  }
  getFee() {
    return getTxCacheValue('__FEE', 'fee', this.data.inputs, this.__CACHE);
  }
  finalizeAllInputs() {
    (0, utils_1.checkForInput)(this.data.inputs, 0); // making sure we have at least one
    range(this.data.inputs.length).forEach(idx => this.finalizeInput(idx));
    return this;
  }
  finalizeInput(inputIndex, finalScriptsFunc) {
    const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
    if ((0, bip371_1.isTaprootInput)(input))
      return this._finalizeTaprootInput(
        inputIndex,
        input,
        undefined,
        finalScriptsFunc,
      );
    return this._finalizeInput(inputIndex, input, finalScriptsFunc);
  }
  finalizeTaprootInput(
    inputIndex,
    tapLeafHashToFinalize,
    finalScriptsFunc = bip371_1.tapScriptFinalizer,
  ) {
    const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
    if ((0, bip371_1.isTaprootInput)(input))
      return this._finalizeTaprootInput(
        inputIndex,
        input,
        tapLeafHashToFinalize,
        finalScriptsFunc,
      );
    throw new Error(`Cannot finalize input #${inputIndex}. Not Taproot.`);
  }
  _finalizeInput(inputIndex, input, finalScriptsFunc = getFinalScripts) {
    const { script, isP2SH, isP2WSH, isSegwit } = getScriptFromInput(
      inputIndex,
      input,
      this.__CACHE,
    );
    if (!script) throw new Error(`No script found for input #${inputIndex}`);
    checkPartialSigSighashes(input);
    const { finalScriptSig, finalScriptWitness } = finalScriptsFunc(
      inputIndex,
      input,
      script,
      isSegwit,
      isP2SH,
      isP2WSH,
    );
    if (finalScriptSig) this.data.updateInput(inputIndex, { finalScriptSig });
    if (finalScriptWitness)
      this.data.updateInput(inputIndex, { finalScriptWitness });
    if (!finalScriptSig && !finalScriptWitness)
      throw new Error(`Unknown error finalizing input #${inputIndex}`);
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
  _finalizeTaprootInput(
    inputIndex,
    input,
    tapLeafHashToFinalize,
    finalScriptsFunc = bip371_1.tapScriptFinalizer,
  ) {
    if (!input.witnessUtxo)
      throw new Error(
        `Cannot finalize input #${inputIndex}. Missing withness utxo.`,
      );
    // Check key spend first. Increased privacy and reduced block space.
    if (input.tapKeySig) {
      const payment = payments.p2tr({
        output: input.witnessUtxo.script,
        signature: input.tapKeySig,
      });
      const finalScriptWitness = (0, psbtutils_1.witnessStackToScriptWitness)(
        payment.witness,
      );
      this.data.updateInput(inputIndex, { finalScriptWitness });
    } else {
      const { finalScriptWitness } = finalScriptsFunc(
        inputIndex,
        input,
        tapLeafHashToFinalize,
      );
      this.data.updateInput(inputIndex, { finalScriptWitness });
    }
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
  getInputType(inputIndex) {
    const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
    const script = getScriptFromUtxo(inputIndex, input, this.__CACHE);
    const result = getMeaningfulScript(
      script,
      inputIndex,
      'input',
      input.redeemScript || redeemFromFinalScriptSig(input.finalScriptSig),
      input.witnessScript ||
        redeemFromFinalWitnessScript(input.finalScriptWitness),
    );
    const type = result.type === 'raw' ? '' : result.type + '-';
    const mainType = classifyScript(result.meaningfulScript);
    return type + mainType;
  }
  inputHasPubkey(inputIndex, pubkey) {
    const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
    return pubkeyInInput(pubkey, input, inputIndex, this.__CACHE);
  }
  inputHasHDKey(inputIndex, root) {
    const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
    const derivationIsMine = bip32DerivationIsMine(root);
    return (
      !!input.bip32Derivation && input.bip32Derivation.some(derivationIsMine)
    );
  }
  outputHasPubkey(outputIndex, pubkey) {
    const output = (0, utils_1.checkForOutput)(this.data.outputs, outputIndex);
    return pubkeyInOutput(pubkey, output, outputIndex, this.__CACHE);
  }
  outputHasHDKey(outputIndex, root) {
    const output = (0, utils_1.checkForOutput)(this.data.outputs, outputIndex);
    const derivationIsMine = bip32DerivationIsMine(root);
    return (
      !!output.bip32Derivation && output.bip32Derivation.some(derivationIsMine)
    );
  }
  validateSignaturesOfAllInputs(validator) {
    (0, utils_1.checkForInput)(this.data.inputs, 0); // making sure we have at least one
    const results = range(this.data.inputs.length).map(idx =>
      this.validateSignaturesOfInput(idx, validator),
    );
    return results.reduce((final, res) => res === true && final, true);
  }
  validateSignaturesOfInput(inputIndex, validator, pubkey) {
    const input = this.data.inputs[inputIndex];
    if ((0, bip371_1.isTaprootInput)(input))
      return this.validateSignaturesOfTaprootInput(
        inputIndex,
        validator,
        pubkey,
      );
    return this._validateSignaturesOfInput(inputIndex, validator, pubkey);
  }
  _validateSignaturesOfInput(inputIndex, validator, pubkey) {
    const input = this.data.inputs[inputIndex];
    const partialSig = (input || {}).partialSig;
    if (!input || !partialSig || partialSig.length < 1)
      throw new Error('No signatures to validate');
    if (typeof validator !== 'function')
      throw new Error('Need validator function to validate signatures');
    const mySigs = pubkey
      ? partialSig.filter(sig => sig.pubkey.equals(pubkey))
      : partialSig;
    if (mySigs.length < 1) throw new Error('No signatures for this pubkey');
    const results = [];
    let hashCache;
    let scriptCache;
    let sighashCache;
    for (const pSig of mySigs) {
      const sig = bscript.signature.decode(pSig.signature);
      const { hash, script } =
        sighashCache !== sig.hashType
          ? getHashForSig(
              inputIndex,
              Object.assign({}, input, { sighashType: sig.hashType }),
              this.__CACHE,
              true,
            )
          : { hash: hashCache, script: scriptCache };
      sighashCache = sig.hashType;
      hashCache = hash;
      scriptCache = script;
      checkScriptForPubkey(pSig.pubkey, script, 'verify');
      results.push(validator(pSig.pubkey, hash, sig.signature));
    }
    return results.every(res => res === true);
  }
  validateSignaturesOfTaprootInput(inputIndex, validator, pubkey) {
    const input = this.data.inputs[inputIndex];
    const tapKeySig = (input || {}).tapKeySig;
    const tapScriptSig = (input || {}).tapScriptSig;
    if (!input && !tapKeySig && !(tapScriptSig && !tapScriptSig.length))
      throw new Error('No signatures to validate');
    if (typeof validator !== 'function')
      throw new Error('Need validator function to validate signatures');
    pubkey = pubkey && (0, bip371_1.toXOnly)(pubkey);
    const allHashses = pubkey
      ? getTaprootHashesForSig(
          inputIndex,
          input,
          this.data.inputs,
          pubkey,
          this.__CACHE,
        )
      : getAllTaprootHashesForSig(
          inputIndex,
          input,
          this.data.inputs,
          this.__CACHE,
        );
    if (!allHashses.length) throw new Error('No signatures for this pubkey');
    const tapKeyHash = allHashses.find(h => !!h.leafHash);
    if (tapKeySig && tapKeyHash) {
      const isValidTapkeySig = validator(
        tapKeyHash.pubkey,
        tapKeyHash.hash,
        tapKeySig,
      );
      if (!isValidTapkeySig) return false;
    }
    if (tapScriptSig) {
      for (const tapSig of tapScriptSig) {
        const tapSigHash = allHashses.find(h => tapSig.pubkey.equals(h.pubkey));
        if (tapSigHash) {
          const isValidTapScriptSig = validator(
            tapSig.pubkey,
            tapSigHash.hash,
            tapSig.signature,
          );
          if (!isValidTapScriptSig) return false;
        }
      }
    }
    return true;
  }
  signAllInputsHD(
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
      throw new Error('Need HDSigner to sign input');
    }
    const results = [];
    for (const i of range(this.data.inputs.length)) {
      try {
        this.signInputHD(i, hdKeyPair, sighashTypes);
        results.push(true);
      } catch (err) {
        results.push(false);
      }
    }
    if (results.every(v => v === false)) {
      throw new Error('No inputs were signed');
    }
    return this;
  }
  signAllInputsHDAsync(
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    return new Promise((resolve, reject) => {
      if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
        return reject(new Error('Need HDSigner to sign input'));
      }
      const results = [];
      const promises = [];
      for (const i of range(this.data.inputs.length)) {
        promises.push(
          this.signInputHDAsync(i, hdKeyPair, sighashTypes).then(
            () => {
              results.push(true);
            },
            () => {
              results.push(false);
            },
          ),
        );
      }
      return Promise.all(promises).then(() => {
        if (results.every(v => v === false)) {
          return reject(new Error('No inputs were signed'));
        }
        resolve();
      });
    });
  }
  signInputHD(
    inputIndex,
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
      throw new Error('Need HDSigner to sign input');
    }
    const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
    signers.forEach(signer => this.signInput(inputIndex, signer, sighashTypes));
    return this;
  }
  signInputHDAsync(
    inputIndex,
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    return new Promise((resolve, reject) => {
      if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
        return reject(new Error('Need HDSigner to sign input'));
      }
      const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
      const promises = signers.map(signer =>
        this.signInputAsync(inputIndex, signer, sighashTypes),
      );
      return Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  }
  signAllInputs(keyPair, sighashTypes) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error('Need Signer to sign input');
    // TODO: Add a pubkey/pubkeyhash cache to each input
    // as input information is added, then eventually
    // optimize this method.
    const results = [];
    for (const i of range(this.data.inputs.length)) {
      try {
        this.signInput(i, keyPair, sighashTypes);
        results.push(true);
      } catch (err) {
        results.push(false);
      }
    }
    if (results.every(v => v === false)) {
      throw new Error('No inputs were signed');
    }
    return this;
  }
  signAllInputsAsync(keyPair, sighashTypes) {
    return new Promise((resolve, reject) => {
      if (!keyPair || !keyPair.publicKey)
        return reject(new Error('Need Signer to sign input'));
      // TODO: Add a pubkey/pubkeyhash cache to each input
      // as input information is added, then eventually
      // optimize this method.
      const results = [];
      const promises = [];
      for (const [i] of this.data.inputs.entries()) {
        promises.push(
          this.signInputAsync(i, keyPair, sighashTypes).then(
            () => {
              results.push(true);
            },
            () => {
              results.push(false);
            },
          ),
        );
      }
      return Promise.all(promises).then(() => {
        if (results.every(v => v === false)) {
          return reject(new Error('No inputs were signed'));
        }
        resolve();
      });
    });
  }
  signInput(inputIndex, keyPair, sighashTypes) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error('Need Signer to sign input');
    const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
    if ((0, bip371_1.isTaprootInput)(input)) {
      return this._signTaprootInput(
        inputIndex,
        input,
        keyPair,
        undefined,
        sighashTypes,
      );
    }
    return this._signInput(inputIndex, keyPair, sighashTypes);
  }
  signTaprootInput(inputIndex, keyPair, tapLeafHashToSign, sighashTypes) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error('Need Signer to sign input');
    const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
    if ((0, bip371_1.isTaprootInput)(input))
      return this._signTaprootInput(
        inputIndex,
        input,
        keyPair,
        tapLeafHashToSign,
        sighashTypes,
      );
    throw new Error(`Input #${inputIndex} is not of type Taproot.`);
  }
  _signInput(
    inputIndex,
    keyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    const { hash, sighashType } = getHashAndSighashType(
      this.data.inputs,
      inputIndex,
      keyPair.publicKey,
      this.__CACHE,
      sighashTypes,
    );
    const partialSig = [
      {
        pubkey: keyPair.publicKey,
        signature: bscript.signature.encode(keyPair.sign(hash), sighashType),
      },
    ];
    this.data.updateInput(inputIndex, { partialSig });
    return this;
  }
  _signTaprootInput(
    inputIndex,
    input,
    keyPair,
    tapLeafHashToSign,
    allowedSighashTypes = [transaction_1.Transaction.SIGHASH_DEFAULT],
  ) {
    const hashesForSig = this.checkTaprootHashesForSig(
      inputIndex,
      input,
      keyPair,
      tapLeafHashToSign,
      allowedSighashTypes,
    );
    const tapKeySig = hashesForSig
      .filter(h => !h.leafHash)
      .map(h =>
        (0, bip371_1.serializeTaprootSignature)(
          keyPair.signSchnorr(h.hash),
          input.sighashType,
        ),
      )[0];
    const tapScriptSig = hashesForSig
      .filter(h => !!h.leafHash)
      .map(h => ({
        pubkey: (0, bip371_1.toXOnly)(keyPair.publicKey),
        signature: (0, bip371_1.serializeTaprootSignature)(
          keyPair.signSchnorr(h.hash),
          input.sighashType,
        ),
        leafHash: h.leafHash,
      }));
    if (tapKeySig) {
      this.data.updateInput(inputIndex, { tapKeySig });
    }
    if (tapScriptSig.length) {
      this.data.updateInput(inputIndex, { tapScriptSig });
    }
    return this;
  }
  signInputAsync(inputIndex, keyPair, sighashTypes) {
    return Promise.resolve().then(() => {
      if (!keyPair || !keyPair.publicKey)
        throw new Error('Need Signer to sign input');
      const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
      if ((0, bip371_1.isTaprootInput)(input))
        return this._signTaprootInputAsync(
          inputIndex,
          input,
          keyPair,
          undefined,
          sighashTypes,
        );
      return this._signInputAsync(inputIndex, keyPair, sighashTypes);
    });
  }
  signTaprootInputAsync(inputIndex, keyPair, tapLeafHash, sighashTypes) {
    return Promise.resolve().then(() => {
      if (!keyPair || !keyPair.publicKey)
        throw new Error('Need Signer to sign input');
      const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
      if ((0, bip371_1.isTaprootInput)(input))
        return this._signTaprootInputAsync(
          inputIndex,
          input,
          keyPair,
          tapLeafHash,
          sighashTypes,
        );
      throw new Error(`Input #${inputIndex} is not of type Taproot.`);
    });
  }
  _signInputAsync(
    inputIndex,
    keyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    const { hash, sighashType } = getHashAndSighashType(
      this.data.inputs,
      inputIndex,
      keyPair.publicKey,
      this.__CACHE,
      sighashTypes,
    );
    return Promise.resolve(keyPair.sign(hash)).then(signature => {
      const partialSig = [
        {
          pubkey: keyPair.publicKey,
          signature: bscript.signature.encode(signature, sighashType),
        },
      ];
      this.data.updateInput(inputIndex, { partialSig });
    });
  }
  async _signTaprootInputAsync(
    inputIndex,
    input,
    keyPair,
    tapLeafHash,
    sighashTypes = [transaction_1.Transaction.SIGHASH_DEFAULT],
  ) {
    const hashesForSig = this.checkTaprootHashesForSig(
      inputIndex,
      input,
      keyPair,
      tapLeafHash,
      sighashTypes,
    );
    const signaturePromises = [];
    const tapKeyHash = hashesForSig.filter(h => !h.leafHash)[0];
    if (tapKeyHash) {
      const tapKeySigPromise = Promise.resolve(
        keyPair.signSchnorr(tapKeyHash.hash),
      ).then(sig => {
        return {
          tapKeySig: (0, bip371_1.serializeTaprootSignature)(
            sig,
            input.sighashType,
          ),
        };
      });
      signaturePromises.push(tapKeySigPromise);
    }
    const tapScriptHashes = hashesForSig.filter(h => !!h.leafHash);
    if (tapScriptHashes.length) {
      const tapScriptSigPromises = tapScriptHashes.map(tsh => {
        return Promise.resolve(keyPair.signSchnorr(tsh.hash)).then(
          signature => {
            const tapScriptSig = [
              {
                pubkey: (0, bip371_1.toXOnly)(keyPair.publicKey),
                signature: (0, bip371_1.serializeTaprootSignature)(
                  signature,
                  input.sighashType,
                ),
                leafHash: tsh.leafHash,
              },
            ];
            return { tapScriptSig };
          },
        );
      });
      signaturePromises.push(...tapScriptSigPromises);
    }
    return Promise.all(signaturePromises).then(results => {
      results.forEach(v => this.data.updateInput(inputIndex, v));
    });
  }
  checkTaprootHashesForSig(
    inputIndex,
    input,
    keyPair,
    tapLeafHashToSign,
    allowedSighashTypes,
  ) {
    if (typeof keyPair.signSchnorr !== 'function')
      throw new Error(
        `Need Schnorr Signer to sign taproot input #${inputIndex}.`,
      );
    const hashesForSig = getTaprootHashesForSig(
      inputIndex,
      input,
      this.data.inputs,
      keyPair.publicKey,
      this.__CACHE,
      tapLeafHashToSign,
      allowedSighashTypes,
    );
    if (!hashesForSig || !hashesForSig.length)
      throw new Error(
        `Can not sign for input #${inputIndex} with the key ${keyPair.publicKey.toString(
          'hex',
        )}`,
      );
    return hashesForSig;
  }
  toBuffer() {
    checkCache(this.__CACHE);
    return this.data.toBuffer();
  }
  toHex() {
    checkCache(this.__CACHE);
    return this.data.toHex();
  }
  toBase64() {
    checkCache(this.__CACHE);
    return this.data.toBase64();
  }
  updateGlobal(updateData) {
    this.data.updateGlobal(updateData);
    return this;
  }
  updateInput(inputIndex, updateData) {
    if (updateData.witnessScript) checkInvalidP2WSH(updateData.witnessScript);
    (0, bip371_1.checkTaprootInputFields)(
      this.data.inputs[inputIndex],
      updateData,
      'updateInput',
    );
    this.data.updateInput(inputIndex, updateData);
    if (updateData.nonWitnessUtxo) {
      addNonWitnessTxCache(
        this.__CACHE,
        this.data.inputs[inputIndex],
        inputIndex,
      );
    }
    return this;
  }
  updateOutput(outputIndex, updateData) {
    const outputData = this.data.outputs[outputIndex];
    (0, bip371_1.checkTaprootOutputFields)(
      outputData,
      updateData,
      'updateOutput',
    );
    this.data.updateOutput(outputIndex, updateData);
    return this;
  }
  addUnknownKeyValToGlobal(keyVal) {
    this.data.addUnknownKeyValToGlobal(keyVal);
    return this;
  }
  addUnknownKeyValToInput(inputIndex, keyVal) {
    this.data.addUnknownKeyValToInput(inputIndex, keyVal);
    return this;
  }
  addUnknownKeyValToOutput(outputIndex, keyVal) {
    this.data.addUnknownKeyValToOutput(outputIndex, keyVal);
    return this;
  }
  clearFinalizedInput(inputIndex) {
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
}
psbt$1.Psbt = Psbt;
/**
 * This function is needed to pass to the bip174 base class's fromBuffer.
 * It takes the "transaction buffer" portion of the psbt buffer and returns a
 * Transaction (From the bip174 library) interface.
 */
const transactionFromBuffer = buffer => new PsbtTransaction(buffer);
/**
 * This class implements the Transaction interface from bip174 library.
 * It contains a bitcoinjs-lib Transaction object.
 */
class PsbtTransaction {
  constructor(buffer$1 = buffer.Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
    this.tx = transaction_1.Transaction.fromBuffer(buffer$1);
    checkTxEmpty(this.tx);
    Object.defineProperty(this, 'tx', {
      enumerable: false,
      writable: true,
    });
  }
  getInputOutputCounts() {
    return {
      inputCount: this.tx.ins.length,
      outputCount: this.tx.outs.length,
    };
  }
  addInput(input) {
    if (
      input.hash === undefined ||
      input.index === undefined ||
      (!buffer.Buffer.isBuffer(input.hash) && typeof input.hash !== 'string') ||
      typeof input.index !== 'number'
    ) {
      throw new Error('Error adding input.');
    }
    const hash =
      typeof input.hash === 'string'
        ? (0, bufferutils_1.reverseBuffer)(buffer.Buffer.from(input.hash, 'hex'))
        : input.hash;
    this.tx.addInput(hash, input.index, input.sequence);
  }
  addOutput(output) {
    if (
      output.script === undefined ||
      output.value === undefined ||
      !buffer.Buffer.isBuffer(output.script) ||
      typeof output.value !== 'number'
    ) {
      throw new Error('Error adding output.');
    }
    this.tx.addOutput(output.script, output.value);
  }
  toBuffer() {
    return this.tx.toBuffer();
  }
}
function canFinalize(input, script, scriptType) {
  switch (scriptType) {
    case 'pubkey':
    case 'pubkeyhash':
    case 'witnesspubkeyhash':
      return hasSigs(1, input.partialSig);
    case 'multisig':
      const p2ms = payments.p2ms({ output: script });
      return hasSigs(p2ms.m, input.partialSig, p2ms.pubkeys);
    default:
      return false;
  }
}
function checkCache(cache) {
  if (cache.__UNSAFE_SIGN_NONSEGWIT !== false) {
    throw new Error('Not BIP174 compliant, can not export');
  }
}
function hasSigs(neededSigs, partialSig, pubkeys) {
  if (!partialSig) return false;
  let sigs;
  if (pubkeys) {
    sigs = pubkeys
      .map(pkey => {
        const pubkey = compressPubkey(pkey);
        return partialSig.find(pSig => pSig.pubkey.equals(pubkey));
      })
      .filter(v => !!v);
  } else {
    sigs = partialSig;
  }
  if (sigs.length > neededSigs) throw new Error('Too many signatures');
  return sigs.length === neededSigs;
}
function isFinalized(input) {
  return !!input.finalScriptSig || !!input.finalScriptWitness;
}
function bip32DerivationIsMine(root) {
  return d => {
    if (!d.masterFingerprint.equals(root.fingerprint)) return false;
    if (!root.derivePath(d.path).publicKey.equals(d.pubkey)) return false;
    return true;
  };
}
function check32Bit(num) {
  if (
    typeof num !== 'number' ||
    num !== Math.floor(num) ||
    num > 0xffffffff ||
    num < 0
  ) {
    throw new Error('Invalid 32 bit integer');
  }
}
function checkFees(psbt, cache, opts) {
  const feeRate = cache.__FEE_RATE || psbt.getFeeRate();
  const vsize = cache.__EXTRACTED_TX.virtualSize();
  const satoshis = feeRate * vsize;
  if (feeRate >= opts.maximumFeeRate) {
    throw new Error(
      `Warning: You are paying around ${(satoshis / 1e8).toFixed(8)} in ` +
        `fees, which is ${feeRate} satoshi per byte for a transaction ` +
        `with a VSize of ${vsize} bytes (segwit counted as 0.25 byte per ` +
        `byte). Use setMaximumFeeRate method to raise your threshold, or ` +
        `pass true to the first arg of extractTransaction.`,
    );
  }
}
function checkInputsForPartialSig(inputs, action) {
  inputs.forEach(input => {
    const throws = (0, bip371_1.isTaprootInput)(input)
      ? (0, bip371_1.checkTaprootInputForSigs)(input, action)
      : (0, psbtutils_1.checkInputForSig)(input, action);
    if (throws)
      throw new Error('Can not modify transaction, signatures exist.');
  });
}
function checkPartialSigSighashes(input) {
  if (!input.sighashType || !input.partialSig) return;
  const { partialSig, sighashType } = input;
  partialSig.forEach(pSig => {
    const { hashType } = bscript.signature.decode(pSig.signature);
    if (sighashType !== hashType) {
      throw new Error('Signature sighash does not match input sighash type');
    }
  });
}
function checkScriptForPubkey(pubkey, script, action) {
  if (!(0, psbtutils_1.pubkeyInScript)(pubkey, script)) {
    throw new Error(
      `Can not ${action} for this input with the key ${pubkey.toString('hex')}`,
    );
  }
}
function checkTxEmpty(tx) {
  const isEmpty = tx.ins.every(
    input =>
      input.script &&
      input.script.length === 0 &&
      input.witness &&
      input.witness.length === 0,
  );
  if (!isEmpty) {
    throw new Error('Format Error: Transaction ScriptSigs are not empty');
  }
}
function checkTxForDupeIns(tx, cache) {
  tx.ins.forEach(input => {
    checkTxInputCache(cache, input);
  });
}
function checkTxInputCache(cache, input) {
  const key =
    (0, bufferutils_1.reverseBuffer)(buffer.Buffer.from(input.hash)).toString('hex') +
    ':' +
    input.index;
  if (cache.__TX_IN_CACHE[key]) throw new Error('Duplicate input detected.');
  cache.__TX_IN_CACHE[key] = 1;
}
function scriptCheckerFactory(payment, paymentScriptName) {
  return (inputIndex, scriptPubKey, redeemScript, ioType) => {
    const redeemScriptOutput = payment({
      redeem: { output: redeemScript },
    }).output;
    if (!scriptPubKey.equals(redeemScriptOutput)) {
      throw new Error(
        `${paymentScriptName} for ${ioType} #${inputIndex} doesn't match the scriptPubKey in the prevout`,
      );
    }
  };
}
const checkRedeemScript = scriptCheckerFactory(payments.p2sh, 'Redeem script');
const checkWitnessScript = scriptCheckerFactory(
  payments.p2wsh,
  'Witness script',
);
function getTxCacheValue(key, name, inputs, c) {
  if (!inputs.every(isFinalized))
    throw new Error(`PSBT must be finalized to calculate ${name}`);
  if (key === '__FEE_RATE' && c.__FEE_RATE) return c.__FEE_RATE;
  if (key === '__FEE' && c.__FEE) return c.__FEE;
  let tx;
  let mustFinalize = true;
  if (c.__EXTRACTED_TX) {
    tx = c.__EXTRACTED_TX;
    mustFinalize = false;
  } else {
    tx = c.__TX.clone();
  }
  inputFinalizeGetAmts(inputs, tx, c, mustFinalize);
  if (key === '__FEE_RATE') return c.__FEE_RATE;
  else if (key === '__FEE') return c.__FEE;
}
function getFinalScripts(inputIndex, input, script, isSegwit, isP2SH, isP2WSH) {
  const scriptType = classifyScript(script);
  if (!canFinalize(input, script, scriptType))
    throw new Error(`Can not finalize input #${inputIndex}`);
  return prepareFinalScripts(
    script,
    scriptType,
    input.partialSig,
    isSegwit,
    isP2SH,
    isP2WSH,
  );
}
function prepareFinalScripts(
  script,
  scriptType,
  partialSig,
  isSegwit,
  isP2SH,
  isP2WSH,
) {
  let finalScriptSig;
  let finalScriptWitness;
  // Wow, the payments API is very handy
  const payment = getPayment(script, scriptType, partialSig);
  const p2wsh = !isP2WSH ? null : payments.p2wsh({ redeem: payment });
  const p2sh = !isP2SH ? null : payments.p2sh({ redeem: p2wsh || payment });
  if (isSegwit) {
    if (p2wsh) {
      finalScriptWitness = (0, psbtutils_1.witnessStackToScriptWitness)(
        p2wsh.witness,
      );
    } else {
      finalScriptWitness = (0, psbtutils_1.witnessStackToScriptWitness)(
        payment.witness,
      );
    }
    if (p2sh) {
      finalScriptSig = p2sh.input;
    }
  } else {
    if (p2sh) {
      finalScriptSig = p2sh.input;
    } else {
      finalScriptSig = payment.input;
    }
  }
  return {
    finalScriptSig,
    finalScriptWitness,
  };
}
function getHashAndSighashType(
  inputs,
  inputIndex,
  pubkey,
  cache,
  sighashTypes,
) {
  const input = (0, utils_1.checkForInput)(inputs, inputIndex);
  const { hash, sighashType, script } = getHashForSig(
    inputIndex,
    input,
    cache,
    false,
    sighashTypes,
  );
  checkScriptForPubkey(pubkey, script, 'sign');
  return {
    hash,
    sighashType,
  };
}
function getHashForSig(inputIndex, input, cache, forValidate, sighashTypes) {
  const unsignedTx = cache.__TX;
  const sighashType =
    input.sighashType || transaction_1.Transaction.SIGHASH_ALL;
  checkSighashTypeAllowed(sighashType, sighashTypes);
  let hash;
  let prevout;
  if (input.nonWitnessUtxo) {
    const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
      cache,
      input,
      inputIndex,
    );
    const prevoutHash = unsignedTx.ins[inputIndex].hash;
    const utxoHash = nonWitnessUtxoTx.getHash();
    // If a non-witness UTXO is provided, its hash must match the hash specified in the prevout
    if (!prevoutHash.equals(utxoHash)) {
      throw new Error(
        `Non-witness UTXO hash for input #${inputIndex} doesn't match the hash specified in the prevout`,
      );
    }
    const prevoutIndex = unsignedTx.ins[inputIndex].index;
    prevout = nonWitnessUtxoTx.outs[prevoutIndex];
  } else if (input.witnessUtxo) {
    prevout = input.witnessUtxo;
  } else {
    throw new Error('Need a Utxo input item for signing');
  }
  const { meaningfulScript, type } = getMeaningfulScript(
    prevout.script,
    inputIndex,
    'input',
    input.redeemScript,
    input.witnessScript,
  );
  if (['p2sh-p2wsh', 'p2wsh'].indexOf(type) >= 0) {
    hash = unsignedTx.hashForWitnessV0(
      inputIndex,
      meaningfulScript,
      prevout.value,
      sighashType,
    );
  } else if ((0, psbtutils_1.isP2WPKH)(meaningfulScript)) {
    // P2WPKH uses the P2PKH template for prevoutScript when signing
    const signingScript = payments.p2pkh({
      hash: meaningfulScript.slice(2),
    }).output;
    hash = unsignedTx.hashForWitnessV0(
      inputIndex,
      signingScript,
      prevout.value,
      sighashType,
    );
  } else {
    // non-segwit
    if (
      input.nonWitnessUtxo === undefined &&
      cache.__UNSAFE_SIGN_NONSEGWIT === false
    )
      throw new Error(
        `Input #${inputIndex} has witnessUtxo but non-segwit script: ` +
          `${meaningfulScript.toString('hex')}`,
      );
    if (!forValidate && cache.__UNSAFE_SIGN_NONSEGWIT !== false)
      console.warn(
        'Warning: Signing non-segwit inputs without the full parent transaction ' +
          'means there is a chance that a miner could feed you incorrect information ' +
          "to trick you into paying large fees. This behavior is the same as Psbt's predecesor " +
          '(TransactionBuilder - now removed) when signing non-segwit scripts. You are not ' +
          'able to export this Psbt with toBuffer|toBase64|toHex since it is not ' +
          'BIP174 compliant.\n*********************\nPROCEED WITH CAUTION!\n' +
          '*********************',
      );
    hash = unsignedTx.hashForSignature(
      inputIndex,
      meaningfulScript,
      sighashType,
    );
  }
  return {
    script: meaningfulScript,
    sighashType,
    hash,
  };
}
function getAllTaprootHashesForSig(inputIndex, input, inputs, cache) {
  const allPublicKeys = [];
  if (input.tapInternalKey) {
    const outputKey = (0, bip371_1.tweakInternalPubKey)(inputIndex, input);
    allPublicKeys.push(outputKey);
  }
  if (input.tapScriptSig) {
    const tapScriptPubkeys = input.tapScriptSig.map(tss => tss.pubkey);
    allPublicKeys.push(...tapScriptPubkeys);
  }
  const allHashes = allPublicKeys.map(pubicKey =>
    getTaprootHashesForSig(inputIndex, input, inputs, pubicKey, cache),
  );
  return allHashes.flat();
}
function getTaprootHashesForSig(
  inputIndex,
  input,
  inputs,
  pubkey,
  cache,
  tapLeafHashToSign,
  allowedSighashTypes,
) {
  const unsignedTx = cache.__TX;
  const sighashType =
    input.sighashType || transaction_1.Transaction.SIGHASH_DEFAULT;
  checkSighashTypeAllowed(sighashType, allowedSighashTypes);
  const prevOuts = inputs.map((i, index) =>
    getScriptAndAmountFromUtxo(index, i, cache),
  );
  const signingScripts = prevOuts.map(o => o.script);
  const values = prevOuts.map(o => o.value);
  const hashes = [];
  if (input.tapInternalKey && !tapLeafHashToSign) {
    const outputKey = (0, bip371_1.tweakInternalPubKey)(inputIndex, input);
    if ((0, bip371_1.toXOnly)(pubkey).equals(outputKey)) {
      const tapKeyHash = unsignedTx.hashForWitnessV1(
        inputIndex,
        signingScripts,
        values,
        sighashType,
      );
      hashes.push({ pubkey, hash: tapKeyHash });
    }
  }
  const tapLeafHashes = (input.tapLeafScript || [])
    .filter(tapLeaf => (0, psbtutils_1.pubkeyInScript)(pubkey, tapLeaf.script))
    .map(tapLeaf => {
      const hash = (0, bip341_1.tapleafHash)({
        output: tapLeaf.script,
        version: tapLeaf.leafVersion,
      });
      return Object.assign({ hash }, tapLeaf);
    })
    .filter(
      tapLeaf => !tapLeafHashToSign || tapLeafHashToSign.equals(tapLeaf.hash),
    )
    .map(tapLeaf => {
      const tapScriptHash = unsignedTx.hashForWitnessV1(
        inputIndex,
        signingScripts,
        values,
        transaction_1.Transaction.SIGHASH_DEFAULT,
        tapLeaf.hash,
      );
      return {
        pubkey,
        hash: tapScriptHash,
        leafHash: tapLeaf.hash,
      };
    });
  return hashes.concat(tapLeafHashes);
}
function checkSighashTypeAllowed(sighashType, sighashTypes) {
  if (sighashTypes && sighashTypes.indexOf(sighashType) < 0) {
    const str = sighashTypeToString(sighashType);
    throw new Error(
      `Sighash type is not allowed. Retry the sign method passing the ` +
        `sighashTypes array of whitelisted types. Sighash type: ${str}`,
    );
  }
}
function getPayment(script, scriptType, partialSig) {
  let payment;
  switch (scriptType) {
    case 'multisig':
      const sigs = getSortedSigs(script, partialSig);
      payment = payments.p2ms({
        output: script,
        signatures: sigs,
      });
      break;
    case 'pubkey':
      payment = payments.p2pk({
        output: script,
        signature: partialSig[0].signature,
      });
      break;
    case 'pubkeyhash':
      payment = payments.p2pkh({
        output: script,
        pubkey: partialSig[0].pubkey,
        signature: partialSig[0].signature,
      });
      break;
    case 'witnesspubkeyhash':
      payment = payments.p2wpkh({
        output: script,
        pubkey: partialSig[0].pubkey,
        signature: partialSig[0].signature,
      });
      break;
  }
  return payment;
}
function getScriptFromInput(inputIndex, input, cache) {
  const unsignedTx = cache.__TX;
  const res = {
    script: null,
    isSegwit: false,
    isP2SH: false,
    isP2WSH: false,
  };
  res.isP2SH = !!input.redeemScript;
  res.isP2WSH = !!input.witnessScript;
  if (input.witnessScript) {
    res.script = input.witnessScript;
  } else if (input.redeemScript) {
    res.script = input.redeemScript;
  } else {
    if (input.nonWitnessUtxo) {
      const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
        cache,
        input,
        inputIndex,
      );
      const prevoutIndex = unsignedTx.ins[inputIndex].index;
      res.script = nonWitnessUtxoTx.outs[prevoutIndex].script;
    } else if (input.witnessUtxo) {
      res.script = input.witnessUtxo.script;
    }
  }
  if (input.witnessScript || (0, psbtutils_1.isP2WPKH)(res.script)) {
    res.isSegwit = true;
  }
  return res;
}
function getSignersFromHD(inputIndex, inputs, hdKeyPair) {
  const input = (0, utils_1.checkForInput)(inputs, inputIndex);
  if (!input.bip32Derivation || input.bip32Derivation.length === 0) {
    throw new Error('Need bip32Derivation to sign with HD');
  }
  const myDerivations = input.bip32Derivation
    .map(bipDv => {
      if (bipDv.masterFingerprint.equals(hdKeyPair.fingerprint)) {
        return bipDv;
      } else {
        return;
      }
    })
    .filter(v => !!v);
  if (myDerivations.length === 0) {
    throw new Error(
      'Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint',
    );
  }
  const signers = myDerivations.map(bipDv => {
    const node = hdKeyPair.derivePath(bipDv.path);
    if (!bipDv.pubkey.equals(node.publicKey)) {
      throw new Error('pubkey did not match bip32Derivation');
    }
    return node;
  });
  return signers;
}
function getSortedSigs(script, partialSig) {
  const p2ms = payments.p2ms({ output: script });
  // for each pubkey in order of p2ms script
  return p2ms.pubkeys
    .map(pk => {
      // filter partialSig array by pubkey being equal
      return (
        partialSig.filter(ps => {
          return ps.pubkey.equals(pk);
        })[0] || {}
      ).signature;
      // Any pubkey without a match will return undefined
      // this last filter removes all the undefined items in the array.
    })
    .filter(v => !!v);
}
function scriptWitnessToWitnessStack(buffer) {
  let offset = 0;
  function readSlice(n) {
    offset += n;
    return buffer.slice(offset - n, offset);
  }
  function readVarInt() {
    const vi = varuint.decode(buffer, offset);
    offset += varuint.decode.bytes;
    return vi;
  }
  function readVarSlice() {
    return readSlice(readVarInt());
  }
  function readVector() {
    const count = readVarInt();
    const vector = [];
    for (let i = 0; i < count; i++) vector.push(readVarSlice());
    return vector;
  }
  return readVector();
}
function sighashTypeToString(sighashType) {
  let text =
    sighashType & transaction_1.Transaction.SIGHASH_ANYONECANPAY
      ? 'SIGHASH_ANYONECANPAY | '
      : '';
  const sigMod = sighashType & 0x1f;
  switch (sigMod) {
    case transaction_1.Transaction.SIGHASH_ALL:
      text += 'SIGHASH_ALL';
      break;
    case transaction_1.Transaction.SIGHASH_SINGLE:
      text += 'SIGHASH_SINGLE';
      break;
    case transaction_1.Transaction.SIGHASH_NONE:
      text += 'SIGHASH_NONE';
      break;
  }
  return text;
}
function addNonWitnessTxCache(cache, input, inputIndex) {
  cache.__NON_WITNESS_UTXO_BUF_CACHE[inputIndex] = input.nonWitnessUtxo;
  const tx = transaction_1.Transaction.fromBuffer(input.nonWitnessUtxo);
  cache.__NON_WITNESS_UTXO_TX_CACHE[inputIndex] = tx;
  const self = cache;
  const selfIndex = inputIndex;
  delete input.nonWitnessUtxo;
  Object.defineProperty(input, 'nonWitnessUtxo', {
    enumerable: true,
    get() {
      const buf = self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex];
      const txCache = self.__NON_WITNESS_UTXO_TX_CACHE[selfIndex];
      if (buf !== undefined) {
        return buf;
      } else {
        const newBuf = txCache.toBuffer();
        self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = newBuf;
        return newBuf;
      }
    },
    set(data) {
      self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = data;
    },
  });
}
function inputFinalizeGetAmts(inputs, tx, cache, mustFinalize) {
  let inputAmount = 0;
  inputs.forEach((input, idx) => {
    if (mustFinalize && input.finalScriptSig)
      tx.ins[idx].script = input.finalScriptSig;
    if (mustFinalize && input.finalScriptWitness) {
      tx.ins[idx].witness = scriptWitnessToWitnessStack(
        input.finalScriptWitness,
      );
    }
    if (input.witnessUtxo) {
      inputAmount += input.witnessUtxo.value;
    } else if (input.nonWitnessUtxo) {
      const nwTx = nonWitnessUtxoTxFromCache(cache, input, idx);
      const vout = tx.ins[idx].index;
      const out = nwTx.outs[vout];
      inputAmount += out.value;
    }
  });
  const outputAmount = tx.outs.reduce((total, o) => total + o.value, 0);
  const fee = inputAmount - outputAmount;
  if (fee < 0) {
    throw new Error('Outputs are spending more than Inputs');
  }
  const bytes = tx.virtualSize();
  cache.__FEE = fee;
  cache.__EXTRACTED_TX = tx;
  cache.__FEE_RATE = Math.floor(fee / bytes);
}
function nonWitnessUtxoTxFromCache(cache, input, inputIndex) {
  const c = cache.__NON_WITNESS_UTXO_TX_CACHE;
  if (!c[inputIndex]) {
    addNonWitnessTxCache(cache, input, inputIndex);
  }
  return c[inputIndex];
}
function getScriptFromUtxo(inputIndex, input, cache) {
  const { script } = getScriptAndAmountFromUtxo(inputIndex, input, cache);
  return script;
}
function getScriptAndAmountFromUtxo(inputIndex, input, cache) {
  if (input.witnessUtxo !== undefined) {
    return {
      script: input.witnessUtxo.script,
      value: input.witnessUtxo.value,
    };
  } else if (input.nonWitnessUtxo !== undefined) {
    const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
      cache,
      input,
      inputIndex,
    );
    const o = nonWitnessUtxoTx.outs[cache.__TX.ins[inputIndex].index];
    return { script: o.script, value: o.value };
  } else {
    throw new Error("Can't find pubkey in input without Utxo data");
  }
}
function pubkeyInInput(pubkey, input, inputIndex, cache) {
  const script = getScriptFromUtxo(inputIndex, input, cache);
  const { meaningfulScript } = getMeaningfulScript(
    script,
    inputIndex,
    'input',
    input.redeemScript,
    input.witnessScript,
  );
  return (0, psbtutils_1.pubkeyInScript)(pubkey, meaningfulScript);
}
function pubkeyInOutput(pubkey, output, outputIndex, cache) {
  const script = cache.__TX.outs[outputIndex].script;
  const { meaningfulScript } = getMeaningfulScript(
    script,
    outputIndex,
    'output',
    output.redeemScript,
    output.witnessScript,
  );
  return (0, psbtutils_1.pubkeyInScript)(pubkey, meaningfulScript);
}
function redeemFromFinalScriptSig(finalScript) {
  if (!finalScript) return;
  const decomp = bscript.decompile(finalScript);
  if (!decomp) return;
  const lastItem = decomp[decomp.length - 1];
  if (
    !buffer.Buffer.isBuffer(lastItem) ||
    isPubkeyLike(lastItem) ||
    isSigLike(lastItem)
  )
    return;
  const sDecomp = bscript.decompile(lastItem);
  if (!sDecomp) return;
  return lastItem;
}
function redeemFromFinalWitnessScript(finalScript) {
  if (!finalScript) return;
  const decomp = scriptWitnessToWitnessStack(finalScript);
  const lastItem = decomp[decomp.length - 1];
  if (isPubkeyLike(lastItem)) return;
  const sDecomp = bscript.decompile(lastItem);
  if (!sDecomp) return;
  return lastItem;
}
function compressPubkey(pubkey) {
  if (pubkey.length === 65) {
    const parity = pubkey[64] & 1;
    const newKey = pubkey.slice(0, 33);
    newKey[0] = 2 | parity;
    return newKey;
  }
  return pubkey.slice();
}
function isPubkeyLike(buf) {
  return buf.length === 33 && bscript.isCanonicalPubKey(buf);
}
function isSigLike(buf) {
  return bscript.isCanonicalScriptSignature(buf);
}
function getMeaningfulScript(
  script,
  index,
  ioType,
  redeemScript,
  witnessScript,
) {
  const isP2SH = (0, psbtutils_1.isP2SHScript)(script);
  const isP2SHP2WSH =
    isP2SH && redeemScript && (0, psbtutils_1.isP2WSHScript)(redeemScript);
  const isP2WSH = (0, psbtutils_1.isP2WSHScript)(script);
  if (isP2SH && redeemScript === undefined)
    throw new Error('scriptPubkey is P2SH but redeemScript missing');
  if ((isP2WSH || isP2SHP2WSH) && witnessScript === undefined)
    throw new Error(
      'scriptPubkey or redeemScript is P2WSH but witnessScript missing',
    );
  let meaningfulScript;
  if (isP2SHP2WSH) {
    meaningfulScript = witnessScript;
    checkRedeemScript(index, script, redeemScript, ioType);
    checkWitnessScript(index, redeemScript, witnessScript, ioType);
    checkInvalidP2WSH(meaningfulScript);
  } else if (isP2WSH) {
    meaningfulScript = witnessScript;
    checkWitnessScript(index, script, witnessScript, ioType);
    checkInvalidP2WSH(meaningfulScript);
  } else if (isP2SH) {
    meaningfulScript = redeemScript;
    checkRedeemScript(index, script, redeemScript, ioType);
  } else {
    meaningfulScript = script;
  }
  return {
    meaningfulScript,
    type: isP2SHP2WSH
      ? 'p2sh-p2wsh'
      : isP2SH
      ? 'p2sh'
      : isP2WSH
      ? 'p2wsh'
      : 'raw',
  };
}
function checkInvalidP2WSH(script) {
  if (
    (0, psbtutils_1.isP2WPKH)(script) ||
    (0, psbtutils_1.isP2SHScript)(script)
  ) {
    throw new Error('P2WPKH or P2SH can not be contained within P2WSH');
  }
}
function classifyScript(script) {
  if ((0, psbtutils_1.isP2WPKH)(script)) return 'witnesspubkeyhash';
  if ((0, psbtutils_1.isP2PKH)(script)) return 'pubkeyhash';
  if ((0, psbtutils_1.isP2MS)(script)) return 'multisig';
  if ((0, psbtutils_1.isP2PK)(script)) return 'pubkey';
  return 'nonstandard';
}
function range(n) {
  return [...Array(n).keys()];
}

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	exports.initEccLib =
	  exports.Transaction =
	  exports.opcodes =
	  exports.Psbt =
	  exports.Block =
	  exports.script =
	  exports.payments =
	  exports.networks =
	  exports.crypto =
	  exports.address =
	    void 0;
	const address$1 = address;
	exports.address = address$1;
	const crypto$1 = crypto;
	exports.crypto = crypto$1;
	const networks = networks$1;
	exports.networks = networks;
	const payments = payments$3;
	exports.payments = payments;
	const script$1 = script;
	exports.script = script$1;
	var block_1 = block;
	Object.defineProperty(exports, 'Block', {
	  enumerable: true,
	  get: function () {
	    return block_1.Block;
	  },
	});
	var psbt_1 = psbt$1;
	Object.defineProperty(exports, 'Psbt', {
	  enumerable: true,
	  get: function () {
	    return psbt_1.Psbt;
	  },
	});
	var ops_1 = ops;
	Object.defineProperty(exports, 'opcodes', {
	  enumerable: true,
	  get: function () {
	    return ops_1.OPS;
	  },
	});
	var transaction_1 = transaction;
	Object.defineProperty(exports, 'Transaction', {
	  enumerable: true,
	  get: function () {
	    return transaction_1.Transaction;
	  },
	});
	var ecc_lib_1 = ecc_lib;
	Object.defineProperty(exports, 'initEccLib', {
	  enumerable: true,
	  get: function () {
	    return ecc_lib_1.initEccLib;
	  },
	});
} (src$1));

async function buildPegInTx(config) {
  if (!config.fromBtcAddress || !config.sbtcWalletAddress || !config.stxAddress || !config.utxos)
    throw new Error("wallet or inputs not defined.");
  console.log("utxos --> ", config);
  let network;
  if (config.network === "testnet") {
    network = src$1.networks.testnet;
  } else {
    network = src$1.networks.bitcoin;
  }
  const psbt = new src$1.Psbt({ network });
  let change = 0;
  config.utxos.forEach((utxo) => {
    psbt.addInput({ hash: utxo.txid, index: utxo.vout });
    change += utxo.value;
  });
  const data = buffer.Buffer.from(config.stxAddress, "utf8");
  const embed = src$1.payments.embed({ data: [data] });
  psbt.addOutput({ address: config.sbtcWalletAddress, value: config.pegInAmount });
  if (config.pegInChangeAmount > 0)
    psbt.addOutput({ address: config.fromBtcAddress, value: config.pegInChangeAmount });
  psbt.addOutput({ script: embed.output, value: 0 });
  return psbt.toHex();
}

/* node_modules/svelte-bootstrap-icons/lib/ArrowRepeat.svelte generated by Svelte v3.55.1 */

function create_fragment$6(ctx) {
	let svg;
	let path0;
	let path1;
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	let svg_levels = [
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ width: "16" },
		{ height: "16" },
		{ fill: "currentColor" },
		{ viewBox: "0 0 16 16" },
		/*$$restProps*/ ctx[0]
	];

	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			if (default_slot) default_slot.c();
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l(nodes) {
			svg = claim_svg_element(nodes, "svg", {
				xmlns: true,
				width: true,
				height: true,
				fill: true,
				viewBox: true
			});

			var svg_nodes = children(svg);
			if (default_slot) default_slot.l(svg_nodes);
			path0 = claim_svg_element(svg_nodes, "path", { d: true });
			children(path0).forEach(detach);
			path1 = claim_svg_element(svg_nodes, "path", { "fill-rule": true, d: true });
			children(path1).forEach(detach);
			svg_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(path0, "d", "M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z");
			attr(path1, "fill-rule", "evenodd");
			attr(path1, "d", "M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z");
			set_svg_attributes(svg, svg_data);
			toggle_class(svg, "bi", true);
			toggle_class(svg, "bi-arrow-repeat", true);
		},
		m(target, anchor) {
			insert_hydration(target, svg, anchor);

			if (default_slot) {
				default_slot.m(svg, null);
			}

			append_hydration(svg, path0);
			append_hydration(svg, path1);
			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}

			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
				{ xmlns: "http://www.w3.org/2000/svg" },
				{ width: "16" },
				{ height: "16" },
				{ fill: "currentColor" },
				{ viewBox: "0 0 16 16" },
				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
			]));

			toggle_class(svg, "bi", true);
			toggle_class(svg, "bi-arrow-repeat", true);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	const omit_props_names = [];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
	};

	return [$$restProps, $$scope, slots];
}

class ArrowRepeat extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$6, safe_not_equal, {});
	}
}

/* node_modules/svelte-bootstrap-icons/lib/PatchQuestion.svelte generated by Svelte v3.55.1 */

function create_fragment$5(ctx) {
	let svg;
	let path0;
	let path1;
	let path2;
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	let svg_levels = [
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ width: "16" },
		{ height: "16" },
		{ fill: "currentColor" },
		{ viewBox: "0 0 16 16" },
		/*$$restProps*/ ctx[0]
	];

	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	return {
		c() {
			svg = svg_element("svg");
			if (default_slot) default_slot.c();
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			this.h();
		},
		l(nodes) {
			svg = claim_svg_element(nodes, "svg", {
				xmlns: true,
				width: true,
				height: true,
				fill: true,
				viewBox: true
			});

			var svg_nodes = children(svg);
			if (default_slot) default_slot.l(svg_nodes);
			path0 = claim_svg_element(svg_nodes, "path", { d: true });
			children(path0).forEach(detach);
			path1 = claim_svg_element(svg_nodes, "path", { d: true });
			children(path1).forEach(detach);
			path2 = claim_svg_element(svg_nodes, "path", { d: true });
			children(path2).forEach(detach);
			svg_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(path0, "d", "M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z");
			attr(path1, "d", "m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z");
			attr(path2, "d", "M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z");
			set_svg_attributes(svg, svg_data);
			toggle_class(svg, "bi", true);
			toggle_class(svg, "bi-patch-question", true);
		},
		m(target, anchor) {
			insert_hydration(target, svg, anchor);

			if (default_slot) {
				default_slot.m(svg, null);
			}

			append_hydration(svg, path0);
			append_hydration(svg, path1);
			append_hydration(svg, path2);
			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}

			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
				{ xmlns: "http://www.w3.org/2000/svg" },
				{ width: "16" },
				{ height: "16" },
				{ fill: "currentColor" },
				{ viewBox: "0 0 16 16" },
				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
			]));

			toggle_class(svg, "bi", true);
			toggle_class(svg, "bi-patch-question", true);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	const omit_props_names = [];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
	};

	return [$$restProps, $$scope, slots];
}

class PatchQuestion extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$4, create_fragment$5, safe_not_equal, {});
	}
}

/* src/lib/components/FeeEstimation.svelte generated by Svelte v3.55.1 */

function create_fragment$4(ctx) {
	let div;
	let button;
	let t0;
	let t1;
	let ul;
	let li0;
	let a0;
	let t2;
	let t3_value = /*bcInfo*/ ctx[0].low_fee_per_kb + "";
	let t3;
	let t4;
	let li1;
	let a1;
	let t5;
	let t6_value = /*bcInfo*/ ctx[0].medium_fee_per_kb + "";
	let t6;
	let t7;
	let li2;
	let a2;
	let t8;
	let t9_value = /*bcInfo*/ ctx[0].high_fee_per_kb + "";
	let t9;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button = element("button");
			t0 = text("Choose Fee Rate (sats/kb)");
			t1 = space();
			ul = element("ul");
			li0 = element("li");
			a0 = element("a");
			t2 = text("Low: ");
			t3 = text(t3_value);
			t4 = space();
			li1 = element("li");
			a1 = element("a");
			t5 = text("Low: ");
			t6 = text(t6_value);
			t7 = space();
			li2 = element("li");
			a2 = element("a");
			t8 = text("Low: ");
			t9 = text(t9_value);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			button = claim_element(div_nodes, "BUTTON", {
				class: true,
				type: true,
				id: true,
				"data-bs-toggle": true,
				"aria-expanded": true
			});

			var button_nodes = children(button);
			t0 = claim_text(button_nodes, "Choose Fee Rate (sats/kb)");
			button_nodes.forEach(detach);
			t1 = claim_space(div_nodes);
			ul = claim_element(div_nodes, "UL", { class: true, "aria-labelledby": true });
			var ul_nodes = children(ul);
			li0 = claim_element(ul_nodes, "LI", {});
			var li0_nodes = children(li0);
			a0 = claim_element(li0_nodes, "A", { class: true, href: true });
			var a0_nodes = children(a0);
			t2 = claim_text(a0_nodes, "Low: ");
			t3 = claim_text(a0_nodes, t3_value);
			a0_nodes.forEach(detach);
			li0_nodes.forEach(detach);
			t4 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", {});
			var li1_nodes = children(li1);
			a1 = claim_element(li1_nodes, "A", { class: true, href: true });
			var a1_nodes = children(a1);
			t5 = claim_text(a1_nodes, "Low: ");
			t6 = claim_text(a1_nodes, t6_value);
			a1_nodes.forEach(detach);
			li1_nodes.forEach(detach);
			t7 = claim_space(ul_nodes);
			li2 = claim_element(ul_nodes, "LI", {});
			var li2_nodes = children(li2);
			a2 = claim_element(li2_nodes, "A", { class: true, href: true });
			var a2_nodes = children(a2);
			t8 = claim_text(a2_nodes, "Low: ");
			t9 = claim_text(a2_nodes, t9_value);
			a2_nodes.forEach(detach);
			li2_nodes.forEach(detach);
			ul_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(button, "class", "btn btn-light dropdown-toggle");
			attr(button, "type", "button");
			attr(button, "id", "dropdownMenuButton1");
			attr(button, "data-bs-toggle", "dropdown");
			attr(button, "aria-expanded", "false");
			attr(a0, "class", "dropdown-item");
			attr(a0, "href", "/");
			attr(a1, "class", "dropdown-item");
			attr(a1, "href", "/");
			attr(a2, "class", "dropdown-item");
			attr(a2, "href", "/");
			attr(ul, "class", "dropdown-menu");
			attr(ul, "aria-labelledby", "dropdownMenuButton1");
			attr(div, "class", "dropdown");
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			append_hydration(div, button);
			append_hydration(button, t0);
			append_hydration(div, t1);
			append_hydration(div, ul);
			append_hydration(ul, li0);
			append_hydration(li0, a0);
			append_hydration(a0, t2);
			append_hydration(a0, t3);
			append_hydration(ul, t4);
			append_hydration(ul, li1);
			append_hydration(li1, a1);
			append_hydration(a1, t5);
			append_hydration(a1, t6);
			append_hydration(ul, t7);
			append_hydration(ul, li2);
			append_hydration(li2, a2);
			append_hydration(a2, t8);
			append_hydration(a2, t9);

			if (!mounted) {
				dispose = [
					listen(a0, "click", prevent_default(/*click_handler*/ ctx[2])),
					listen(a1, "click", prevent_default(/*click_handler_1*/ ctx[3])),
					listen(a2, "click", prevent_default(/*click_handler_2*/ ctx[4]))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*bcInfo*/ 1 && t3_value !== (t3_value = /*bcInfo*/ ctx[0].low_fee_per_kb + "")) set_data(t3, t3_value);
			if (dirty & /*bcInfo*/ 1 && t6_value !== (t6_value = /*bcInfo*/ ctx[0].medium_fee_per_kb + "")) set_data(t6, t6_value);
			if (dirty & /*bcInfo*/ 1 && t9_value !== (t9_value = /*bcInfo*/ ctx[0].high_fee_per_kb + "")) set_data(t9, t9_value);
		},
		i: noop$3,
		o: noop$3,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let $sbtcConfig;
	component_subscribe($$self, sbtcConfig, $$value => $$invalidate(5, $sbtcConfig = $$value));
	const dispatch = createEventDispatcher();

	let bcInfo = {
		low_fee_per_kb: 0,
		medium_fee_per_kb: 0,
		high_fee_per_kb: 0
	};

	const selectFee = fee => {
		dispatch("fee_selected", { fee });
	};

	onMount(async () => {
		$$invalidate(0, bcInfo = await fetchFeeEstimate($sbtcConfig.network));
	});

	const click_handler = () => selectFee(bcInfo.low_fee_per_kb);
	const click_handler_1 = () => selectFee(bcInfo.medium_fee_per_kb);
	const click_handler_2 = () => selectFee(bcInfo.high_fee_per_kb);
	return [bcInfo, selectFee, click_handler, click_handler_1, click_handler_2];
}

class FeeEstimation extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3, create_fragment$4, safe_not_equal, {});
	}
}

const FetchUTXOs_svelte_svelte_type_style_lang = '';

/* src/lib/components/FetchUTXOs.svelte generated by Svelte v3.55.1 */

function create_if_block_10(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*errorReason*/ ctx[6]);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t = claim_text(div_nodes, /*errorReason*/ ctx[6]);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "text-warning");
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			append_hydration(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*errorReason*/ 64) set_data(t, /*errorReason*/ ctx[6]);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (119:33) 
function create_if_block_9(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text("No bitcoin (transactions outputs) found at this address - please use an address with some bitcoin balance.");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t = claim_text(div_nodes, "No bitcoin (transactions outputs) found at this address - please use an address with some bitcoin balance.");
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "text-danger");
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			append_hydration(div, t);
		},
		p: noop$3,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (114:8) {#if showUtxos}
function create_if_block_8(ctx) {
	let div2;
	let div0;
	let t0_value = (/*$sbtcConfig*/ ctx[5].utxos?.length || 0) + "";
	let t0;
	let t1;
	let t2;
	let div1;
	let a;
	let t3;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = text(" UTXO(s) Found");
			t2 = space();
			div1 = element("div");
			a = element("a");
			t3 = text("reload");
			this.h();
		},
		l(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", {});
			var div0_nodes = children(div0);
			t0 = claim_text(div0_nodes, t0_value);
			t1 = claim_text(div0_nodes, " UTXO(s) Found");
			div0_nodes.forEach(detach);
			t2 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", {});
			var div1_nodes = children(div1);
			a = claim_element(div1_nodes, "A", { href: true, class: true });
			var a_nodes = children(a);
			t3 = claim_text(a_nodes, "reload");
			a_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			div2_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(a, "href", "/");
			attr(a, "class", "");
			attr(div2, "class", "d-flex justify-content-between text-info");
		},
		m(target, anchor) {
			insert_hydration(target, div2, anchor);
			append_hydration(div2, div0);
			append_hydration(div0, t0);
			append_hydration(div0, t1);
			append_hydration(div2, t2);
			append_hydration(div2, div1);
			append_hydration(div1, a);
			append_hydration(a, t3);

			if (!mounted) {
				dispose = listen(a, "click", prevent_default(/*click_handler*/ ctx[23]));
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$sbtcConfig*/ 32 && t0_value !== (t0_value = (/*$sbtcConfig*/ ctx[5].utxos?.length || 0) + "")) set_data(t0, t0_value);
		},
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			dispose();
		}
	};
}

// (124:4) {#if showStxAddress}
function create_if_block_7(ctx) {
	let div1;
	let div0;
	let label;
	let span0;
	let t0;
	let t1_value = /*$sbtcConfig*/ ctx[5].network + "";
	let t1;
	let t2;
	let t3;
	let span1;
	let patchquestion;
	let t4;
	let input;
	let current;
	let mounted;
	let dispose;
	patchquestion = new PatchQuestion({ props: { width: 30, height: 30 } });

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			label = element("label");
			span0 = element("span");
			t0 = text("Stacks ");
			t1 = text(t1_value);
			t2 = text(" Address:");
			t3 = space();
			span1 = element("span");
			create_component(patchquestion.$$.fragment);
			t4 = space();
			input = element("input");
			this.h();
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			label = claim_element(div0_nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			span0 = claim_element(label_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, "Stacks ");
			t1 = claim_text(span0_nodes, t1_value);
			t2 = claim_text(span0_nodes, " Address:");
			span0_nodes.forEach(detach);
			t3 = claim_space(label_nodes);

			span1 = claim_element(label_nodes, "SPAN", {
				class: true,
				"data-bs-toggle": true,
				"data-bs-placement": true,
				"data-bs-custom-class": true,
				title: true
			});

			var span1_nodes = children(span1);
			claim_component(patchquestion.$$.fragment, span1_nodes);
			span1_nodes.forEach(detach);
			label_nodes.forEach(detach);
			t4 = claim_space(div0_nodes);

			input = claim_element(div0_nodes, "INPUT", {
				type: true,
				id: true,
				class: true,
				autocomplete: true
			});

			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(span1, "class", "pointer text-info");
			attr(span1, "data-bs-toggle", "tooltip");
			attr(span1, "data-bs-placement", "top");
			attr(span1, "data-bs-custom-class", "custom-tooltip");
			attr(span1, "title", "Your Stacks address. The equivalent amount of sBTC will be sent to this wallet");
			attr(label, "for", "transact-path");
			attr(label, "class", "d-flex justify-content-between svelte-3n75fs");
			attr(input, "type", "text");
			attr(input, "id", "from-address");
			attr(input, "class", "form-control form-inline");
			attr(input, "autocomplete", "off");
			attr(div0, "class", "col");
			attr(div1, "class", "row svelte-3n75fs");
		},
		m(target, anchor) {
			insert_hydration(target, div1, anchor);
			append_hydration(div1, div0);
			append_hydration(div0, label);
			append_hydration(label, span0);
			append_hydration(span0, t0);
			append_hydration(span0, t1);
			append_hydration(span0, t2);
			append_hydration(label, t3);
			append_hydration(label, span1);
			mount_component(patchquestion, span1, null);
			append_hydration(div0, t4);
			append_hydration(div0, input);
			set_input_value(input, /*stxAddress*/ ctx[1]);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler_1*/ ctx[24]),
					listen(input, "input", /*input_handler_1*/ ctx[25])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$sbtcConfig*/ 32) && t1_value !== (t1_value = /*$sbtcConfig*/ ctx[5].network + "")) set_data(t1, t1_value);

			if (dirty[0] & /*stxAddress*/ 2 && input.value !== /*stxAddress*/ ctx[1]) {
				set_input_value(input, /*stxAddress*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(patchquestion.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(patchquestion.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(patchquestion);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (135:4) {#if showPegInAmount}
function create_if_block_6(ctx) {
	let div4;
	let div3;
	let label;
	let span0;
	let t0;
	let t1;
	let span1;
	let patchquestion;
	let t2;
	let input;
	let t3;
	let div2;
	let div0;
	let t4;
	let t5;
	let div1;
	let a;
	let t6;
	let current;
	let mounted;
	let dispose;
	patchquestion = new PatchQuestion({ props: { width: 30, height: 30 } });

	return {
		c() {
			div4 = element("div");
			div3 = element("div");
			label = element("label");
			span0 = element("span");
			t0 = text("Peg In Amount / Sats:");
			t1 = space();
			span1 = element("span");
			create_component(patchquestion.$$.fragment);
			t2 = space();
			input = element("input");
			t3 = space();
			div2 = element("div");
			div0 = element("div");
			t4 = text("Tx fees are additional.");
			t5 = space();
			div1 = element("div");
			a = element("a");
			t6 = text("max");
			this.h();
		},
		l(nodes) {
			div4 = claim_element(nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			label = claim_element(div3_nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			span0 = claim_element(label_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, "Peg In Amount / Sats:");
			span0_nodes.forEach(detach);
			t1 = claim_space(label_nodes);

			span1 = claim_element(label_nodes, "SPAN", {
				class: true,
				"data-bs-toggle": true,
				"data-bs-placement": true,
				"data-bs-custom-class": true,
				title: true
			});

			var span1_nodes = children(span1);
			claim_component(patchquestion.$$.fragment, span1_nodes);
			span1_nodes.forEach(detach);
			label_nodes.forEach(detach);
			t2 = claim_space(div3_nodes);

			input = claim_element(div3_nodes, "INPUT", {
				type: true,
				id: true,
				class: true,
				autocomplete: true
			});

			t3 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", {});
			var div0_nodes = children(div0);
			t4 = claim_text(div0_nodes, "Tx fees are additional.");
			div0_nodes.forEach(detach);
			t5 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", {});
			var div1_nodes = children(div1);
			a = claim_element(div1_nodes, "A", { href: true, class: true });
			var a_nodes = children(a);
			t6 = claim_text(a_nodes, "max");
			a_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			div2_nodes.forEach(detach);
			div3_nodes.forEach(detach);
			div4_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(span1, "class", "pointer text-info");
			attr(span1, "data-bs-toggle", "tooltip");
			attr(span1, "data-bs-placement", "top");
			attr(span1, "data-bs-custom-class", "custom-tooltip");
			attr(span1, "title", "The amount of Bitcoin you want to swap for sBTC. The bitcoin is locked in the protocol and you convert your sBTC back to Bitcoin when you peg out.");
			attr(label, "for", "transact-path");
			attr(label, "class", "d-flex justify-content-between svelte-3n75fs");
			attr(input, "type", "number");
			attr(input, "id", "from-address");
			attr(input, "class", "form-control");
			attr(input, "autocomplete", "off");
			attr(a, "href", "/");
			attr(a, "class", "");
			attr(div2, "class", "d-flex justify-content-between text-info");
			attr(div3, "class", "col-12");
			attr(div4, "class", "row svelte-3n75fs");
		},
		m(target, anchor) {
			insert_hydration(target, div4, anchor);
			append_hydration(div4, div3);
			append_hydration(div3, label);
			append_hydration(label, span0);
			append_hydration(span0, t0);
			append_hydration(label, t1);
			append_hydration(label, span1);
			mount_component(patchquestion, span1, null);
			append_hydration(div3, t2);
			append_hydration(div3, input);
			set_input_value(input, /*pegInAmount*/ ctx[2]);
			append_hydration(div3, t3);
			append_hydration(div3, div2);
			append_hydration(div2, div0);
			append_hydration(div0, t4);
			append_hydration(div2, t5);
			append_hydration(div2, div1);
			append_hydration(div1, a);
			append_hydration(a, t6);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler_2*/ ctx[26]),
					listen(input, "input", /*input_handler_2*/ ctx[27]),
					listen(a, "click", prevent_default(/*click_handler_1*/ ctx[28]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*pegInAmount*/ 4 && to_number(input.value) !== /*pegInAmount*/ ctx[2]) {
				set_input_value(input, /*pegInAmount*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(patchquestion.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(patchquestion.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div4);
			destroy_component(patchquestion);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (150:4) {#if pegInAmount > 0}
function create_if_block_3(ctx) {
	let div1;
	let div0;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block_4, create_if_block_5];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*showFeeCalculation*/ ctx[11]) return 0;
		if (/*showEstimates*/ ctx[12]) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type_1(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if (if_block) if_block.c();
			this.h();
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if (if_block) if_block.l(div0_nodes);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div0, "class", "col-12");
			attr(div1, "class", "row svelte-3n75fs");
		},
		m(target, anchor) {
			insert_hydration(target, div1, anchor);
			append_hydration(div1, div0);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div0, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(div0, null);
				} else {
					if_block = null;
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}
		}
	};
}

// (161:32) 
function create_if_block_5(ctx) {
	let label;
	let t0;
	let t1;
	let feeestimation;
	let current;
	feeestimation = new FeeEstimation({});
	feeestimation.$on("fee_selected", /*feeSelected*/ ctx[17]);

	return {
		c() {
			label = element("label");
			t0 = text("Select Fee Rate for Fee Calculation");
			t1 = space();
			create_component(feeestimation.$$.fragment);
			this.h();
		},
		l(nodes) {
			label = claim_element(nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			t0 = claim_text(label_nodes, "Select Fee Rate for Fee Calculation");
			label_nodes.forEach(detach);
			t1 = claim_space(nodes);
			claim_component(feeestimation.$$.fragment, nodes);
			this.h();
		},
		h() {
			attr(label, "for", "transact-path");
			attr(label, "class", "mb-3 svelte-3n75fs");
		},
		m(target, anchor) {
			insert_hydration(target, label, anchor);
			append_hydration(label, t0);
			insert_hydration(target, t1, anchor);
			mount_component(feeestimation, target, anchor);
			current = true;
		},
		p: noop$3,
		i(local) {
			if (current) return;
			transition_in(feeestimation.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(feeestimation.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(label);
			if (detaching) detach(t1);
			destroy_component(feeestimation, detaching);
		}
	};
}

// (153:8) {#if showFeeCalculation}
function create_if_block_4(ctx) {
	let label;
	let t0;
	let t1;
	let div2;
	let div0;
	let t2;
	let t3;
	let t4;
	let div1;
	let a;
	let t5;
	let t6;
	let div3;
	let t7;
	let t8;
	let t9;
	let div4;
	let t10;
	let t11;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			t0 = text("Tx Fee Calculation (sats/kb)");
			t1 = space();
			div2 = element("div");
			div0 = element("div");
			t2 = text("Using fee rate: ");
			t3 = text(/*feeToUse*/ ctx[3]);
			t4 = space();
			div1 = element("div");
			a = element("a");
			t5 = text("reset");
			t6 = space();
			div3 = element("div");
			t7 = text("Peg In: ");
			t8 = text(/*pegInAmount*/ ctx[2]);
			t9 = space();
			div4 = element("div");
			t10 = text("Change: ");
			t11 = text(/*change*/ ctx[8]);
			this.h();
		},
		l(nodes) {
			label = claim_element(nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			t0 = claim_text(label_nodes, "Tx Fee Calculation (sats/kb)");
			label_nodes.forEach(detach);
			t1 = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", {});
			var div0_nodes = children(div0);
			t2 = claim_text(div0_nodes, "Using fee rate: ");
			t3 = claim_text(div0_nodes, /*feeToUse*/ ctx[3]);
			div0_nodes.forEach(detach);
			t4 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", {});
			var div1_nodes = children(div1);
			a = claim_element(div1_nodes, "A", { href: true });
			var a_nodes = children(a);
			t5 = claim_text(a_nodes, "reset");
			a_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			div2_nodes.forEach(detach);
			t6 = claim_space(nodes);
			div3 = claim_element(nodes, "DIV", {});
			var div3_nodes = children(div3);
			t7 = claim_text(div3_nodes, "Peg In: ");
			t8 = claim_text(div3_nodes, /*pegInAmount*/ ctx[2]);
			div3_nodes.forEach(detach);
			t9 = claim_space(nodes);
			div4 = claim_element(nodes, "DIV", {});
			var div4_nodes = children(div4);
			t10 = claim_text(div4_nodes, "Change: ");
			t11 = claim_text(div4_nodes, /*change*/ ctx[8]);
			div4_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(label, "for", "transact-path");
			attr(label, "class", "mb-3 svelte-3n75fs");
			attr(a, "href", "/");
			attr(div2, "class", "d-flex justify-content-between");
		},
		m(target, anchor) {
			insert_hydration(target, label, anchor);
			append_hydration(label, t0);
			insert_hydration(target, t1, anchor);
			insert_hydration(target, div2, anchor);
			append_hydration(div2, div0);
			append_hydration(div0, t2);
			append_hydration(div0, t3);
			append_hydration(div2, t4);
			append_hydration(div2, div1);
			append_hydration(div1, a);
			append_hydration(a, t5);
			insert_hydration(target, t6, anchor);
			insert_hydration(target, div3, anchor);
			append_hydration(div3, t7);
			append_hydration(div3, t8);
			insert_hydration(target, t9, anchor);
			insert_hydration(target, div4, anchor);
			append_hydration(div4, t10);
			append_hydration(div4, t11);

			if (!mounted) {
				dispose = listen(a, "click", prevent_default(/*click_handler_2*/ ctx[29]));
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*feeToUse*/ 8) set_data(t3, /*feeToUse*/ ctx[3]);
			if (dirty[0] & /*pegInAmount*/ 4) set_data(t8, /*pegInAmount*/ ctx[2]);
			if (dirty[0] & /*change*/ 256) set_data(t11, /*change*/ ctx[8]);
		},
		i: noop$3,
		o: noop$3,
		d(detaching) {
			if (detaching) detach(label);
			if (detaching) detach(t1);
			if (detaching) detach(div2);
			if (detaching) detach(t6);
			if (detaching) detach(div3);
			if (detaching) detach(t9);
			if (detaching) detach(div4);
			mounted = false;
			dispose();
		}
	};
}

// (168:4) {#if changeErrorReason}
function create_if_block_2$1(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*changeErrorReason*/ ctx[7]);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t = claim_text(div_nodes, /*changeErrorReason*/ ctx[7]);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "text-danger");
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			append_hydration(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*changeErrorReason*/ 128) set_data(t, /*changeErrorReason*/ ctx[7]);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (169:4) {#if showButton}
function create_if_block_1$1(ctx) {
	let div1;
	let div0;
	let button;
	let t;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			button = element("button");
			t = text("Build Peg In Tx");
			this.h();
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			button = claim_element(div0_nodes, "BUTTON", { type: true, class: true });
			var button_nodes = children(button);
			t = claim_text(button_nodes, "Build Peg In Tx");
			button_nodes.forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(button, "type", "button");
			attr(button, "class", "btn btn-primary");
			attr(div0, "class", "col");
			attr(div1, "class", "row svelte-3n75fs");
		},
		m(target, anchor) {
			insert_hydration(target, div1, anchor);
			append_hydration(div1, div0);
			append_hydration(div0, button);
			append_hydration(button, t);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler_3*/ ctx[30]);
				mounted = true;
			}
		},
		p: noop$3,
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			dispose();
		}
	};
}

// (176:4) {#if showHexTx}
function create_if_block$1(ctx) {
	let div1;
	let div0;
	let h2;
	let t0;
	let t1;
	let p;
	let t2;
	let t3;
	let textarea;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			h2 = element("h2");
			t0 = text("Transaction");
			t1 = space();
			p = element("p");
			t2 = text("Paste this transaction into your wallet..");
			t3 = space();
			textarea = element("textarea");
			this.h();
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h2 = claim_element(div0_nodes, "H2", {});
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Transaction");
			h2_nodes.forEach(detach);
			t1 = claim_space(div0_nodes);
			p = claim_element(div0_nodes, "P", {});
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, "Paste this transaction into your wallet..");
			p_nodes.forEach(detach);
			t3 = claim_space(div0_nodes);
			textarea = claim_element(div0_nodes, "TEXTAREA", { rows: true, style: true });
			children(textarea).forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(textarea, "rows", "10");
			set_style(textarea, "width", "100%");
			textarea.readOnly = true;
			textarea.value = /*hexTx*/ ctx[4];
			attr(div0, "class", "col");
			attr(div1, "class", "row svelte-3n75fs");
		},
		m(target, anchor) {
			insert_hydration(target, div1, anchor);
			append_hydration(div1, div0);
			append_hydration(div0, h2);
			append_hydration(h2, t0);
			append_hydration(div0, t1);
			append_hydration(div0, p);
			append_hydration(p, t2);
			append_hydration(div0, t3);
			append_hydration(div0, textarea);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*hexTx*/ 16) {
				textarea.value = /*hexTx*/ ctx[4];
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

function create_fragment$3(ctx) {
	let div2;
	let t0;
	let div1;
	let div0;
	let label;
	let span0;
	let t1;
	let t2_value = /*$sbtcConfig*/ ctx[5].network + "";
	let t2;
	let t3;
	let t4;
	let span1;
	let patchquestion;
	let t5;
	let input;
	let t6;
	let t7;
	let t8;
	let t9;
	let t10;
	let t11;
	let t12;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*errorReason*/ ctx[6] && create_if_block_10(ctx);
	patchquestion = new PatchQuestion({ props: { width: 30, height: 30 } });

	function select_block_type(ctx, dirty) {
		if (/*showUtxos*/ ctx[15]) return create_if_block_8;
		if (/*bitcoinAddress*/ ctx[0]) return create_if_block_9;
	}

	let current_block_type = select_block_type(ctx);
	let if_block1 = current_block_type && current_block_type(ctx);
	let if_block2 = /*showStxAddress*/ ctx[14] && create_if_block_7(ctx);
	let if_block3 = /*showPegInAmount*/ ctx[13] && create_if_block_6(ctx);
	let if_block4 = /*pegInAmount*/ ctx[2] > 0 && create_if_block_3(ctx);
	let if_block5 = /*changeErrorReason*/ ctx[7] && create_if_block_2$1(ctx);
	let if_block6 = /*showButton*/ ctx[10] && create_if_block_1$1(ctx);
	let if_block7 = /*showHexTx*/ ctx[9] && create_if_block$1(ctx);

	return {
		c() {
			div2 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			div1 = element("div");
			div0 = element("div");
			label = element("label");
			span0 = element("span");
			t1 = text("Bitcoin ");
			t2 = text(t2_value);
			t3 = text(" Address:");
			t4 = space();
			span1 = element("span");
			create_component(patchquestion.$$.fragment);
			t5 = space();
			input = element("input");
			t6 = space();
			if (if_block1) if_block1.c();
			t7 = space();
			if (if_block2) if_block2.c();
			t8 = space();
			if (if_block3) if_block3.c();
			t9 = space();
			if (if_block4) if_block4.c();
			t10 = space();
			if (if_block5) if_block5.c();
			t11 = space();
			if (if_block6) if_block6.c();
			t12 = space();
			if (if_block7) if_block7.c();
			this.h();
		},
		l(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			if (if_block0) if_block0.l(div2_nodes);
			t0 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			label = claim_element(div0_nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			span0 = claim_element(label_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t1 = claim_text(span0_nodes, "Bitcoin ");
			t2 = claim_text(span0_nodes, t2_value);
			t3 = claim_text(span0_nodes, " Address:");
			span0_nodes.forEach(detach);
			t4 = claim_space(label_nodes);

			span1 = claim_element(label_nodes, "SPAN", {
				class: true,
				"data-bs-toggle": true,
				"data-bs-placement": true,
				"data-bs-custom-class": true,
				title: true
			});

			var span1_nodes = children(span1);
			claim_component(patchquestion.$$.fragment, span1_nodes);
			span1_nodes.forEach(detach);
			label_nodes.forEach(detach);
			t5 = claim_space(div0_nodes);

			input = claim_element(div0_nodes, "INPUT", {
				type: true,
				id: true,
				class: true,
				autocomplete: true
			});

			t6 = claim_space(div0_nodes);
			if (if_block1) if_block1.l(div0_nodes);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			t7 = claim_space(div2_nodes);
			if (if_block2) if_block2.l(div2_nodes);
			t8 = claim_space(div2_nodes);
			if (if_block3) if_block3.l(div2_nodes);
			t9 = claim_space(div2_nodes);
			if (if_block4) if_block4.l(div2_nodes);
			t10 = claim_space(div2_nodes);
			if (if_block5) if_block5.l(div2_nodes);
			t11 = claim_space(div2_nodes);
			if (if_block6) if_block6.l(div2_nodes);
			t12 = claim_space(div2_nodes);
			if (if_block7) if_block7.l(div2_nodes);
			div2_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(span1, "class", "pointer text-info");
			attr(span1, "data-bs-toggle", "tooltip");
			attr(span1, "data-bs-placement", "top");
			attr(span1, "data-bs-custom-class", "custom-tooltip");
			attr(span1, "title", "Your bitcoin address. Funds you send from this wallet will be exchanged for sBTC");
			attr(label, "for", "transact-path");
			attr(label, "class", "d-flex justify-content-between svelte-3n75fs");
			attr(input, "type", "text");
			attr(input, "id", "from-address");
			attr(input, "class", "form-control");
			attr(input, "autocomplete", "off");
			attr(div0, "class", "col");
			attr(div1, "class", "row svelte-3n75fs");
			attr(div2, "class", "card border p-4");
		},
		m(target, anchor) {
			insert_hydration(target, div2, anchor);
			if (if_block0) if_block0.m(div2, null);
			append_hydration(div2, t0);
			append_hydration(div2, div1);
			append_hydration(div1, div0);
			append_hydration(div0, label);
			append_hydration(label, span0);
			append_hydration(span0, t1);
			append_hydration(span0, t2);
			append_hydration(span0, t3);
			append_hydration(label, t4);
			append_hydration(label, span1);
			mount_component(patchquestion, span1, null);
			append_hydration(div0, t5);
			append_hydration(div0, input);
			set_input_value(input, /*bitcoinAddress*/ ctx[0]);
			append_hydration(div0, t6);
			if (if_block1) if_block1.m(div0, null);
			append_hydration(div2, t7);
			if (if_block2) if_block2.m(div2, null);
			append_hydration(div2, t8);
			if (if_block3) if_block3.m(div2, null);
			append_hydration(div2, t9);
			if (if_block4) if_block4.m(div2, null);
			append_hydration(div2, t10);
			if (if_block5) if_block5.m(div2, null);
			append_hydration(div2, t11);
			if (if_block6) if_block6.m(div2, null);
			append_hydration(div2, t12);
			if (if_block7) if_block7.m(div2, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[21]),
					listen(input, "input", /*input_handler*/ ctx[22])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*errorReason*/ ctx[6]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_10(ctx);
					if_block0.c();
					if_block0.m(div2, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if ((!current || dirty[0] & /*$sbtcConfig*/ 32) && t2_value !== (t2_value = /*$sbtcConfig*/ ctx[5].network + "")) set_data(t2, t2_value);

			if (dirty[0] & /*bitcoinAddress*/ 1 && input.value !== /*bitcoinAddress*/ ctx[0]) {
				set_input_value(input, /*bitcoinAddress*/ ctx[0]);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if (if_block1) if_block1.d(1);
				if_block1 = current_block_type && current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div0, null);
				}
			}

			if (/*showStxAddress*/ ctx[14]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*showStxAddress*/ 16384) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_7(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div2, t8);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*showPegInAmount*/ ctx[13]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty[0] & /*showPegInAmount*/ 8192) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_6(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(div2, t9);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}

			if (/*pegInAmount*/ ctx[2] > 0) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty[0] & /*pegInAmount*/ 4) {
						transition_in(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block_3(ctx);
					if_block4.c();
					transition_in(if_block4, 1);
					if_block4.m(div2, t10);
				}
			} else if (if_block4) {
				group_outros();

				transition_out(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				check_outros();
			}

			if (/*changeErrorReason*/ ctx[7]) {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block_2$1(ctx);
					if_block5.c();
					if_block5.m(div2, t11);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}

			if (/*showButton*/ ctx[10]) {
				if (if_block6) {
					if_block6.p(ctx, dirty);
				} else {
					if_block6 = create_if_block_1$1(ctx);
					if_block6.c();
					if_block6.m(div2, t12);
				}
			} else if (if_block6) {
				if_block6.d(1);
				if_block6 = null;
			}

			if (/*showHexTx*/ ctx[9]) {
				if (if_block7) {
					if_block7.p(ctx, dirty);
				} else {
					if_block7 = create_if_block$1(ctx);
					if_block7.c();
					if_block7.m(div2, null);
				}
			} else if (if_block7) {
				if_block7.d(1);
				if_block7 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(patchquestion.$$.fragment, local);
			transition_in(if_block2);
			transition_in(if_block3);
			transition_in(if_block4);
			current = true;
		},
		o(local) {
			transition_out(patchquestion.$$.fragment, local);
			transition_out(if_block2);
			transition_out(if_block3);
			transition_out(if_block4);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (if_block0) if_block0.d();
			destroy_component(patchquestion);

			if (if_block1) {
				if_block1.d();
			}

			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
			if (if_block7) if_block7.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let showUtxos;
	let showStxAddress;
	let showPegInAmount;
	let showEstimates;
	let showFeeCalculation;
	let showButton;
	let showHexTx;
	let $sbtcConfig;
	component_subscribe($$self, sbtcConfig, $$value => $$invalidate(5, $sbtcConfig = $$value));
	let bitcoinAddress = $sbtcConfig.fromBtcAddress;
	let stxAddress = $sbtcConfig.stxAddress;
	let pegInAmount = $sbtcConfig.pegInAmount;
	let errorReason;
	let changeErrorReason;

	const changeStxAddress = () => {
		if (!stxAddress) {
			$$invalidate(6, errorReason = 'Please enter a valid stacks blockchain ' + $sbtcConfig.network + ' address');
			return;
		}

		try {
			const decoded = decodeStacksAddress(stxAddress);

			if ($sbtcConfig.network === 'testnet' && decoded[0] !== 26) {
				$$invalidate(6, errorReason = 'Please enter a valid stacks blockchain ' + $sbtcConfig.network + ' address');
				return;
			}

			if ($sbtcConfig.network === 'mainnet' && decoded[0] !== 22) {
				$$invalidate(6, errorReason = 'Please enter a valid stacks blockchain ' + $sbtcConfig.network + ' address');
				return;
			}

			const conf = $sbtcConfig;
			conf.stxAddress = stxAddress;
			sbtcConfig.update(() => conf);
		} catch(err) {
			$$invalidate(6, errorReason = 'Please enter a valid stacks blockchain ' + $sbtcConfig.network + ' address');
		}
	};

	const maxPeg = maxCommit($sbtcConfig.utxos);
	let feeToUse = 0;
	let change = 0;

	const feeSelected = event => {
		$$invalidate(3, feeToUse = event.detail.fee);
		$$invalidate(8, change = maxPeg - pegInAmount - feeToUse);

		if (change < 0) {
			$$invalidate(7, changeErrorReason = 'Max peg in allowed at this fee rate is ' + (maxPeg - feeToUse));
		}

		const conf = $sbtcConfig;
		conf.pegInChangeAmount = Number(change);
		sbtcConfig.set(conf);
	};

	const changePegIn = maxValue => {
		$$invalidate(6, errorReason = undefined);
		$$invalidate(7, changeErrorReason = undefined);
		const maxPeg = maxCommit($sbtcConfig.utxos);

		if (pegInAmount > maxPeg) {
			$$invalidate(6, errorReason = 'Cannot commit more BTC then is available at your address');
			return;
		}

		const conf = $sbtcConfig;

		if (maxValue) {
			$$invalidate(2, pegInAmount = maxPeg);
		}

		$$invalidate(8, change = maxPeg - pegInAmount - feeToUse);

		if (change < 0) {
			$$invalidate(7, changeErrorReason = 'Max peg in allowed at this fee rate is ' + (maxPeg - feeToUse));
		}

		conf.pegInChangeAmount = Number(change);
		conf.pegInAmount = Number(pegInAmount);
		sbtcConfig.set(conf);
	};

	const configureUTXOs = async force => {
		$$invalidate(6, errorReason = undefined);

		if (!bitcoinAddress || bitcoinAddress.length < 10) {
			$$invalidate(6, errorReason = 'Invalid address');
			return;
		}

		if (!force && $sbtcConfig.fromBtcAddress === bitcoinAddress && $sbtcConfig.utxos) {
			return;
		}

		try {
			const conf = $sbtcConfig;
			let result = await fetchAddressDetails($sbtcConfig.network, bitcoinAddress);
			conf.fromBtcAddress = bitcoinAddress;
			conf.addressDetails = result;
			result = await fetchUTXOs($sbtcConfig.network, bitcoinAddress);
			console.log('utxos --> ', result.utxos);
			conf.utxos = result;
			sbtcConfig.update(() => conf);
		} catch(err) {
			$$invalidate(6, errorReason = err || 'Error - is the address a valid');
		}
	};

	let hexTx;

	const buildTx = async () => {
		$$invalidate(4, hexTx = await buildPegInTx($sbtcConfig));
	};

	function input_input_handler() {
		bitcoinAddress = this.value;
		$$invalidate(0, bitcoinAddress);
	}

	const input_handler = () => configureUTXOs(false);
	const click_handler = () => configureUTXOs(true);

	function input_input_handler_1() {
		stxAddress = this.value;
		$$invalidate(1, stxAddress);
	}

	const input_handler_1 = () => changeStxAddress();

	function input_input_handler_2() {
		pegInAmount = to_number(this.value);
		$$invalidate(2, pegInAmount);
	}

	const input_handler_2 = () => changePegIn(false);
	const click_handler_1 = () => changePegIn(true);

	const click_handler_2 = () => {
		$$invalidate(3, feeToUse = 0);
		$$invalidate(4, hexTx = undefined);
		$$invalidate(7, changeErrorReason = undefined);
	};

	const click_handler_3 = () => buildTx();

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*bitcoinAddress, $sbtcConfig*/ 33) {
			$$invalidate(15, showUtxos = bitcoinAddress && $sbtcConfig.utxos?.length > 0);
		}

		if ($$self.$$.dirty[0] & /*bitcoinAddress, $sbtcConfig*/ 33) {
			$$invalidate(14, showStxAddress = bitcoinAddress && $sbtcConfig.utxos?.length > 0);
		}

		if ($$self.$$.dirty[0] & /*bitcoinAddress, stxAddress*/ 3) {
			$$invalidate(13, showPegInAmount = bitcoinAddress && stxAddress);
		}

		if ($$self.$$.dirty[0] & /*bitcoinAddress, stxAddress*/ 3) {
			$$invalidate(12, showEstimates = bitcoinAddress && stxAddress);
		}

		if ($$self.$$.dirty[0] & /*feeToUse*/ 8) {
			$$invalidate(11, showFeeCalculation = feeToUse > 0);
		}

		if ($$self.$$.dirty[0] & /*$sbtcConfig, feeToUse, bitcoinAddress, stxAddress, pegInAmount*/ 47) {
			$$invalidate(10, showButton = $sbtcConfig.pegInChangeAmount >= 0 && feeToUse > 0 && bitcoinAddress && stxAddress && pegInAmount > 0);
		}

		if ($$self.$$.dirty[0] & /*hexTx*/ 16) {
			$$invalidate(9, showHexTx = hexTx && hexTx.length > 0);
		}
	};

	return [
		bitcoinAddress,
		stxAddress,
		pegInAmount,
		feeToUse,
		hexTx,
		$sbtcConfig,
		errorReason,
		changeErrorReason,
		change,
		showHexTx,
		showButton,
		showFeeCalculation,
		showEstimates,
		showPegInAmount,
		showStxAddress,
		showUtxos,
		changeStxAddress,
		feeSelected,
		changePegIn,
		configureUTXOs,
		buildTx,
		input_input_handler,
		input_handler,
		click_handler,
		input_input_handler_1,
		input_handler_1,
		input_input_handler_2,
		input_handler_2,
		click_handler_1,
		click_handler_2,
		click_handler_3
	];
}

class FetchUTXOs extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2, create_fragment$3, safe_not_equal, {}, null, [-1, -1]);
	}
}

/* src/lib/components/PegIn.svelte generated by Svelte v3.55.1 */

function create_fragment$2(ctx) {
	let div;
	let fetchutxos;
	let current;
	fetchutxos = new FetchUTXOs({});

	return {
		c() {
			div = element("div");
			create_component(fetchutxos.$$.fragment);
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			claim_component(fetchutxos.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			mount_component(fetchutxos, div, null);
			current = true;
		},
		p: noop$3,
		i(local) {
			if (current) return;
			transition_in(fetchutxos.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(fetchutxos.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(fetchutxos);
		}
	};
}

class PegIn extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$2, safe_not_equal, {});
	}
}

/* src/lib/components/PegOut.svelte generated by Svelte v3.55.1 */

function create_fragment$1(ctx) {
	let div;
	let p;
	let t;

	return {
		c() {
			div = element("div");
			p = element("p");
			t = text("Peg out coming soon !");
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			p = claim_element(div_nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, "Peg out coming soon !");
			p_nodes.forEach(detach);
			div_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			append_hydration(div, p);
			append_hydration(p, t);
		},
		p: noop$3,
		i: noop$3,
		o: noop$3,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$1($$self) {
	return [];
}

class PegOut extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
	}
}

const _page_svelte_svelte_type_style_lang = '';

/* src/routes/+page.svelte generated by Svelte v3.55.1 */

function create_else_block_2(ctx) {
	let t;

	return {
		c() {
			t = text("Out");
		},
		l(nodes) {
			t = claim_text(nodes, "Out");
		},
		m(target, anchor) {
			insert_hydration(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (13:52) {#if pegIn}
function create_if_block_2(ctx) {
	let t;

	return {
		c() {
			t = text("In");
		},
		l(nodes) {
			t = claim_text(nodes, "In");
		},
		m(target, anchor) {
			insert_hydration(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (17:36) {:else}
function create_else_block_1(ctx) {
	let t;

	return {
		c() {
			t = text("sBTC for BTC");
		},
		l(nodes) {
			t = claim_text(nodes, "sBTC for BTC");
		},
		m(target, anchor) {
			insert_hydration(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (17:13) {#if pegIn}
function create_if_block_1(ctx) {
	let t;

	return {
		c() {
			t = text("BTC for sBTC");
		},
		l(nodes) {
			t = claim_text(nodes, "BTC for sBTC");
		},
		m(target, anchor) {
			insert_hydration(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (23:4) {:else}
function create_else_block(ctx) {
	let div;
	let pegout;
	let current;
	pegout = new PegOut({});

	return {
		c() {
			div = element("div");
			create_component(pegout.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(pegout.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "d-flex justify-content-center");
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			mount_component(pegout, div, null);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(pegout.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(pegout.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(pegout);
		}
	};
}

// (19:4) {#if pegIn}
function create_if_block(ctx) {
	let div;
	let pegin;
	let current;
	pegin = new PegIn({});

	return {
		c() {
			div = element("div");
			create_component(pegin.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(pegin.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "d-flex justify-content-center");
		},
		m(target, anchor) {
			insert_hydration(target, div, anchor);
			mount_component(pegin, div, null);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(pegin.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(pegin.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(pegin);
		}
	};
}

function create_fragment(ctx) {
	let section;
	let div3;
	let div2;
	let div1;
	let h1;
	let span0;
	let t0;
	let t1;
	let t2;
	let div0;
	let a;
	let arrowrepeat;
	let t3;
	let h2;
	let t4;
	let t5;
	let t6;
	let p;
	let span1;
	let t7;
	let t8_value = /*$sbtcConfig*/ ctx[1].sbtcWalletAddress + "";
	let t8;
	let t9;
	let current_block_type_index;
	let if_block2;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*pegIn*/ ctx[0]) return create_if_block_2;
		return create_else_block_2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	arrowrepeat = new ArrowRepeat({ props: { width: 40, height: 40 } });

	function select_block_type_1(ctx, dirty) {
		if (/*pegIn*/ ctx[0]) return create_if_block_1;
		return create_else_block_1;
	}

	let current_block_type_1 = select_block_type_1(ctx);
	let if_block1 = current_block_type_1(ctx);
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type_2(ctx, dirty) {
		if (/*pegIn*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_2(ctx);
	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			section = element("section");
			div3 = element("div");
			div2 = element("div");
			div1 = element("div");
			h1 = element("h1");
			span0 = element("span");
			t0 = text("sBTC");
			t1 = text(" Peg ");
			if_block0.c();
			t2 = space();
			div0 = element("div");
			a = element("a");
			create_component(arrowrepeat.$$.fragment);
			t3 = space();
			h2 = element("h2");
			t4 = text("Swap ");
			if_block1.c();
			t5 = text(" - no middle men!");
			t6 = space();
			p = element("p");
			span1 = element("span");
			t7 = text("SBTC Wallet: ");
			t8 = text(t8_value);
			t9 = space();
			if_block2.c();
			this.h();
		},
		l(nodes) {
			section = claim_element(nodes, "SECTION", { class: true });
			var section_nodes = children(section);
			div3 = claim_element(section_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h1 = claim_element(div1_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			span0 = claim_element(h1_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, "sBTC");
			span0_nodes.forEach(detach);
			t1 = claim_text(h1_nodes, " Peg ");
			if_block0.l(h1_nodes);
			h1_nodes.forEach(detach);
			t2 = claim_space(div1_nodes);

			div0 = claim_element(div1_nodes, "DIV", {
				"data-bs-toggle": true,
				"data-bs-placement": true,
				"data-bs-custom-class": true,
				title: true
			});

			var div0_nodes = children(div0);
			a = claim_element(div0_nodes, "A", { href: true });
			var a_nodes = children(a);
			claim_component(arrowrepeat.$$.fragment, a_nodes);
			a_nodes.forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			t3 = claim_space(div2_nodes);
			h2 = claim_element(div2_nodes, "H2", {});
			var h2_nodes = children(h2);
			t4 = claim_text(h2_nodes, "Swap ");
			if_block1.l(h2_nodes);
			t5 = claim_text(h2_nodes, " - no middle men!");
			h2_nodes.forEach(detach);
			t6 = claim_space(div2_nodes);
			p = claim_element(div2_nodes, "P", {});
			var p_nodes = children(p);
			span1 = claim_element(p_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t7 = claim_text(span1_nodes, "SBTC Wallet: ");
			t8 = claim_text(span1_nodes, t8_value);
			span1_nodes.forEach(detach);
			p_nodes.forEach(detach);
			t9 = claim_space(div2_nodes);
			if_block2.l(div2_nodes);
			div2_nodes.forEach(detach);
			div3_nodes.forEach(detach);
			section_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(span0, "class", "strokeme-white");
			attr(h1, "class", "text-white svelte-1lxjbmv");
			attr(a, "href", "/");
			attr(div0, "data-bs-toggle", "tooltip");
			attr(div0, "data-bs-placement", "top");
			attr(div0, "data-bs-custom-class", "custom-tooltip");
			attr(div0, "title", "Toggle pegging in / pegging out");
			attr(div1, "class", "d-flex justify-content-between");
			attr(span1, "class", "text-white");
			attr(div2, "class", "card-width");
			attr(div3, "class", "my-4 p-4");
			attr(section, "class", "bg-dark svelte-1lxjbmv");
		},
		m(target, anchor) {
			insert_hydration(target, section, anchor);
			append_hydration(section, div3);
			append_hydration(div3, div2);
			append_hydration(div2, div1);
			append_hydration(div1, h1);
			append_hydration(h1, span0);
			append_hydration(span0, t0);
			append_hydration(h1, t1);
			if_block0.m(h1, null);
			append_hydration(div1, t2);
			append_hydration(div1, div0);
			append_hydration(div0, a);
			mount_component(arrowrepeat, a, null);
			append_hydration(div2, t3);
			append_hydration(div2, h2);
			append_hydration(h2, t4);
			if_block1.m(h2, null);
			append_hydration(h2, t5);
			append_hydration(div2, t6);
			append_hydration(div2, p);
			append_hydration(p, span1);
			append_hydration(span1, t7);
			append_hydration(span1, t8);
			append_hydration(div2, t9);
			if_blocks[current_block_type_index].m(div2, null);
			current = true;

			if (!mounted) {
				dispose = listen(a, "click", prevent_default(/*click_handler*/ ctx[2]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(h1, null);
				}
			}

			if (current_block_type_1 !== (current_block_type_1 = select_block_type_1(ctx))) {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(h2, t5);
				}
			}

			if ((!current || dirty & /*$sbtcConfig*/ 2) && t8_value !== (t8_value = /*$sbtcConfig*/ ctx[1].sbtcWalletAddress + "")) set_data(t8, t8_value);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_2(ctx);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block2 = if_blocks[current_block_type_index];

				if (!if_block2) {
					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block2.c();
				}

				transition_in(if_block2, 1);
				if_block2.m(div2, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(arrowrepeat.$$.fragment, local);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(arrowrepeat.$$.fragment, local);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			if_block0.d();
			destroy_component(arrowrepeat);
			if_block1.d();
			if_blocks[current_block_type_index].d();
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $sbtcConfig;
	component_subscribe($$self, sbtcConfig, $$value => $$invalidate(1, $sbtcConfig = $$value));
	let pegIn = true;
	const click_handler = () => $$invalidate(0, pegIn = !pegIn);
	return [pegIn, $sbtcConfig, click_handler];
}

class Page extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export { Page as default };
