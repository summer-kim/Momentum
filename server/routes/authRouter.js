const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = { routes: router };
