//Testing api here

// const fetch = require('node-fetch');
// import fetch from "node-fetch";
// const fetch = require('fetch');
import fetch from 'cross-fetch';

fetch('')
.then((res)=>{

    return res.json()

}).then((data)=>{

    console.log(data)
    console.log(typeof(data))

    .catch((error)=>{

        console.log(error)

    })
})