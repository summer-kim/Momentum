const express = require('express');
const router = express.Router();
const { auth, admin } = require('../db');

router.get('/login', (req, res) => {
  res.render('login', {
    style: 'login',
    isRegister: false,
    type: 'Login',
  });
});

router.post('/login', async (req, res) => {
  try {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          res.cookie('session', sessionCookie, options);
          res.end(JSON.stringify({ status: 'success' }));
        },
        (err) => {
          res.status(401).send('UNAUTHORIZED REQUEST!');
        }
      );
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
