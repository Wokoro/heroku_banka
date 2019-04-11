/* eslint-disable no-unused-expressions */
const express = require('express');
const bodyParser = require('body-parser');

const UserRoutes = require('./src/routers/user.routes');
const AccountRoutes = require('./src/routers/account.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', UserRoutes);
app.use('/api/v1/accounts', AccountRoutes);


const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = server;
