const express = require('express');
const router = express.Router();
const { auth } = require('../db');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    await auth.signInWithEmailAndPassword(email, password);
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged in');
        return res.render('index');
      } else {
        return console.log('user logged out');
      }
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = { routes: router };
