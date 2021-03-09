//middleware
const { auth } = require('./db');
const checkAuth = (req, res, next) => {
  const user = auth.currentUser;
  if (!user) {
    return res.redirect('/login');
  }
  req.user = user;
  next();
};

module.exports = checkAuth;
