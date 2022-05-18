import Client from "./client";

(async function() {

    const client = new Client({
        host: '127.0.0.1',
        port: 8384,
        user: 'multichainrpc',
        pass: 'A2Rum4BCNm8BhxmiYoRy53KqBfceLfQtyA4tFCxqy2hs'
    })

    client.call('getinfo')
        .then((value) => console.log(value))
        .catch((error) => console.error(error));

    const result = await client.call('getinfo')
    console.log(result)

})()
