const firebase = require('firebase');
const config = require('config');
const firebaseConfig = config.get('firebaseConfig');
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
