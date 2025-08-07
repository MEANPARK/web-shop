import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/sequelizeDB.config';

interface DeliveryAttributes {
  id: string;
  orderId: string;
  address: string;
  status: 'preparing' | 'in_transit' | 'delivered';
}

interface DeliveryCreationAttributes extends Optional<DeliveryAttributes, 'id'> {}

export class Delivery extends Model<DeliveryAttributes, DeliveryCreationAttributes> implements DeliveryAttributes {
  public id!: string;
  public orderId!: string;
  public address!: string;
  public status!: 'preparing' | 'in_transit' | 'delivered';
}

Delivery.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('preparing', 'in_transit', 'delivered'),
    defaultValue: 'preparing'
  }
}, {
  sequelize,
  tableName: 'deliveries',
  timestamps: true
});