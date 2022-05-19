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
        
        const res = await client.createmultisig(2, ['03a9ced0f50f821958d6ec6b86d21171b3d6a49b3e4b063b5c61982151d3aa9613', '0315625364589c17fda078dfec7dc1a848873895e8addd9a7afb084ffc4c5f90e1'])
        console.log( res )
        
    }
    catch(error) {
        console.error(error)
    }


})()
