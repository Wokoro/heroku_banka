const UserController = require('../controllers/User.controller');

module.exports = (app) => {
  app.post('/api/v1/auth/signup', UserController.create);
};
