const express = require('express');
const router = express.Router();

const { getPostition, getWeather } = require('../apiHandler/weatherHandler');

router.get('/user/city', (req, res) => {
  getPostition(
    req.query.city,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        console.log(error, longitude);
        return res.status(400).json({ err: error });
      }
      getWeather(longitude, latitude, (error, { weather, temp, humidity }) => {
        if (error) {
          return res.status(400).json({ err: error });
        }
        return res.json({
          location,
          weather,
          temp,
          humidity,
        });
      });
    }
  );
});

module.exports = { routes: router };
