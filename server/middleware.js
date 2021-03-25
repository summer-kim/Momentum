//middleware
const { admin } = require('./db');

const verifyUser = async (req, res, next) => {
  const sessionCookie = req.cookies.session || '';
  try {
    admin
      .auth()
      .verifySessionCookie(sessionCookie, true)
      .then((decodedClaims) => {
        req.uid = decodedClaims.uid;
        req.userName = decodedClaims.name;
        next();
      });
  } catch (err) {
    res.redirect('/login');
  }
};

module.exports = verifyUser;
