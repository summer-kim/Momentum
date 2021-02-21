const { db, auth } = require('../db');

const setCity = async (req, res, next) => {
  try {
    const user = auth.currentUser;
    const input = req.query.city;
    await db.collection(user.displayName).doc('city').set(input);
    return res.json(input);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { setCity };
