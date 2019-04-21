import express from 'express';

import userAuthentication from '../../middleware/signin_authentication';
import signUpValidation from '../../middleware/signup_validation';
import UniquesnessValidation from '../../middleware/check_uniqueness';
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

router.post('/signup', RemovePads, UniquesnessValidation, signUpValidation, UserController.create);

/**
* @api {post} /api/v1/auth/signin Sign a given user account
* @apiName Sin in user
* @apiPermission user
*
* @apiParam  {object} user signin details
*
* @apiSuccess (200) {Object} mixed `user account` object
*/
router.post('/signin', userAuthentication, UserController.signin);

export default router;
