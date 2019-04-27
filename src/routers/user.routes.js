import express from 'express';

import userAuthentication from '../../middleware/signin_authentication';
import signUpValidation from '../../middleware/signup_validation';
import userUniquenessCheck from '../../middleware/check_uniqueness';
import RemovePads from '../../middleware/remove_padding';

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
* @api {post} /api/v1/user/<user-email-address>/accounts  view accounts specific to a user
* @apiName View user account(s)
* @apiPermission user
*
* @apiParam  {object} user account(s) details
*
* @apiSuccess (200) {Object} mixed `user account(s)` object
*/
router.post('/:userEmailAddress/accounts', userAuthentication, UserController.getAllUserAccounts);

export default router;
