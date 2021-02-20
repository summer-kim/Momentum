const User = require('../model');
const request = require('request');
const { db } = require('../db');

const addUser = async (req, res, next) => {
  try {
    const input = req.body;
    await db.collection('users').doc().set(input);
    res.json(input);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostition = (city, cb) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    city +
    '.json?access_token=pk.eyJ1Ijoic3VtbWVyenphbmciLCJhIjoiY2tmcnZmYWFsMDZmaDMxcXFidXRtY3o0aSJ9.FC3i_sUZ8CyHoihbWgbrvQ&limit=1';

  request({ url, JSON: true }, (error, { body }) => {
    const parsed = JSON.parse(body);
    if (error) {
      cb('Unable to connect to location service', undefined);
    } else if (parsed.features.length === 0) {
      cb('Unable to find the location', undefined);
    } else {
      cb(undefined, {
        longitude: parsed.features[0].center[0],
        latitude: parsed.features[0].center[1],
        location: parsed.features[0].place_name,
      });
    }
  });
};

const getWeather = (longi, lati, cb) => {
  const url =
    'http://api.weatherstack.com/current?access_key=bd459e9c00f721c07d47a7debfbbe4ff&query=' +
    lati +
    ',' +
    longi +
    '&unit=f';
  request({ url, JSON: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to weather service', undefined);
    } else if (body.error) {
      cb('Unable to find the weather. Try again', undefined);
    } else {
      const parsed = JSON.parse(body);
      cb(undefined, {
        weather: parsed.current.weather_descriptions[0],
        time: parsed.location.localtime,
        temp: parsed.current.temperature,
        humidity: parsed.current.humidity,
      });
    }
  });
};

module.exports = { addUser, getPostition, getWeather };
