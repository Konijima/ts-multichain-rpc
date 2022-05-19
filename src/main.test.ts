import Client from "./client";

(async function() {

    const client = new Client({
        host: '127.0.0.1',
        port: 7777,
        user: 'test',
        pass: 'test'
    })

    try {
        
        console.log( await client.help('grant') )

        const address1 = await client.getnewaddress()
        const address2 = await client.getnewaddress()

        client.grant([address1, address2], ["connect"], 0, 0, -1, 'Test', 'Test2')
        .then(value => {
            console.log(value)
        })
        .catch(error => {
            console.error('Error: ', error)
        })
        
    }
    catch(error) {
        console.error(error)
    }


})()
