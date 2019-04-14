import express from 'express';

import AccountController from '../controllers/account.controller';
import authAdmin from '../../utils/auth.admin';

import { verifyToken } from '../../utils/utils';


const router = express.Router();

router.post('/accounts', verifyToken, AccountController.create);
router.get('/accounts', verifyToken, authAdmin, AccountController.index);
router.patch('/account/:accountNumber', verifyToken, authAdmin, AccountController.changeState);
router.delete('/account/:accountNumber', verifyToken, authAdmin, AccountController.delete);


export default router;
