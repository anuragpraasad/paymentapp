const axios = require('axios')


// function main() { 
//     fetch("https://sum-server.100xdevs.com/todos")
//     .then(async response => {
//         const json = await response.json();
//         console.log(json)
//     })
// }


// async function main(){
//     const response = await fetch("https://sum-server.100xdevs.com/todos")
//     const json = await response.json();
//     console.log(json)
// }

async function main(){
    const response = await axios(
        "https://httpdump.app/dumps/8eedf5c8-9558-4b44-b593-76c3945f600f",
        {
            method: "POST",
            headers : {
                Authorization: "Bearer 123",
            },
            data: {
                username : "harkirat",
                passord : "password,"
            }
        }
    )
}


main()