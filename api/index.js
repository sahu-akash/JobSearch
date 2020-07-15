const express = require('express')
const app = express()
const port = 3001
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);


app.get('/',async (req, res) => {
    //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
    const jobsdata= await getAsync('github')
    res.send(jobsdata)

})
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))