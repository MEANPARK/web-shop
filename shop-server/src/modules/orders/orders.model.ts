import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/sequelizeDB.config';

interface OrdersAttributes {
  id: string;
  userId: string;
  totalPrice: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
}

interface OrdersCreationAttributes extends Optional<OrdersAttributes, 'id'> {}

export class Orders extends Model<OrdersAttributes, OrdersCreationAttributes> implements OrdersAttributes {
  public id!: string;
  public userId!: string;
  public totalPrice!: number;
  public status!: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
}

Orders.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  }
}, {
  sequelize,
  tableName: 'orders',
  timestamps: true
});