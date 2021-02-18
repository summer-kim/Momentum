const firebase = require('firebase');
const config = require('config');
const firebaseConfig = config.get('firebaseConfig');
const db = firebase.initializeApp(firebaseConfig);

module.exports = db;
