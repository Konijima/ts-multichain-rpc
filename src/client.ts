import * as http from 'http'
import * as https from 'https'
import { Methods } from './methods'

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

    private preCall(method: string, params: string[]) {
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

    public call(method: Methods, params: string[], callback: (error?: Error, result?: any) => void) {
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

    public async callAsync(method: Methods, params: string[]) {
        return new Promise<any>((resolve, reject) => {
            this.call(method, params, (error?: Error, result?: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

}