var fetch = require('node-fetch')
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
//url='https://jobs.github.com/positions.json?description=ruby&page=1'
url='https://jobs.github.com/positions.json'

async function fetchgithub(){
    let pagenum=0,resultset=1
    const jobarry=[]
    while(resultset>0){
        let newurl=url+'?'+'page='+pagenum
        console.log(`fetching page and url ${newurl}`);
        const res= await fetch(newurl)
        const jobsdata=await res.json()
        jobarry.push(...jobsdata)
        resultset=jobsdata.length
        pagenum++;
    }
    console.log('total jobs found ', jobarry.length);
    //filter dev jobs
    const jrJobs= jobarry.filter(jobs => {
        const jobtitle= jobs.title.toLowerCase();
        if(jobtitle.includes('senior')||
        jobtitle.includes('architect')||
        jobtitle.includes('sr.')||
        jobtitle.includes('manager')
        ){
            return false;
        }
        return true;
    })

    console.log('jobs filtered down to ', jrJobs.length);
    const success =await setAsync('github',JSON.stringify(jrJobs));
    console.log({success});     
}
module.exports = fetchgithub;