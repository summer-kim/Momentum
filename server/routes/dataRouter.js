const express = require('express');
const router = express.Router();
const { auth, db } = require('../db');

router.get('/data/weather/:city', async (req, res) => {
  try {
    const user = auth.currentUser;
    const city = req.params.city;

    await db.collection(user.displayName).doc('city').set({ city });
    return res.json({ msg: 'set Weather Successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { routes: router };
