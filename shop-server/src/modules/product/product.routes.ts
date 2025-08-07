import express from 'express';
import { authenticateJwt } from '../auth/auth.middleware';

const router = express.Router();
import { 
    createProduct, 
    getAllProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct } from './product.controller';

router.route('/create')
.post(createProduct);

router.route('/')
.get(getAllProduct);

router.route('/:id')
.get(getProduct)
.post(updateProduct)
.delete(deleteProduct);

export default router;