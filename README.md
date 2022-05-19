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

## API Progression
List of the methods/commands that have been implemented into the Client class.  
If methods is not yet implemented it can still be called using `client.call()`.
### General utilities
- [X] getblockchainparams
- [X] gethealthcheck
- [X] getruntimeparams
- [X] setruntimeparam
- [X] getinfo
- [X] getinitstatus
- [X] help
- [X] stop

### Managing wallet addresses
- [X] addmultisigaddress
- [X] getaddresses
- [X] getnewaddress
- [X] importaddress
- [X] listaddresses

### Working with non-wallet addresses
- [X] createkeypairs
- [X] createmultisig
- [X] validateaddress

### Permissions management
- [X] grant
grantfrom
- [] grantwithdata
- [] grantwithdatafrom
- [] listpermissions
- [] revoke
- [] revokefrom
- [] verifypermission

### Asset management
- [] getassetinfo
- [] gettokeninfo
- [] issue
- [] issuefrom
- [] issuemore
- [] issuemorefrom
- [] issuetoken
- [] issuetokenfrom
- [] listassetissues
- [] listassets
- [] update
- [] updatefrom

### Querying wallet balances and transactions
- [] getaddressbalances
- [] getaddresstransaction
- [] getmultibalances
- [] gettokenbalances
- [] gettotalbalances
- [] getwallettransaction
- [] listaddresstransactions
- [] listwallettransactions

### Sending one-way payments
- [] send
- [] sendasset
- [] sendassetfrom
- [] sendfrom
- [] sendwithdata
- [] sendwithdatafrom

### Atomic exchange transactions
- [] appendrawexchange
- [] completerawexchange
- [] createrawexchange
- [] decoderawexchange
- [] disablerawtransaction
- [] preparelockunspent
- [] preparelockunspentfrom

### Stream management
- [] create
- [] createfrom
- [] getstreaminfo
- [] liststreams

### Publishing stream items
- [] publish
- [] publishfrom
- [] publishmulti
- [] publishmultifrom

### Managing stream and asset subscriptions
- [] subscribe
- [] trimsubscribe
- [] unsubscribe

### Querying subscribed assets
- [] getassettransaction
- [] listassettransactions

### Querying subscribed streams
- [] getstreamitem
- [] getstreamkeysummary
- [] getstreampublishersummary
- [] gettxoutdata
- [] liststreamblockitems
- [] liststreamkeyitems
- [] liststreamkeys
- [] liststreamitems
- [] liststreampublisheritems
- [] liststreampublishers
- [] liststreamqueryitems
- [] liststreamtxitems

### Controlling off-chain data
- [] purgepublisheditems
- [] purgestreamitems
- [] retrievestreamitems
- [] 
### Managing wallet unspent outputs
- [] combineunspent
- [] listlockunspent
- [] listunspent
- [] lockunspent

### Working with raw transactions
- [] appendrawchange
- [] appendrawdata
- [] appendrawtransaction
- [] createrawtransaction
- [] createrawsendfrom
- [] decoderawtransaction
- [] sendrawtransaction
- [] signrawtransaction

### Peer-to-peer connections
- [] addnode
- [] getaddednodeinfo
- [] getnetworkinfo
- [] getpeerinfo
- [] liststorednodes
- [] ping
- [] storenode

### Messaging signing and verification
- [] signmessage
- [] verifymessage

### Querying the blockchain
- [] getblock
- [] getblockchaininfo
- [] getblockhash
- [] getchaintotals
- [] getlastblockinfo
- [] getmempoolinfo
- [] getrawmempool
- [] getrawtransaction
- [] gettxout
- [] listblocks
- [] listminers

### Binary cache
- [] createbinarycache
- [] appendbinarycache
- [] deletebinarycache
- [] txouttobinarycache

### Advanced wallet control
- [] backupwallet
- [] dumpprivkey
- [] dumpwallet
- [] encryptwallet
- [] getwalletinfo
- [] importprivkey
- [] importwallet
- [] walletlock
- [] walletpassphrase
- [] walletpassphrasechange

### Working with feeds
- [] addtofeed
- [] createfeed
- [] datareftobinarycache
- [] deletefeed
- [] getdatarefdata
- [] listfeeds
- [] pausefeed
- [] purgefeed
- [] resumefeed
- [] updatefeed

### Smart filters and upgrades
- [] approvefrom
- [] create
- [] createfrom
- [] getfiltercode
- [] liststreamfilters
- [] listtxfilters
- [] listupgrades
- [] runstreamfilter
- [] runtxfilter
- [] teststreamfilter
- [] testtxfilter

### Libraries and variables
- [] addlibraryupdate
- [] addlibraryupdatefrom
- [] getlibrarycode
- [] getvariablehistory
- [] getvariableinfo
- [] getvariablevalue
- [] listlibraries
- [] setvariablevalue
- [] setvariablevaluefrom
- [] testlibrary

### Advanced node control
- [] clearmempool
- [] getchunkqueueinfo
- [] getchunkqueuetotals
- [] pause
- [] resume
- [] setlastblock

### MultiChain Enterprise licensing
- [] getlicenserequest
- [] activatelicense
- [] listlicenses
- [] transferlicense