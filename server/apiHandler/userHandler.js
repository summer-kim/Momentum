const firebase = require('../db');
const User = require('../model');
const db = firebase.firestore();

const addUser = async (req, res, next) => {
  try {
    const input = req.body;
    await db.collection('users').doc().set(input);
    res.json(input);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { addUser };
