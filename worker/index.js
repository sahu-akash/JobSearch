var CronJob = require('cron').CronJob;
const fetchgithub= require('./tasks/fetchdata')
new CronJob('*/5 * * * *', fetchgithub, null, true, 'America/Los_Angeles');