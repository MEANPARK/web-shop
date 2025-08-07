import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import sequelize from '../../config/sequelizeDB.config';
import { OrderItem, Orders, Payment, Delivery, Cart } from '../associations';
import dotenv from 'dotenv';
dotenv.config();

//POST /create
export const createOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId, paymentMethod, deliveryAddress, items } = req.body;

  if (!userId || !paymentMethod || !deliveryAddress || !items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: '잘못된 요청입니다. 필수 데이터가 없습니다.' });
    return;
  }

  const t = await sequelize.transaction();

  try {
    const totalPrice = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    const order = await Orders.create({
      userId,
      totalPrice,
      status: 'pending'
    }, { transaction: t });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }, { transaction: t });
    }

    await Payment.create({
      orderId: order.id,
      method: paymentMethod,
      amount: totalPrice,
      status: 'pending'
    }, { transaction: t });

    await Delivery.create({
      orderId: order.id,
      address: deliveryAddress,
      status: 'preparing'
    }, { transaction: t });

    await Cart.destroy({ where: { userId }, transaction: t });

    await t.commit();

    res.status(201).json({ message: '주문이 성공적으로 생성되었습니다.', orderId: order.id });
  } catch (error) {
    await t.rollback();  // 반드시 직접 호출
    throw error;         // 에러 다시 던져서 asyncHandler가 받도록
  }
});

//GET /:userId
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const orders = await Orders.findAll({
    where: { userId },
    include: [
      { model: OrderItem, as: 'orderItems' },
      { model: Payment, as: 'payment' },
      { model: Delivery, as: 'delivery' }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({ orders });
});