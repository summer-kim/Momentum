//middleware
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.redirect('/login');
  }
  const token = req.headers.authorization.split('Bearer ')[1];
  const decoded = await admin.auth().verifyIdToken(token);

  if (!decoded.uid) {
    return res.redirect('/login');
  }
  // const userRecord = await admin.auth().getUser(decoded.uid);
  // console.log(userRecord.toJSON());
  req.uid = decoded.uid;
  next();
};

module.exports = checkAuth;
