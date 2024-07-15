const cron = require('node-cron');
const { sendPromotionalEmails } = require('../utils/emailUtils');

const initCronJobs = () => {
  cron.schedule('0 0 * * 0', () => {
    console.log('Running weekly promotional email job');
    sendPromotionalEmails();
  });
};

module.exports = { initCronJobs };
