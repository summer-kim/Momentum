const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const PORT = process.env.PORT || 5000;

const viewsPath = path.join(__dirname, './hbs/views');
const partialsPath = path.join(__dirname, './hbs/partials');
const publicPath = path.join(__dirname, './public');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
