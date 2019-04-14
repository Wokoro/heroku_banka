import express from 'express';

import TransactionController from '../controllers/transaction.controller';
import authAdmin from '../../utils/auth.admin';
import { verifyToken } from '../../utils/utils';


const router = express.Router();

router.get('', verifyToken, authAdmin, TransactionController.index);
router.post('/:accountNumber/debit', verifyToken, authAdmin, TransactionController.debit);
router.post('/:accountNumber/credit', verifyToken, authAdmin, TransactionController.credit);


export default router;
