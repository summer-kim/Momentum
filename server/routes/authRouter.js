const express = require('express');
const router = express.Router();
const { auth } = require('../db');

router.get('/login', (req, res) => {
  res.render('login', {
    style: 'login',
  });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    await auth.signInWithEmailAndPassword(email, password);
    auth.onAuthStateChanged((user) => {
      if (user) {
        return res.redirect('/');
      } else {
        return res.redirect('/login');
      }
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = { routes: router };
