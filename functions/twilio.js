const twilio = require('twilio');
const settings = require('./settings.json');

const accountSid = settings.twilio.sid;
const authToken = settings.twilio.token;

module.exports = new twilio.Twilio(accountSid, authToken);