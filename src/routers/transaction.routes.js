import express from 'express';

import TransactionController from '../controllers/transaction.controller';
import { accountNumberValidation } from '../../middleware/account_validations';
import accountBalanceValidation from '../../middleware/check_balance';

import authStaff from '../../utils/auth.staff';
import { verifyToken } from '../../utils/utils';
import authUser from '../../utils/auth.user';


const router = express.Router();

/**
* @api {post} /api/v1/transactions Create Account
* @apiName Get all transactions
* @apiPermission user
*
* @apiSuccess (200) {Object} get all transaction `transactions` object
*/
router.get('', verifyToken, authUser, TransactionController.index);

/**
* @api {post} /api/v1/transactions/:accountNumber/debit Debit Account
* @apiName Debit an account
* @apiPermission user
*
* @apiParam  {Integer} [amount] amount
*
* @apiSuccess (200)
*/
router.post('/:accountNumber/debit', accountNumberValidation, accountBalanceValidation, verifyToken, authStaff, TransactionController.debit);

/**
* @api {post} /api/v1/transactions/:accountNumber/credit Credit Account
* @apiName Debit an account
* @apiPermission user
*
* @apiParam  {Integer} [amount] amount
*
* @apiSuccess (200)
*/
router.post('/:accountNumber/credit', accountNumberValidation, verifyToken, authStaff, TransactionController.credit);

export default router;
