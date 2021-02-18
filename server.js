const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;

const layoutPath = path.join(__dirname, './views/layouts');
const partialsPath = path.join(__dirname, './views/partials');
const publicPath = path.join(__dirname, './public');

const userRouter = require('./server/routes/userRouter');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: layoutPath,
    partialsDir: partialsPath,
  })
);

app.use(express.static(publicPath));
app.use(express.json());
app.use('/api', userRouter.routes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
