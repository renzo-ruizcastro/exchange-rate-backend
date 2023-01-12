const express = require('express');
const morganBody = require('morgan-body');

const app = express();
app.use(express.json());
morganBody(app);

module.exports = app;
