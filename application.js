const express = require('express');
var app = express();
var logger = require('morgan');
const cors = require('cors');

const bodyParser = require('body-parser');

require('./config/env');
require('./config/db');
require('./config/seed.db');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('', require('./routes/application.routes'));
app.use('/images/products', express.static('public/images/products'));
app.use('/images/shared', express.static('public/images/shared'));

app.use(function (req, res) {
  const result = {
    data: null,
    message: 'Requested not found',
    success: false,
    status: 404,
  };

  return res.status(404).json(result);
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${3000}`);
});

module.exports = app;
