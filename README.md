# sbtc-bridge

## Introduction

sBTC bridge interracts with the sBTC protocol to provide decentralised,
permissionless deposits and withdrawals of Bitcoin to layer 2 - via Stacks.

[sbtc.tech](https://sbtc.tech).

## Development

```bash
node -v
v19.7.0
npm install
npm run dev
# or
npm run dev -- --open
```

## SDK

The bridge application has 3 main components;

1. [web application](https://github.com/stacks-network/sbtc-bridge-web)
2. [rest api](https://github.com/stacks-network/sbtc-bridge-api)
3. [sBTC library](https://github.com/stacks-network/sbtc-bridge-api)

for more information about how to use these is your own application see the
[sBTC-bridge-lib README](https://github.com/stacks-network/sbtc-bridge-api/blob/main/sbtc-bridge-lib/README.md)

### Deployment

First build the application;

```bash
npm run build
```

Note you can preview the production build locally with `npm run preview`.

## Testnet

App has been tested with the Electrum wallet. On MacOs open Electrum wallet on testnet;

```bash
/Applications/Electrum.app/Contents/MacOS/run_electrum --testnet
```

To load the transaction;

1. Tools
2. Load Transaction
3. From text

Paste in the hex generated by the app. Check the tx fees. Sign and broadcast the tx.

### Wallet Support

The application is currently working with Electrum 4.3.3 and Bitcoin Core v22.

Support is planned for Ledger and Trezor.

#### Ledger Live

Ledger Live is the interface for Ledger hardware wallets

Note this is NOT Ledger Connect - Ledger Connect is  browser extension only supporting Safari and Ethereum/Polygon chains.

Test Mode

1. Download
2. Ledger on Bitcoin testnet
3. Enable developer mode

Links

- [Ledger Live](https://www.ledger.com/ledger-live)
- [Ledger on Testnet](https://developers.ledger.com/docs/non-dapp/howto/test/)
- [Article on Testnet Setup](https://coinguides.org/ledger-testnet/)

#### Trezor Suite

Trezor Suite is the interface for Trezor hardware wallets

- [Trezor Suite Download](https://trezor.io/trezor-suite)
- [Trezor Bridge Download](https://suite.trezor.io/web/bridge/)
- [Using OP_RETURN with Trezor](https://trezor.io/learn/a/use-op_return-in-trezor-suite-app)

Trezor hardware wallet can be paired with Electrum

Transaction signing error: -22: TX decode failed. Make sure the tx has at least one input.

#### Github Pages

Requires access to github settings and for a branch `gh-pages` to be created from `main`.
Then run;

```bash
node ./gh-pages.js
```

This pushes the contents of `build/` to the `gh-pages` branch. Github Pages
has been configured on the repository to serve the application from;

```bash
https://trust-machines.github.io/sbtc-bridge
```

The basic strategy is to deploy the `distribution files` to a branch called `gh-pages` and then configure Github Pages to serve the application from there. Details on Github Pages and Svelte
applications can be found in these guides.

- [Github Pages how to](https://docs.github.com/en/pages)
- [Svelte + Github Pages how to](https://github.com/sveltejs/kit/tree/master/packages/adapter-static#spa-mode)

#### Linode / Digital Ocean

Create your preferred target environment (Debian VM + Nginx for example).
Update the deploy script with your config and add your public ssh key to known hosts.
Then run;

```bash
bash ./deploy-remote.sh
```

### Packaging

The application can be packaged and uploaded to the npm registry;

```bash
./node_modules/.bin/svelte-kit package
cd package
npm publish
```

## Production Deployment

# Setup CORS policy for Google Storage Bucket using gcloud:
gsutil cors set gcp-cors.json gs://sbtc-bridge-web
# Verify
gcloud storage buckets describe gs://sbtc-bridge-web --format="default(cors)"

docker build --file Dockerfile --progress=plain --output build .

VERSION="$(date +%s)-$(git rev-parse --short HEAD)"
BUCKET="gs://sbtc-bridge-web/$VERSION"

# Copy over old version
gcloud storage rm --recursive "gs://sbtc-bridge-web/**"
gcloud storage cp --recursive build/* "gs://sbtc-bridge-web/"

# Copy new version
gcloud storage cp --recursive build/* "$BUCKET/"

# Set the correct Cache-Control metadata for the new version:
gsutil -m setmeta -h "Cache-Control:public, max-age=3600" "$BUCKET/**"

# Use gcloud to update the load balancer bucket location

# replace path
gcloud compute url-maps edit sbtc-bridge-web-load-balancer --global 

# gcloud compute url-maps invalidate-cdn-cache sbtc-bridge-web-load-balancer --path "/*" --global

# Removing old versions
# gcloud storage rm --recursive "gs://sbtc-bridge-web/$PREV_VERSION/"
```
gsutil -m rm -r gs://[BUCKET_NAME]/versions/[OLD_VERSION_NUMBER]
```
