const express = require('express');

const router = express.Router();

const UserController = require('../controllers/User.controller');
const { authenticate } = require('../../utils/utils');

router.post('/signup', UserController.create);
router.post('/signin', authenticate, UserController.signin);


module.exports = router;
