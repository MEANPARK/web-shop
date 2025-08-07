import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/sequelizeDB.config';

interface OrderItemAttributes {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

export class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
}

OrderItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'order_items',
  timestamps: true
});