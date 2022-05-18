import * as http from 'http'
import * as https from 'https'

export type IConnection = {
    host: string,
    port: number,
    user?: string,
    pass?: string,
    servername?: string,
    protocol?: 'http' | 'https',
    key?: any,
    cert?: any,
    ca?: any,
    ciphers?: any,
    passphrase?: any,
    agent?: any,
    pfx?: any,
    [key: string]: any
}

export default class Client {

    private connection: IConnection

    constructor(connection: IConnection) {
        this.connection = connection
    }

    private preCall(method: RpcMethods, params: string[]) {
        const payload = {
            method: method, 
            params: params || [], 
            id: 1, 
            jsonrpc: '2.0'
        }
        const body = JSON.stringify(payload);
        let options: any = {
            host: this.connection.host, 
            port: this.connection.port, 
            method: "POST", 
            key: this.connection.key,
            cert: this.connection.cert,
            agent: this.connection.agent,
            pfx: this.connection.pfx,
            passphrase: this.connection.passphrase,
            ca: this.connection.ca,
            ciphers: this.connection.ciphers,
            rejectUnauthorized: this.connection.rejectUnauthorized,
            secureProtocol: this.connection.secureProtocol,
            servername: this.connection.servername,
            headers: {
                'Content-Type': 'application/json', 
                'Content-Length': Buffer.byteLength(body, 'utf8'),
                host: this.connection.host
            }
        }
        if (this.connection.user && this.connection.pass) {
            options.auth = this.connection.user + ":" + this.connection.pass
        }
        return options
    }

    public call(method: RpcMethods, params: string[], callback: (error?: Error, result?: any) => void) {
        let request: http.ClientRequest
        const options = this.preCall(method, params)

        if (this.connection.protocol === 'https') request = https.request(options)
        else request = http.request(options)

        let data: any

        request.on('error', (error: Error) => {
            callback(error)
        })

        request.on('response', (response: http.IncomingMessage) => {

            response.on('data', (chunk: any) => data += chunk)

            response.on('end', () => {

                if (response.statusCode === 200) {
                    const json: any = JSON.parse(data)
                    return callback(null, json.result)
                }

                else if (response.headers['content-type'] === "application/json") {
                    const json: any = JSON.parse(data)
                    return callback(json.error)
                }

                else {
                    return callback(data)
                }
            })

        })

        request.end()
    }

    public async callAsync(method: RpcMethods, params: string[]) {
        return new Promise<any>((resolve, reject) => {
            this.call(method, params, (error?: Error, result?: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

}

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

