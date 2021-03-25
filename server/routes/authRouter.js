const express = require('express');
const router = express.Router();
const { admin } = require('../db');

router.get('/login', (req, res) => {
  res.render('login', {
    style: 'login',
  });
});

router.post('/sessionLogin', async (req, res) => {
  try {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const options = { maxAge: expiresIn, httpOnly: true };

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });
    res.cookie('session', sessionCookie, options);
    return res.redirect('/');
  } catch (err) {
    res.status(400).render('login', {
      err: err.message,
      style: 'login',
      isRegister: false,
      type: 'Login',
    });
  }
});

router.get('/login/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect('/login');
});

router.get('/register', (req, res) => {
  res.render('register', {
    style: 'login',
  });
});

module.exports = { routes: router };
