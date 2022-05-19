import Client from "./client";
import { IAddressInfoVerbose } from "./types";

(async function() {

    const client = new Client({
        host: '127.0.0.1',
        port: 7777,
        user: 'test',
        pass: 'test'
    })

    try {
        
        const res = await client.getaddresses(true)
        console.log( res )
        
    }
    catch(error) {
        console.error(error)
    }


})()
