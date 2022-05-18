export type Methods =

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

