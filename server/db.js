const firebase = require('firebase');
const config = require('config');
const firebaseConfig = config.get('firebaseConfig');
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

module.exports = { auth, db, firebase };
