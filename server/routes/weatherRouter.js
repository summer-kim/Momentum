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

router.get('/data/get/weather', async (req, res) => {
  try {
    const user = auth.currentUser;
    const doc = await db.collection(user.displayName).doc('city').get();
    if (doc.exists) {
      return res.json(doc.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = { routes: router };
