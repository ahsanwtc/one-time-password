const admin = require('firebase-admin');
const functions = require('firebase-functions');

const serviceAccount = require('./service-account.json');
const createUser = require('./create-user');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-passward-6ae92.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
