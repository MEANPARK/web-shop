import express from 'express';
import { authenticateJwt } from '../auth/auth.middleware';

const router = express.Router();

import {
    addCart,
    getAllCart,
    deleteCart
} from './cart.controller';

router.route('/add')
.post(authenticateJwt, addCart);

router.route('/:userId')
.get(authenticateJwt, getAllCart);

router.route('/:id')
.delete(authenticateJwt, deleteCart);

export default router;