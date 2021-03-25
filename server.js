const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const hbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;

const csrfMiddleware = csrf({ cookie: true });

const layoutsDir = path.join(__dirname, './views/layouts');
const partialsDir = path.join(__dirname, './views/partials');
const publicPath = path.join(__dirname, './public');

const authRouter = require('./server/routes/authRouter');
const weatherRouter = require('./server/routes/weatherRouter');
const todoRouter = require('./server/routes/todoRouter');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir,
    partialsDir,
  })
);
if (process.env.NODE_ENV === 'production') {
  app.get('view cache');
}
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const verifyUser = require('./server/middleware');
app.use('/weather', verifyUser, weatherRouter.routes);
app.use('/todo', verifyUser, todoRouter.routes);
app.use(authRouter.routes);

app.all('*', (req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.get('/', verifyUser, (req, res) => {
  const userName = req.userName;
  res.render('index', {
    userName,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
