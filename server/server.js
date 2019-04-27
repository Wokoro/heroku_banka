/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { initDBPool } from './database/db';

import UserRoutes from './src/routers/user.routes';
import AccountRoutes from './src/routers/account.routes';
import TransactionRoutes from './src/routers/transaction.routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

initDBPool();

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
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/transactions', TransactionRoutes);
app.use('/api/v1/', AccountRoutes);

// caching unsuported urls
app.use((req, res) => {
  res.json({
    status: 404,
    message: 'Page not found',
  });
});

const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});

export default server;
