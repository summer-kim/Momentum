//middleware
const { auth } = require('./db');
const checkAuth = (req, res, next) => {
  if (!auth.currentUser) {
    return res.redirect('/login');
  }
  next();
};

module.exports = checkAuth;
