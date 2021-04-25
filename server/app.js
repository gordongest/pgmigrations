require('dotenv').config();

const express = require('express');
const path = require('path')
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

module.exports = app;