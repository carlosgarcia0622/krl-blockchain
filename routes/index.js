require('../config/config');
const express = require('express');
const app = express();

app.use(process.env.URI + '/account', require('./account'));
app.use (process.env.URI + '/transaction', require('./transaction'));
//app.use(process.env.URI + '/block', require('./block'));
module.exports = app;