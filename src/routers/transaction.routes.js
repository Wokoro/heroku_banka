const express = require('express');
const TransactionController = require('../controllers/transaction.controller');
const authAdmin = require('../../utils/auth.admin');
const { verifyToken } = require('../../utils/utils');


const router = express.Router();

router.get('', verifyToken, authAdmin, TransactionController.index);
router.post('/:accountNumber/debit', verifyToken, authAdmin, TransactionController.debit);
router.post('/:accountNumber/credit', verifyToken, authAdmin, TransactionController.credit);


module.exports = router;
