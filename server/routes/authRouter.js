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
      }
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
    return res.redirect('/login');
  }
});

router.get('/login/logout', async (req, res) => {
  try {
    await auth.signOut();
    res.redirect('/login');
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get('/register', (req, res) => {
  res.render('register', {
    style: 'login',
  });
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    await auth.createUserWithEmailAndPassword(email, password);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.updateProfile({
          displayName: userName,
        });
        return res.redirect('/');
      }
    });
  } catch (err) {
    res.status(400).render('register', {
      msg: err.message,
      style: 'login',
    });
  }
});

module.exports = { routes: router };
