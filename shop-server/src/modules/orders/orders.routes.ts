import express from 'express';
import { authenticateJwt } from '../auth/auth.middleware';

const router = express.Router();
import {
    createOrder,
    getOrders
} from './orders.controller';

router.route('/create')
.post(authenticateJwt, createOrder);

router.route('/:userId')
.get(authenticateJwt, getOrders);

export default router;