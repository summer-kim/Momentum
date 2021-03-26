//middleware
const { admin } = require('./db');

const verifyUser = async (req, res, next) => {
  const sessionCookie = req.cookies.session || '';
  if (!sessionCookie) {
    return res.redirect('/login');
  }
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
    res.status(400).render('login', {
      err: err.message,
      style: 'login',
      isRegister: false,
      type: 'Login',
    });
  }
};

module.exports = verifyUser;
