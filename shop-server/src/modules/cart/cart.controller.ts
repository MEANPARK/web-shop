import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import { Cart, Product } from '../associations';
import dotenv from 'dotenv';
dotenv.config();

//POST /add
export const addCart = asyncHandler(async (req:Request, res:Response): Promise<void> => {
    const { userId, productId, quantity } = req.body;
    const existing = await Cart.findOne({ where: { userId, productId }}); 

    if(existing) {
        existing.quantity += quantity;
        await existing.save();
        res.status(201).json({ success: true, message: '수량이 추가되었습니다.', data: existing});
        return;
    }

    const cart = await Cart.create( {userId, productId, quantity });
    res.status(201).json({ success: true, message: '장바구니에 추가되었습니다.', data: cart});
});

//GET /:userId
export const getAllCart = asyncHandler(async (req:Request, res:Response): Promise<void> => {
    const { userId } = req.params;

    const cartList = await Cart.findAll({ where: {userId}, include: [Product]});
    res.status(200).json({ success: true, data: cartList});
});

//DELETE /:id
export const deleteCart = asyncHandler(async (req:Request, res:Response): Promise<void> => {
    const { id } = req.params;

    await Cart.destroy({where:{id}});
    res.status(200).json({success: true, message: '장바구니에서 삭제되었습니다.'});
});