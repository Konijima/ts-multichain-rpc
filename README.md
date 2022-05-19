# ts-multichain-rpc
A typescript wrapper for `multichain` rpc.  
  
[![npm version](https://badge.fury.io/js/ts-multichain-rpc.svg)](https://badge.fury.io/js/ts-multichain-rpc)

## Install
```bash
npm i ts-multichain-rpc
```

## Usage
```ts
import { Client } from 'ts-multichain-rpc'

const client = new Client({
  host: '127.0.0.1',
  port: 8384,
  user: 'multichainrpc',
  pass: 'my_rpc_password'
})

async function getinfo() {
    return await client.call('getinfo')
}

async function getblock(hashOrHeight: string | number) {
    return new Promise((resolve, reject) => {
      client.call('getblock', [hashOrHeight])
        .then((result) => resolve(result))
        .catch((error) => reject(error))
    })
}
```

## Commands
[MultiChain JSON-RPC API commands](https://www.multichain.com/developers/json-rpc-api/)

## Method Implemented
```js
// General utilities
'getblockchainparams'
'gethealthcheck'
'getruntimeparams'
'setruntimeparam'
'getinfo'
'getinitstatus'
'help'
'stop'

// Managing wallet addresses
'addmultisigaddress'
'getaddresses'
'getnewaddress'
'importaddress'
'listaddresses'

// Working with non-wallet addresses
'createkeypairs'
'createmultisig'
'validateaddress'

// Permissions management
'grant'
```