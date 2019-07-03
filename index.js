const Guard = require('./src/models/Guard');
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const exampleRouter = require('./src/routes/example')();

const g = new Guard('Zoey');

const app = express();

const port = process.env.PORT || 1201;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/src/client/dist/')));
// app.use('js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/examples', exampleRouter);
const hello = (req, res) => {
  res.render('index', {
    name: g.name,
  });
};
app.use('/jim', hello);


app.listen(port, () => {
  debug(`Running on ${chalk.green(port)}`);
});