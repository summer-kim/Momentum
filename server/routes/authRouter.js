const express = require('express');
const router = express.Router();
const { auth } = require('../db');

router.get('/login', (req, res) => {
  res.render('login', {
    style: 'login',
    isRegister: false,
    type: 'Login',
  });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    await auth.signInWithEmailAndPassword(email, password);
    const token = await auth.currentUser.getIdToken();
    return res.json(token);
  } catch (err) {
    res.status(400).render('login', {
      err: err.message,
      style: 'login',
      isRegister: false,
      type: 'Login',
    });
  }
});

router.get('/login/logout', async (req, res) => {
  try {
    await auth.signOut();
    return res.redirect('/login');
  } catch (err) {
    return res.redirect('/');
  }
});

router.get('/register', (req, res) => {
  res.render('login', {
    style: 'login',
    isRegister: true,
    type: 'Register',
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
        const token = await auth.currentUser.getIdToken();
        return res.json(token);
      }
    });
  } catch (err) {
    res.status(400).render('login', {
      err: err.message,
      style: 'login',
      isRegister: true,
      type: 'Register',
    });
  }
});

module.exports = { routes: router };
