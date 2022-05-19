export type RpcMethods =

    // General utilities
    'getblockchainparams' |
    'gethealthcheck' |
    'getruntimeparams' |
    'setruntimeparam' |
    'getinfo' |
    'getinitstatus' |
    'help' |
    'stop' |

    // Managing wallet addresses
    'addmultisigaddress' |
    'getaddresses' |
    'getnewaddress' |
    'importaddress' |
    'listaddresses' |

    // Working with non-wallet addresses
    'createkeypairs' |
    'createmultisig' |
    'validateaddress' |

    // Permissions management
    'grant' |
    'grantfrom' |
    'grantwithdata' |
    'grantwithdatafrom' |
    'listpermissions' |
    'revoke' |
    'revokefrom' |
    'verifypermission' |

    // Asset management
    'getassetinfo' |
    'gettokeninfo' |
    'issue' |
    'issuefrom' |
    'issuemore' |
    'issuemorefrom' |
    'issuetoken' |
    'issuetokenfrom' |
    'listassetissues' |
    'listassets' |
    'update' |
    'updatefrom' |

    // Querying wallet balances and transactions
    'getaddressbalances' |
    'getaddresstransaction' |
    'getmultibalances' |
    'gettokenbalances' |
    'gettotalbalances' |
    'getwallettransaction' |
    'listaddresstransactions' |
    'listwallettransactions' |

    // Sending one-way payments
    'send' |
    'sendasset' |
    'sendassetfrom' |
    'sendfrom' |
    'sendwithdata' |
    'sendwithdatafrom' |

    // Atomic exchange transactions
    'appendrawexchange' |
    'completerawexchange' |
    'createrawexchange' |
    'decoderawexchange' |
    'disablerawtransaction' |
    'preparelockunspent' |
    'preparelockunspentfrom' |

    // Stream management
    'create' |
    'createfrom' |
    'getstreaminfo' |
    'liststreams' |

    // Publishing stream items
    'publish' |
    'publishfrom' |
    'publishmulti' |
    'publishmultifrom' |

    // Managing stream and asset subscriptions
    'subscribe' |
    'trimsubscribe' |
    'unsubscribe' |

    // Querying subscribed assets
    'getassettransaction' |
    'listassettransactions' |

    // Querying subscribed streams
    'getstreamitem' |
    'getstreamkeysummary' |
    'getstreampublishersummary' |
    'gettxoutdata' |
    'liststreamblockitems' |
    'liststreamkeyitems' |
    'liststreamkeys' |
    'liststreamitems' |
    'liststreampublisheritems' |
    'liststreampublishers' |
    'liststreamqueryitems' |
    'liststreamtxitems' |

    // Controlling off-chain data
    'purgepublisheditems' |
    'purgestreamitems' |
    'retrievestreamitems' |
    
    // Managing wallet unspent outputs
    'combineunspent' |
    'listlockunspent' |
    'listunspent' |
    'lockunspent' |

    // Working with raw transactions
    'appendrawchange' |
    'appendrawdata' |
    'appendrawtransaction' |
    'createrawtransaction' |
    'createrawsendfrom' |
    'decoderawtransaction' |
    'sendrawtransaction' |
    'signrawtransaction' |

    // Peer-to-peer connections
    'addnode' |
    'getaddednodeinfo' |
    'getnetworkinfo' |
    'getpeerinfo' |
    'liststorednodes' |
    'ping' |
    'storenode' |

    // Messaging signing and verification
    'signmessage' |
    'verifymessage' |

    // Querying the blockchain
    'getblock' |
    'getblockchaininfo' |
    'getblockhash' |
    'getchaintotals' |
    'getlastblockinfo' |
    'getmempoolinfo' |
    'getrawmempool' |
    'getrawtransaction' |
    'gettxout' |
    'listblocks' |
    'listminers' |

    // Binary cache
    'createbinarycache' |
    'appendbinarycache' |
    'deletebinarycache' |
    'txouttobinarycache' |

    // Advanced wallet control
    'backupwallet' |
    'dumpprivkey' |
    'dumpwallet' |
    'encryptwallet' |
    'getwalletinfo' |
    'importprivkey' |
    'importwallet' |
    'walletlock' |
    'walletpassphrase' |
    'walletpassphrasechange' |

    // Working with feeds
    'addtofeed' |
    'createfeed' |
    'datareftobinarycache' |
    'deletefeed' |
    'getdatarefdata' |
    'listfeeds' |
    'pausefeed' |
    'purgefeed' |
    'resumefeed' |
    'updatefeed' |

    // Smart filters and upgrades
    'approvefrom' |
    // 'create' |
    // 'createfrom' |
    'getfiltercode' |
    'liststreamfilters' |
    'listtxfilters' |
    'listupgrades' |
    'runstreamfilter' |
    'runtxfilter' |
    'teststreamfilter' |
    'testtxfilter' |

    // Libraries and variables
    'addlibraryupdate' |
    'addlibraryupdatefrom' |
    'getlibrarycode' |
    'getvariablehistory' |
    'getvariableinfo' |
    'getvariablevalue' |
    'listlibraries' |
    'setvariablevalue' |
    'setvariablevaluefrom' |
    'testlibrary' |

    // Advanced node control
    'clearmempool' |
    'getchunkqueueinfo' |
    'getchunkqueuetotals' |
    'pause' |
    'resume' |
    'setlastblock' |

    // MultiChain Enterprise licensing
    'getlicenserequest' |
    'activatelicense' |
    'listlicenses' |
    'transferlicense'

export interface IBlockchainParams {
    chainprotocol: string
    chaindescription: string
    rootstreamname: string
    rootstreamopen: boolean
    chainistestnet: boolean
    targetblocktime: number
    maximumblocksize: number
    maximumchunksize: number
    maximumchunkcount: number
    defaultnetworkport: number
    defaultrpcport: number
    anyonecanconnect: boolean
    anyonecansend: boolean
    anyonecanreceive: boolean
    anyonecanreceiveempty: boolean
    anyonecancreate: boolean
    anyonecanissue: boolean
    anyonecanmine: boolean
    anyonecanactivate: boolean
    anyonecanadmin: boolean
    supportminerprecheck: boolean
    allowarbitraryoutputs: boolean
    allowp2shoutputs: boolean
    allowmultisigoutputs: boolean
    setupfirstblocks: number
    miningdiversity: number
    adminconsensusupgrade: number
    adminconsensustxfilter: number
    adminconsensusadmin: number
    adminconsensusactivate: number
    adminconsensusmine: number
    adminconsensuscreate: number
    adminconsensusissue: number
    lockadminminerounds: number
    miningrequirespeers: boolean
    mineemptyrounds: number
    miningturnover: number
    firstblockreward: number
    initialblockreward: number
    rewardhalvinginterval: number
    rewardspendabledelay: number
    minimumperoutput: number
    maximumperoutput: number
    minimumoffchainfee: number
    minimumrelayfee: number
    nativecurrencymultiple: number
    skippowcheck: boolean
    powminimumbits: number
    targetadjustfreq: number
    allowmindifficultyblocks: boolean
    onlyacceptstdtxs: boolean
    maxstdtxsize: number
    maxstdopreturnscount: number
    maxstdopreturnsize: number
    maxstdopdropscount: number
    maxstdelementsize: number
    chainname: string
    protocolversion: number
    networkmessagestart: string
    addresspubkeyhashversion: string
    addressscripthashversion: string
    privatekeyversion: string
    addresschecksumvalue: string
    genesispubkey: string
    genesisversion: number
    genesistimestamp: number
    genesisnbits: number
    genesisnonce: number
    genesispubkeyhash: string
    genesishash: string
    chainparamshash: string
}

export interface IBlockchainParamsDisplayName {
    'chain-protocol': string
    'chain-description': string
    'root-stream-name': string
    'root-stream-open': boolean
    'chain-is-testnet': boolean
    'target-block-time': number
    'maximum-block-size': number
    'maximum-chunk-size': number
    'maximum-chunk-count': number
    'default-network-port': number
    'default-rpc-port': number
    'anyone-can-connect': boolean
    'anyone-can-send': boolean
    'anyone-can-receive': boolean
    'anyone-can-receive-empty': boolean
    'anyone-can-create': boolean
    'anyone-can-issue': boolean
    'anyone-can-mine': boolean
    'anyone-can-activate': boolean
    'anyone-can-admin': boolean
    'support-miner-precheck': boolean
    'allow-arbitrary-outputs': boolean
    'allow-p2sh-outputs': boolean
    'allow-multisig-outputs': boolean
    'setup-first-blocks': number
    'mining-diversity': number
    'admin-consensus-upgrade': number
    'admin-consensus-txfilter': number
    'admin-consensus-admin': number
    'admin-consensus-activate': number
    'admin-consensus-mine': number
    'admin-consensus-create': number
    'admin-consensus-issue': number
    'lock-admin-mine-rounds': number
    'mining-requires-peers': boolean
    'mine-empty-rounds': number
    'mining-turnover': number
    'first-block-reward': number
    'initial-block-reward': number
    'reward-halving-interval': number
    'reward-spendable-delay': number
    'minimum-per-output': number
    'maximum-per-output': number
    'minimum-offchain-fee': number
    'minimum-relay-fee': number
    'native-currency-multiple': number
    'skip-pow-check': boolean
    'pow-minimum-bits': number
    'target-adjust-freq': number
    'allow-min-difficulty-blocks': boolean
    'only-accept-std-txs': boolean
    'max-std-tx-size': number
    'max-std-op-returns-count': number
    'max-std-op-return-size': number
    'max-std-op-drops-count': number
    'max-std-element-size': number
    'chain-name': string
    'protocol-version': number
    'network-message-start': string
    'address-pubkeyhash-version': string
    'address-scripthash-version': string
    'private-key-version': string
    'address-checksum-value': string
    'genesis-pubkey': string
    'genesis-version': number
    'genesis-timestamp': number
    'genesis-nbits': number
    'genesis-nonce': number
    'genesis-pubkey-hash': string
    'genesis-hash': string
    'chain-params-hash': string
}

export interface IRunTimeParams {
    port: number
    reindex: boolean
    rescan: boolean   
    txindex: boolean
    autocombineminconf: number
    autocombinemininputs: number
    autocombinemaxinputs: number
    autocombinedelay: number
    autocombinesuspend: number
    autosubscribe: string
    handshakelocal: string
    bantx: string
    lockblock: string
    hideknownopdrops: boolean
    maxshowndata: number
    maxqueryscanitems: number
    v1apicompatible: boolean
    miningrequirespeers: boolean
    mineemptyrounds: number
    miningturnover: number
    lockadminminerounds: number
    gen: boolean
    genproclimit: number
    lockinlinemetadata: boolean
    acceptfiltertimeout: number
    sendfiltertimeout: number
}

export type RunTimeParams = 'acceptfiltertimeout' | 'autosubscribe' | 'bantx' | 'handshakelocal' | 'hideknownopdrops' | 'lockadminminerounds' | 'lockblock' | 'lockinlinemetadata' | 'maxshowndata' | 'maxqueryscanitems' | 'mineemptyrounds' | 'miningrequirespeers' | 'miningturnover' | 'sendfiltertimeout'

export interface IInfo {
    version: string
    nodeversion: number
    edition: string
    protocolversion: number
    chainname: string
    description: string
    protocol: string
    port: number
    setupblocks: number
    nodeaddress: string
    burnaddress: string
    incomingpaused: boolean
    miningpaused: boolean
    offchainpaused: boolean
    walletversion: number
    balance: number
    walletdbversion: number
    reindex: boolean
    blocks: number
    chainrewards: number
    streams: number
    timeoffset: number
    connections: number
    proxy: string
    difficulty: number
    testnet: boolean
    keypoololdest: number
    keypoolsize: number
    paytxfee: number
    relayfee: number
    errors: string
}

export interface IInitStatus {
    version: string
    nodeversion: number
    initialized: boolean
}

export interface IAddressInfo
{
    address: Address
    ismine: boolean
}

export interface IAddressInfoVerbose
{
    address: Address
    ismine: boolean
    iswatchonly: boolean
    isscript: boolean
    pubkey: PubKey
    iscompressed: boolean
    account: string
    synchronized: boolean
}

export interface IKeyPair {
    address: Address
    pubkey: PubKey
    privkey: PrivKey
}

export type Address = string
export type PubKey = string
export type PrivKey = string

export interface IAddressValidation {
    isvalid: boolean
    address: string
    ismine: boolean
}

export interface IP2SH {
    address: Address
    redeemScript: string
}

export type Permissions = 'connect' | 'send' | 'receive' | 'issue' | 'mine' | 'admin' | 'activate' | 'create'

export type AssetPermission = { identifier: string, permission: Permissions }

export type txid = string