import express from 'express';

import UserController from '../controllers/User.controller';
import { authenticate } from '../../utils/utils';

const router = express.Router();

router.post('/signup', UserController.create);
router.post('/signin', authenticate, UserController.signin);


export default router;
