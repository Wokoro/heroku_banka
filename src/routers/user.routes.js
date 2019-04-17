import express from 'express';

import userAuthentication from '../../middleware/signin_authentication';
import signUpValidation from '../../middleware/signup_validation';

import UserController from '../controllers/User.controller';

const router = express.Router();

/**
* @api {post} /api/v1/auth/signup Create new user account
* @apiName Creat user account
* @apiPermission user
*
* @apiParam  {object} user details
*/

router.post('/signup', signUpValidation, UserController.create);

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
