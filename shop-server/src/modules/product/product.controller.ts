import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import { Product } from '../associations';
import dotenv from 'dotenv';
dotenv.config();

//POST /create
export const createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, price, describe, stock } = req.body;
    const product = await Product.create({ name, price, describe, stock }); 
    res.status(201).json({ success: true, data: product });
});

//GET /
export const getAllProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const products = await Product.findAll();
    res.status(200).json({ success: true, data: products});
});

//GET /:id
export const getProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByPk(req.params.id);
    if(!product) {
        res.status(400).json({ success: false, message: '상품을 찾을 수 없습니다.'});
        return;
    }
    res.status(200).json({ success: true, data: product });
});

//PUT /:id
export const updateProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByPk(req.params.id);
    if(!product) {
        res.status(400).json({ success: false, message: '상품을 찾을 수 없습니다.'});
        return;
    }
    const { name, price, describe, stock } = req.body;
    await product?.update({ name, price, describe, stock });
    res.status(200).json({ success: true, data: product});
});

//DELETE /:id
export const deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByPk(req.params.id);
    if(!product) {
        res.status(400).json({ success: false, message: '상품을 찾을 수 없습니다.'});
        return;
    }
    await product?.destroy();
    res.status(200).json({ success: true, message: '상품이 삭제되었습니다.'});
});