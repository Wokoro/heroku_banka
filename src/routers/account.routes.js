import express from 'express';

import AccountController from '../controllers/account.controller';
import authAdmin from '../../utils/auth.staff';
import { passToken } from '../../utils/utils';
import { validateOpeningBalance, accountNumberValidation } from '../../middleware/account_validations';
import authUser from '../../utils/auth.user';
import authValidUsers from '../../middleware/account_view_authentication';


const router = express.Router();

/**
* @api {post} /api/v1/accounts Create Account
* @apiName Create new account
* @apiPermission user
* @apiParam  {String} [type] account type
* @apiParam  {String} [startBalance] start balance of account
* @apiParam  {String} [status] Active or domant
*/
router.post('/accounts', validateOpeningBalance, passToken, AccountController.create);

/**
* @api {get} /api/v1/accounts/:accountNumber   gets an account
* @apiName Get account
* @apiPermission staff
*
*/
router.get('/accounts/:accountNumber', accountNumberValidation, passToken, authValidUsers, AccountController.show);

/**
* @api {get} /api/v1/accounts   gets all accounts
* @apiName Get accounts
* @apiPermission admin
*
*/
router.get('/accounts', passToken, authAdmin, AccountController.index);

/**
* @api {patch} /api/v1/account/:accountNumber Change a specific account status
* @apiName Change account status
* @apiPermission admin or staff
*
*/
router.patch('/account/:accountNumber', accountNumberValidation, passToken, authUser, AccountController.changeStatus);

/**
* @api {delete} /api/v1/account/:accountNumber delete specific account
* @apiName Delete account
* @apiPermission admin/staff
*/
router.delete('/account/:accountNumber', passToken, accountNumberValidation, authAdmin, AccountController.delete);


export default router;
