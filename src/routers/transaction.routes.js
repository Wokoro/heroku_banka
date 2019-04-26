import express from 'express';

import TransactionController from '../controllers/transaction.controller';
import { accountNumberValidation } from '../../middleware/account_validations';
import accountBalanceValidation from '../../middleware/check_balance';
import transactionValidation from '../../middleware/transaction_validation';
import transactionViewValidation from '../../middleware/transaction_view_authentication';

import authStaff from '../../utils/auth.staff';
import { passToken } from '../../utils/utils';
import authUser from '../../utils/auth.user';


const router = express.Router();

/**
* @api {post} /api/v1/transactions Create Account
* @apiName Get all transactions
* @apiPermission user
*
* @apiSuccess (200) {Object} get all transaction `transactions` object
*/
router.get('', passToken, authUser, TransactionController.getAllTransactions);

/**
* @api {post} /api/v1/transactions/:transactionID Get transaction
* @apiName Get a transaction
* @apiPermission user
*
* @apiSuccess (200) {Object} A transaction `transaction` object and status code
*/
router.get('/:transactionID', transactionValidation, passToken, transactionViewValidation, TransactionController.getTransaction);

/**
* @api {post} /api/v1/transactions/:accountNumber/debit Debit Account
* @apiName Debit an account
* @apiPermission user
*
* @apiParam  {Integer} [amount] amount
*
* @apiSuccess (200)
*/
router.post('/:accountNumber/debit', accountNumberValidation, accountBalanceValidation, passToken, authStaff, TransactionController.debitAccount);

/**
* @api {post} /api/v1/transactions/:accountNumber/credit Credit Account
* @apiName Debit an account
* @apiPermission user
*
* @apiParam  {Integer} [amount] amount
*
* @apiSuccess (200)
*/
router.post('/:accountNumber/credit', accountNumberValidation, passToken, authStaff, TransactionController.creditAccount);

export default router;
