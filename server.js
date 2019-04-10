const express = require('express');
const bodyParser = require('body-parser');

const UserRoutes = require('./src/routers/user.router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

UserRoutes(app);

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = server;
