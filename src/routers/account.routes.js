const express = require('express');
const AccountController = require('../controllers/account.controller');
const authAdmin = require('../../utils/auth.admin');
const { verifyToken } = require('../../utils/utils');


const router = express.Router();

router.post('/accounts', verifyToken, AccountController.create);
router.get('/accounts', verifyToken, authAdmin, AccountController.index);
router.patch('/account/:accountNumber', verifyToken, authAdmin, AccountController.changeState);
router.delete('/account/:accountNumber', verifyToken, authAdmin, AccountController.delete);


module.exports = router;
