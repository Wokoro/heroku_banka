import express from 'express';

import AccountController from '../controllers/account.controller';
import authAdmin from '../../utils/auth.staff';
import { verifyToken } from '../../utils/utils';
import { validateOpeningBalance, accountNumberValidation } from '../../middleware/account_validations';


const router = express.Router();

/**
* @api {post} /api/v1/accounts Create Account
* @apiName Create new account
* @apiPermission user
* @apiParam  {String} [type] account type
* @apiParam  {String} [startBalance] start balance of account
* @apiParam  {String} [status] Active or domant
*/
router.post('/accounts', validateOpeningBalance, verifyToken, AccountController.create);

/**
* @api {get} /api/v1/accounts/:accountNumber   gets an account
* @apiName Get account
* @apiPermission staff
*
*/
router.get('/accounts/:accountNumber', accountNumberValidation, verifyToken, authAdmin, AccountController.show);

/**
* @api {get} /api/v1/accounts   gets all accounts
* @apiName Get accounts
* @apiPermission admin
*
*/
router.get('/accounts', verifyToken, authAdmin, AccountController.index);

/**
* @api {patch} /api/v1/account/:accountNumber Change a specific account status
* @apiName Change account status
* @apiPermission admin
*
*/
router.patch('/account/:accountNumber', accountNumberValidation, verifyToken, authAdmin, AccountController.changeState);

/**
* @api {delete} /api/v1/account/:accountNumber delete specific account
* @apiName Delete account
* @apiPermission admin/staff
*/
router.delete('/account/:accountNumber', verifyToken, accountNumberValidation, authAdmin, AccountController.delete);


export default router;
