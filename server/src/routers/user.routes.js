import express from 'express';

import userAuthentication from '../../middleware/signin.authentication';
import signUpValidation from '../../middleware/signup.validation';
import userUniquenessCheck from '../../middleware/check.user.account.uniqueness';
import EmailValidation from '../../middleware/authenticate.mail.presence';
import RemovePads from '../../middleware/remove.padding';
import staffVerification from '../../utils/auth.staff';
import validUserAuthentication from '../../middleware/account.view.authentication';
import { passToken } from '../../utils/utils';
import UserController from '../controllers/User.controller';

const router = express.Router();

/**
* @api {post} /api/v1/auth/signup Create new user account
* @apiName Creat user account
* @apiPermission user
*
* @apiParam  {object} user details
*/

router.post('/signup', RemovePads, userUniquenessCheck, signUpValidation, UserController.createUser);

/**
* @api {post} /api/v1/auth/signin Sign a given user account
* @apiName Sign in user
* @apiPermission user
*
* @apiParam  {object} user signin details
*
* @apiSuccess (200) {Object} mixed `user account` object
*/
router.post('/signin', userAuthentication, UserController.signinUser);


/**
* @api {get} /api/v1/user/<user-email-address>/accounts  view accounts specific to a user
* @apiName View user account(s)
* @apiPermission user
*
* @apiParam  {object} user account(s) details
*
* @apiSuccess (200) {Object} mixed `user account(s)` object
*/
router.get('/:userEmailAddress/accounts', passToken, EmailValidation, validUserAuthentication, UserController.getAllUserAccounts);

export default router;
