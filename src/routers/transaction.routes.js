const express = require('express');
const AccountController = require('../controllers/account.controller');
const authAdmin = require('../../utils/auth.admin');
const { verifyToken } = require('../../utils/utils');


const router = express.Router();

router.post('/:accountNumber/debit', verifyToken, authAdmin, AccountController.debit);


module.exports = router;
