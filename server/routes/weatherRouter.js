const express = require('express');
const router = express.Router();
const { auth, db } = require('../db');
const axios = require('axios');

router.get('/data/weather/:city', async (req, res) => {
  const user = auth.currentUser;
  const city = req.params.city;

  try {
    await db.collection(user.displayName).doc('city').set({ city });
    return res.json({ msg: 'set Weather Successfully' });
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

router.get('/data/get/weather', async (req, res) => {
  const user = auth.currentUser;

  try {
    const doc = await db.collection(user.displayName).doc('city').get();
    if (doc.exists) {
      return res.json(doc.data());
    }
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

router.get('/data/get/apiWeather/:city', async (req, res) => {
  const { WEATHER_API_KEY } = process.env;
  const city = req.params.city;
  const url =
    'http://api.weatherstack.com/current?access_key=' +
    WEATHER_API_KEY +
    '&query=$' +
    city;

  try {
    const body = await axios.get(url);
    return res.json(body.data);
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});
module.exports = { routes: router };
