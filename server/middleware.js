//middleware
const { admin } = require('./db');

const verifyUser = async (req, res, next) => {
  const sessionCookie = req.cookies.session || '';
  console.log('verify');
  if (!sessionCookie) {
    console.log('redirect');
    return res.redirect('/login');
  }
  try {
    admin
      .auth()
      .verifySessionCookie(sessionCookie, true)
      .then((decodedClaims) => {
        console.log('decodedClaims :' + decodedClaims.uid);

        req.uid = decodedClaims.uid;
        req.userName = decodedClaims.name;
        next();
      });
  } catch (err) {
    console.log('verify err :' + err.message);
    res.status(400).render('login', {
      err: err.message,
      style: 'login',
      isRegister: false,
      type: 'Login',
    });
  }
};

module.exports = verifyUser;
