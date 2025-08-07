import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { Cart } from '../cart/cart.model';
import { Orders } from '../orders/orders.model';
import { OrderItem } from '../orders/orderItem.model';
import { Payment } from '../payment/payment.model';
import { Delivery } from '../delivery/delivery.model';

console.log('Associations loaded');

// 관계 정의
User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Cart, { foreignKey: 'productId', onDelete: 'CASCADE' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

// User ↔ Order
User.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(User, { foreignKey: 'userId' });

// Order ↔ OrderItem
Orders.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Orders, { foreignKey: 'orderId' });

// Product ↔ OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Order ↔ Payment
Orders.hasOne(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Orders, { foreignKey: 'orderId' });

// Order ↔ Delivery
Orders.hasOne(Delivery, { foreignKey: 'orderId' });
Delivery.belongsTo(Orders, { foreignKey: 'orderId' });

export {
  User,
  Product,
  Cart,
  Orders,
  OrderItem,
  Payment,
  Delivery
};