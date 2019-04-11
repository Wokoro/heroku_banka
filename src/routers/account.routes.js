const express = require('express');
const AccountController = require('../controllers/account.controller');
const authAdmin = require('../../utils/auth.admin');
const { verifyToken } = require('../../utils/utils');


const router = express.Router();

router.post('/accounts', verifyToken, AccountController.create);
router.patch('/account/:accountNumber', verifyToken, authAdmin, AccountController.changeState);


module.exports = router;
