import * as http from 'http'
import * as https from 'https'
import { Address, IAddressInfo, IAddressInfoVerbose, IAddressValidation, IBlockchainParams, IBlockchainParamsDisplayName, IInfo, IInitStatus, IKeyPair, IP2SH, IRunTimeParams, PrivKey, PubKey, RpcMethods, RunTimeParams } from './types'

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
    rejectUnauthorized?: any,
    secureProtocol?: any,
    [key: string]: any
}

export default class Client {

    private connection: IConnection

    constructor(connection: IConnection) {
        this.connection = connection
    }

    private _preCall(method: RpcMethods, params: any[]) {
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
        return { payload, options }
    }

    private _call(method: RpcMethods, params: any[], callback: (error?: Error, result?: any) => void) {
        let request: http.ClientRequest
        const { payload, options } = this._preCall(method, params)

        if (this.connection.protocol === 'https') request = https.request(options)
        else request = http.request(options)

        request.write(JSON.stringify(payload))

        request.on('error', (error: Error) => {
            callback(error)
        })

        request.on('response', (response: http.IncomingMessage) => {

            let data = ''

            response.on('data', (chunk: any) => {
                data += chunk
            })

            response.on('end', () => {

                if (response.statusCode === 200) {
                    const json: any = JSON.parse(data)
                    return callback(undefined, json.result)
                }

                else if (response.headers['content-type'] === "application/json") {
                    const json: any = JSON.parse(data)
                    return callback(json.error)
                }

                else if (response.statusCode === 401) {
                    return callback(new Error('Unauthorized'))
                }

                else {
                    return callback(undefined, data)
                }
                
            })

        })

        request.end()
    }

    /**
     * @async call a multichain rpc method
     * @param method multichain rpc method to call
     * @param params an array of parameter
     */
    public async call(method: RpcMethods, params: any[] = []) {
        return new Promise<any>((resolve, reject) => {
            this._call(method, params, (error?: Error, result?: any) => {
                if (error) return reject(error)
                else return resolve(result)
            })
        })
    }

    /**
     * Returns a list of values of this blockchain’s parameters.
     * @param displayName set whether parameters are shown with display names (with hyphens) or canonical names (without hyphens).
     * @param withUpgrade set whether to show the chain’s latest parameters (after any upgrades) or its original parameters (in the genesis block). Note that as of MultiChain 1.0.1, only the protocol version can be upgraded.
     * @returns Return as IBlockchainParamsDisplayName if displayName is true or as IBlockchainParams if false
     */
    public async getblockchainparams(displayName: boolean = true, withUpgrade: boolean = true) {
        let result = await this.call('getblockchainparams', [ displayName, withUpgrade ])
        return (displayName) ? result as IBlockchainParamsDisplayName : result as IBlockchainParams
    }

    /**
     * Available in MultiChain Enterprise only.
     * Retrieves a health check for the node. This command can be sent on the regular JSON-RPC API port or on a separate health checking port that will respond even if all main API threads are busy – 
     * @see healthcheckport
     */
    public async gethealthcheck() {
        return await this.call('gethealthcheck')
    }

    /**
     * Returns a selection of this node’s runtime parameters, which are set when the node starts up. Some parameters can be modified while MultiChain is running using setruntimeparam.
     */
    public async getruntimeparams() {
        return await this.call('getruntimeparams') as IRunTimeParams
    }

    /**
     * Sets the runtime parameter param to value and immediately applies the change.
     * Use the `storeruntimeparams` runtime parameter to persistently store these changes for future launches of MultiChain.
     * @param param the parameter to set
     * @param value the new value
     * @see [MultiChain runtime parameters](https://www.multichain.com/developers/runtime-parameters/)
     */
    public async setruntimeparam(param: RunTimeParams, value: string | number | boolean) {
        return await this.call('setruntimeparam', [param, value])
    }

    /**
     * Returns general information about this node and blockchain. MultiChain adds some fields to Bitcoin Core’s response, giving the blockchain’s chainname, description, protocol, peer-to-peer port. There are also incomingpaused and miningpaused fields – see the pause command. The burnaddress is an address with no known private key, to which assets can be sent to make them provably unspendable. The nodeaddress can be passed to other nodes for connecting. The setupblocks field gives the length in blocks of the setup phase in which some consensus constraints are not applied.
     */
    public async getinfo() {
        return await this.call('getinfo') as IInfo
    }

    /**
     * Returns information about the node’s initialization status, during its initial connection to a new blockchain. This is relevant if the retryinittime runtime parameter is used.
     */
    public async getinitstatus() {
        return await this.call('getinitstatus') as IInitStatus
    }

    /**
     * Returns a list of available API commands, including MultiChain-specific commands.
     */
    public async help() {
        return await this.call('help')
    }

    /**
     * Shuts down the this blockchain node, i.e. stops the multichaind process.
     */
    public async stop() {
        return await this.call('stop')
    }

    /**
     * Creates a pay-to-scripthash (P2SH) multisig address and adds it to the wallet. Funds sent to this address can only be spent by transactions signed by nrequired of the specified keys. Each key can be a full public key, or an address if the corresponding key is in the node’s wallet. (Public keys for a wallet’s addresses can be obtained using the getaddresses call with verbose=true.) Returns the P2SH address.
     * @param nrequired The number of required signatures out of the n keys or addresses.
     * @param addresses A JSON array of addresses or hex-encoded public keys
     * @param account Optional, An account to assign the addresses to.
     */
    public async addmultisigaddress(nrequired: number, addresses: Address[], account?: string) {
        let params: any[] = [nrequired, addresses]
        if (account) params.push(account)
        return await this.call('addmultisigaddress', params)
    }

    /**
     * Returns a list of addresses in this node’s wallet. Set verbose to true to get more information about each address, formatted like the output of the validateaddress command. For more control see the new listaddresses command.
     */
    public async getaddresses(verbose: boolean = false): Promise<Address[] | IAddressInfoVerbose[]> {
        const result = await this.call('getaddresses', [verbose])
        return (verbose) ? result as IAddressInfoVerbose[] : result as Address[]
    }

    /**
     * Returns a new address whose private key is added to the wallet.
     */
    public async getnewaddress() {
        return await this.call('getnewaddress') as Address
    }

    /**
     * Adds address (or an array of addresses) to the wallet, without an associated private key. This creates one or more watch-only addresses, whose activity and balance can be retrieved via various APIs (e.g. with the includeWatchOnly parameter), but whose funds cannot be spent by this node. The rescan parameter controls whether and how the blockchain is rescanned for transactions relating to all wallet addresses, including these new ones. Pass true to rescan the entire chain, false to skip rescanning, and from version 1.0.5, a positive integer to rescan from that block number or a negative integer to rescan that many recent blocks.
     * @returns Returns null if successful.
     */
    public async importaddress(address: Address | Address[], label: string = '', rescan: boolean = true) {
        return await this.call('importaddress', [address, label, rescan])
    }

    /**
     * Returns information about the addresses in the wallet. Provide one or more addresses (comma-delimited or as an array) to retrieve information about specific addresses only, or use * for all addresses in the wallet. Use count and start to retrieve part of the list only, with negative start values (like the default) indicating the most recently created addresses
     */
    public async listaddresses(addresses: Address | Address[], verbose: boolean, count: number, start: number): Promise<IAddressInfo[] | IAddressInfoVerbose[]> {
        const result = await this.call('listaddresses', [addresses, verbose, count, start])
        return (verbose) ? result as IAddressInfoVerbose[] : result as IAddressInfo[]
    }

    /**
     * Generates one or more public/private key pairs, which are not stored in the wallet or drawn from the node’s key pool, ready for external key management. For each key pair, the address, pubkey (as embedded in transaction inputs) and privkey (used for signatures) is provided.
     */
    public async createkeypairs(count: number = 1) {
        return await this.call('createkeypairs', [count]) as IKeyPair[]
    }

    /**
     * Creates a pay-to-scripthash (P2SH) multisig address. Funds sent to this address can only be spent by transactions signed by nrequired of the specified keys. Each key can be a full hexadecimal public key, or an address if the corresponding key is in the node’s wallet. Returns an object containing the P2SH address and corresponding redeem script.
     */
    public async createmultisig(nrequired: number, addresses: Address[]) {
        return await this.call('createmultisig', [nrequired, addresses]) as IP2SH
    }

    /**
     * Returns information about address, or the address corresponding to the specified privkey private key or pubkey public key, including whether this node has the address’s private key in its wallet.
     */
    public async validateaddress(address: Address | PubKey | PrivKey) {
        return await this.call('validateaddress', [address]) as IAddressValidation
    }

    /**
     * 
     */
    public async grant() {
        return await this.call('grant')
    }

    /**
     * 
     */
    public async grantfrom() {
        return await this.call('grantfrom')
    }

    /**
     * 
     */
    public async grantwithdata() {
        return await this.call('grantwithdata')
    }

    /**
     * 
     */
    public async grantwithdatafrom() {
        return await this.call('grantwithdatafrom')
    }

    /**
     * 
     */
    public async listpermissions() {
        return await this.call('listpermissions')
    }

    /**
     * 
     */
    public async revoke() {
        return await this.call('revoke')
    }

    /**
     * 
     */
    public async revokefrom() {
        return await this.call('revokefrom')
    }

    /**
     * 
     */
    public async verifypermission() {
        return await this.call('verifypermission')
    }

    /**
     * 
     */
    public async getassetinfo() {
        return await this.call('getassetinfo')
    }

    /**
     * 
     */
    public async gettokeninfo() {
        return await this.call('gettokeninfo')
    }

    /**
     * 
     */
    public async issue() {
        return await this.call('issue')
    }

    /**
     * 
     */
    public async issuefrom() {
        return await this.call('issuefrom')
    }

    /**
     * 
     */
    public async issuemore() {
        return await this.call('issuemore')
    }

    /**
     * 
     */
    public async issuemorefrom() {
        return await this.call('issuemorefrom')
    }

    /**
     * 
     */
    public async issuetoken() {
        return await this.call('issuetoken')
    }

    /**
     * 
     */
    public async issuetokenfrom() {
        return await this.call('issuetokenfrom')
    }

    /**
     * 
     */
    public async listassetissues() {
        return await this.call('listassetissues')
    }

    /**
     * 
     */
    public async listassets() {
        return await this.call('listassets')
    }

    /**
     * 
     */
    public async update() {
        return await this.call('update')
    }

    /**
     * 
     */
    public async updatefrom() {
        return await this.call('updatefrom')
    }

    /**
     * 
     */
    public async getaddressbalances() {
        return await this.call('getaddressbalances')
    }

    /**
     * 
     */
    public async getaddresstransaction() {
        return await this.call('getaddresstransaction')
    }

    /**
     * 
     */
    public async getmultibalances() {
        return await this.call('getmultibalances')
    }

    /**
     * 
     */
    public async gettokenbalances() {
        return await this.call('gettokenbalances')
    }

    /**
     * 
     */
    public async gettotalbalances() {
        return await this.call('gettotalbalances')
    }

    /**
     * 
     */
    public async getwallettransaction() {
        return await this.call('getwallettransaction')
    }

    /**
     * 
     */
    public async listaddresstransactions() {
        return await this.call('listaddresstransactions')
    }

    /**
     * 
     */
    public async listwallettransactions() {
        return await this.call('listwallettransactions')
    }

    /**
     * 
     */
    public async send() {
        return await this.call('send')
    }

    /**
     * 
     */
    public async sendasset() {
        return await this.call('sendasset')
    }

    /**
     * 
     */
    public async sendassetfrom() {
        return await this.call('sendassetfrom')
    }

    /**
     * 
     */
    public async sendfrom() {
        return await this.call('sendfrom')
    }

    /**
     * 
     */
    public async sendwithdata() {
        return await this.call('sendwithdata')
    }

    /**
     * 
     */
    public async sendwithdatafrom() {
        return await this.call('sendwithdatafrom')
    }

    /**
     * 
     */
    public async appendrawexchange() {
        return await this.call('appendrawexchange')
    }

    /**
     * 
     */
    public async completerawexchange() {
        return await this.call('completerawexchange')
    }

    /**
     * 
     */
    public async createrawexchange() {
        return await this.call('createrawexchange')
    }

    /**
     * 
     */
    public async decoderawexchange() {
        return await this.call('decoderawexchange')
    }

    /**
     * 
     */
    public async disablerawtransaction() {
        return await this.call('disablerawtransaction')
    }

    /**
     * 
     */
    public async preparelockunspent() {
        return await this.call('preparelockunspent')
    }

    /**
     * 
     */
    public async preparelockunspentfrom() {
        return await this.call('preparelockunspentfrom')
    }

    /**
     * 
     */
    public async create() {
        return await this.call('create')
    }

    /**
     * 
     */
    public async createfrom() {
        return await this.call('createfrom')
    }

    /**
     * 
     */
    public async getstreaminfo() {
        return await this.call('getstreaminfo')
    }

    /**
     * 
     */
    public async liststreams() {
        return await this.call('liststreams')
    }

    /**
     * 
     */
    public async publish() {
        return await this.call('publish')
    }

    /**
     * 
     */
    public async publishfrom() {
        return await this.call('publishfrom')
    }

    /**
     * 
     */
    public async publishmulti() {
        return await this.call('publishmulti')
    }

    /**
     * 
     */
    public async publishmultifrom() {
        return await this.call('publishmultifrom')
    }

    /**
     * 
     */
    public async subscribe() {
        return await this.call('subscribe')
    }

    /**
     * 
     */
    public async trimsubscribe() {
        return await this.call('trimsubscribe')
    }

    /**
     * 
     */
    public async unsubscribe() {
        return await this.call('unsubscribe')
    }

    /**
     * 
     */
    public async getassettransaction() {
        return await this.call('getassettransaction')
    }

    /**
     * 
     */
    public async listassettransactions() {
        return await this.call('listassettransactions')
    }

    /**
     * 
     */
    public async getstreamitem() {
        return await this.call('getstreamitem')
    }

    /**
     * 
     */
    public async getstreamkeysummary() {
        return await this.call('getstreamkeysummary')
    }

    /**
     * 
     */
    public async getstreampublishersummary() {
        return await this.call('getstreampublishersummary')
    }

    /**
     * 
     */
    public async gettxoutdata() {
        return await this.call('gettxoutdata')
    }

    /**
     * 
     */
    public async liststreamblockitems() {
        return await this.call('liststreamblockitems')
    }

    /**
     * 
     */
    public async liststreamkeyitems() {
        return await this.call('liststreamkeyitems')
    }

    /**
     * 
     */
    public async liststreamkeys() {
        return await this.call('liststreamkeys')
    }

    /**
     * 
     */
    public async liststreamitems() {
        return await this.call('liststreamitems')
    }

    /**
     * 
     */
    public async liststreampublisheritems() {
        return await this.call('liststreampublisheritems')
    }

    /**
     * 
     */
    public async liststreampublishers() {
        return await this.call('liststreampublishers')
    }

    /**
     * 
     */
    public async liststreamqueryitems() {
        return await this.call('liststreamqueryitems')
    }

    /**
     * 
     */
    public async liststreamtxitems() {
        return await this.call('liststreamtxitems')
    }

    /**
     * 
     */
    public async purgepublisheditems() {
        return await this.call('purgepublisheditems')
    }

    /**
     * 
     */
    public async purgestreamitems() {
        return await this.call('purgestreamitems')
    }

    /**
     * 
     */
    public async retrievestreamitems() {
        return await this.call('retrievestreamitems')
    }

    /**
     * 
     */
    public async combineunspent() {
        return await this.call('combineunspent')
    }

    /**
     * 
     */
    public async listlockunspent() {
        return await this.call('listlockunspent')
    }

    /**
     * 
     */
    public async listunspent() {
        return await this.call('listunspent')
    }

    /**
     * 
     */
    public async lockunspent() {
        return await this.call('lockunspent')
    }

    /**
     * 
     */
    public async appendrawchange() {
        return await this.call('appendrawchange')
    }

    /**
     * 
     */
    public async appendrawdata() {
        return await this.call('appendrawdata')
    }

    /**
     * 
     */
    public async appendrawtransaction() {
        return await this.call('appendrawtransaction')
    }

    /**
     * 
     */
    public async createrawtransaction() {
        return await this.call('createrawtransaction')
    }

    /**
     * 
     */
    public async createrawsendfrom() {
        return await this.call('createrawsendfrom')
    }

    /**
     * 
     */
    public async decoderawtransaction() {
        return await this.call('decoderawtransaction')
    }

    /**
     * 
     */
    public async sendrawtransaction() {
        return await this.call('sendrawtransaction')
    }

    /**
     * 
     */
    public async signrawtransaction() {
        return await this.call('signrawtransaction')
    }

    /**
     * 
     */
    public async addnode() {
        return await this.call('addnode')
    }

    /**
     * 
     */
    public async getaddednodeinfo() {
        return await this.call('getaddednodeinfo')
    }

    /**
     * 
     */
    public async getnetworkinfo() {
        return await this.call('getnetworkinfo')
    }

    /**
     * 
     */
    public async getpeerinfo() {
        return await this.call('getpeerinfo')
    }

    /**
     * 
     */
    public async liststorednodes() {
        return await this.call('liststorednodes')
    }

    /**
     * 
     */
    public async ping() {
        return await this.call('ping')
    }

    /**
     * 
     */
    public async storenode() {
        return await this.call('storenode')
    }

    /**
     * 
     */
    public async signmessage() {
        return await this.call('signmessage')
    }

    /**
     * 
     */
    public async verifymessage() {
        return await this.call('verifymessage')
    }

    /**
     * 
     */
    public async getblock() {
        return await this.call('getblock')
    }

    /**
     * 
     */
    public async getblockchaininfo() {
        return await this.call('getblockchaininfo')
    }

    /**
     * 
     */
    public async getblockhash() {
        return await this.call('getblockhash')
    }

    /**
     * 
     */
    public async getchaintotals() {
        return await this.call('getchaintotals')
    }

    /**
     * 
     */
    public async getlastblockinfo() {
        return await this.call('getlastblockinfo')
    }

    /**
     * 
     */
    public async getmempoolinfo() {
        return await this.call('getmempoolinfo')
    }

    /**
     * 
     */
    public async getrawmempool() {
        return await this.call('getrawmempool')
    }

    /**
     * 
     */
    public async getrawtransaction() {
        return await this.call('getrawtransaction')
    }

    /**
     * 
     */
    public async gettxout() {
        return await this.call('gettxout')
    }

    /**
     * 
     */
    public async listblocks() {
        return await this.call('listblocks')
    }

    /**
     * 
     */
    public async listminers() {
        return await this.call('listminers')
    }

    /**
     * 
     */
    public async createbinarycache() {
        return await this.call('createbinarycache')
    }

    /**
     * 
     */
    public async appendbinarycache() {
        return await this.call('appendbinarycache')
    }

    /**
     * 
     */
    public async deletebinarycache() {
        return await this.call('deletebinarycache')
    }

    /**
     * 
     */
    public async txouttobinarycache() {
        return await this.call('txouttobinarycache')
    }

    /**
     * 
     */
    public async backupwallet() {
        return await this.call('backupwallet')
    }

    /**
     * 
     */
    public async dumpprivkey() {
        return await this.call('dumpprivkey')
    }

    /**
     * 
     */
    public async dumpwallet() {
        return await this.call('dumpwallet')
    }

    /**
     * 
     */
    public async encryptwallet() {
        return await this.call('encryptwallet')
    }

    /**
     * 
     */
    public async getwalletinfo() {
        return await this.call('getwalletinfo')
    }

    /**
     * 
     */
    public async importprivkey() {
        return await this.call('importprivkey')
    }

    /**
     * 
     */
    public async importwallet() {
        return await this.call('importwallet')
    }

    /**
     * 
     */
    public async walletlock() {
        return await this.call('walletlock')
    }

    /**
     * 
     */
    public async walletpassphrase() {
        return await this.call('walletpassphrase')
    }

    /**
     * 
     */
    public async walletpassphrasechange() {
        return await this.call('walletpassphrasechange')
    }

    /**
     * 
     */
    public async addtofeed() {
        return await this.call('addtofeed')
    }

    /**
     * 
     */
    public async createfeed() {
        return await this.call('createfeed')
    }

    /**
     * 
     */
    public async datareftobinarycache() {
        return await this.call('datareftobinarycache')
    }

    /**
     * 
     */
    public async deletefeed() {
        return await this.call('deletefeed')
    }

    /**
     * 
     */
    public async getdatarefdata() {
        return await this.call('getdatarefdata')
    }

    /**
     * 
     */
    public async listfeeds() {
        return await this.call('listfeeds')
    }

    /**
     * 
     */
    public async pausefeed() {
        return await this.call('pausefeed')
    }

    /**
     * 
     */
    public async purgefeed() {
        return await this.call('purgefeed')
    }

    /**
     * 
     */
    public async resumefeed() {
        return await this.call('resumefeed')
    }

    /**
     * 
     */
    public async updatefeed() {
        return await this.call('updatefeed')
    }

    /**
     * 
     */
    public async approvefrom() {
        return await this.call('approvefrom')
    }

    /**
     * 
     */
    public async getfiltercode() {
        return await this.call('getfiltercode')
    }

    /**
     * 
     */
    public async liststreamfilters() {
        return await this.call('liststreamfilters')
    }

    /**
     * 
     */
    public async listtxfilters() {
        return await this.call('listtxfilters')
    }

    /**
     * 
     */
    public async listupgrades() {
        return await this.call('listupgrades')
    }

    /**
     * 
     */
    public async runstreamfilter() {
        return await this.call('runstreamfilter')
    }

    /**
     * 
     */
    public async runtxfilter() {
        return await this.call('runtxfilter')
    }

    /**
     * 
     */
    public async teststreamfilter() {
        return await this.call('teststreamfilter')
    }

    /**
     * 
     */
    public async testtxfilter() {
        return await this.call('testtxfilter')
    }

    /**
     * 
     */
    public async addlibraryupdate() {
        return await this.call('addlibraryupdate')
    }

    /**
     * 
     */
    public async addlibraryupdatefrom() {
        return await this.call('addlibraryupdatefrom')
    }

    /**
     * 
     */
    public async getlibrarycode() {
        return await this.call('getlibrarycode')
    }

    /**
     * 
     */
    public async getvariablehistory() {
        return await this.call('getvariablehistory')
    }

    /**
     * 
     */
    public async getvariableinfo() {
        return await this.call('getvariableinfo')
    }

    /**
     * 
     */
    public async getvariablevalue() {
        return await this.call('getvariablevalue')
    }

    /**
     * 
     */
    public async listlibraries() {
        return await this.call('listlibraries')
    }

    /**
     * 
     */
    public async setvariablevalue() {
        return await this.call('setvariablevalue')
    }

    /**
     * 
     */
    public async setvariablevaluefrom() {
        return await this.call('setvariablevaluefrom')
    }

    /**
     * 
     */
    public async testlibrary() {
        return await this.call('testlibrary')
    }

    /**
     * 
     */
    public async clearmempool() {
        return await this.call('clearmempool')
    }

    /**
     * 
     */
    public async getchunkqueueinfo() {
        return await this.call('getchunkqueueinfo')
    }

    /**
     * 
     */
    public async getchunkqueuetotals() {
        return await this.call('getchunkqueuetotals')
    }

    /**
     * 
     */
    public async pause() {
        return await this.call('pause')
    }

    /**
     * 
     */
    public async resume() {
        return await this.call('resume')
    }

    /**
     * 
     */
    public async setlastblock() {
        return await this.call('setlastblock')
    }

    /**
     * 
     */
    public async getlicenserequest() {
        return await this.call('getlicenserequest')
    }

    /**
     * 
     */
    public async activatelicense() {
        return await this.call('activatelicense')
    }

    /**
     * 
     */
    public async listlicenses() {
        return await this.call('listlicenses')
    }

    /**
     * 
     */
    public async transferlicense() {
        return await this.call('transferlicense')
    }

}
