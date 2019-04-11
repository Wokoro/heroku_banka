const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user.controller');
const Auth = require('../../utils/auth');
router.post('/signup', UserController.create);
router.post('/signin', Auth.authenticate);


module.exports = router
