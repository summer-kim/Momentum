const express = require('express');
const router = express.Router();

const {
  addUser,
  getPostition,
  getWeather,
} = require('../apiHandler/userHandler');

router.post('/user', addUser);

router.get('/user/city', (req, res) => {
  getPostition(
    req.query.city,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        console.log(error, longitude);
        return res.json(error);
      }
      getWeather(
        longitude,
        latitude,
        (error, { weather, time, temp, humidity }) => {
          if (error) {
            return res.json(error);
          }
          return res.json({
            location,
            weather,
            time,
            temp,
            humidity,
          });
        }
      );
    }
  );
});

module.exports = { routes: router };
