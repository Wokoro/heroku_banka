/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
const express = require('express');
const bodyParser = require('body-parser');

const UserRoutes = require('./src/routers/user.routes');
const AccountRoutes = require('./src/routers/account.routes');
const TransactionRoutes = require('./src/routers/transaction.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Headers to allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin', 'X-Request-With', 'Content-Type', 'Accept', 'Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
    return res.status(200).json({});
  }
  next();
});

// Routes defination
app.use('/api/v1/auth', UserRoutes);
app.use('/api/v1/transactions', TransactionRoutes);
app.use('/api/v1/', AccountRoutes);

// caching unsuported urls
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Caching database related errors
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = server;
