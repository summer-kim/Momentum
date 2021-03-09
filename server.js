const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;

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

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter.routes);
app.use(weatherRouter.routes);
app.use(todoRouter.routes);
const checkAuth = require('./server/middleware');

app.get('/', checkAuth, (req, res) => {
  res.render('index', {
    userName: req.user.displayName,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
