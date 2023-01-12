const express = require('express');
const morganBody = require('morgan-body');
const cors = require('cors');

const app = express();

const userRouter = require('./routes/userRoutes');
const exchangeRouter = require('./routes/exchangeRoutes');
const auditRouter = require('./routes/auditRoutes');

app.use(cors());
app.use(express.json());
morganBody(app);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use('/api/v1/exchanges', exchangeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/audits', auditRouter);

module.exports = app;
