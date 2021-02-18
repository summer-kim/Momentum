const express = require('express');
const router = express.Router();

const { addUser } = require('../apiHandler/userHandler');

router.post('/user', addUser);

module.exports = { routes: router };
