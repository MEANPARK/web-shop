import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/sequelizeDB.config';

interface PaymentAttributes {
  id: string;
  orderId: string;
  method: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: string;
  public orderId!: string;
  public method!: string;
  public amount!: number;
  public status!: 'pending' | 'completed' | 'failed';
}

Payment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  }
}, {
  sequelize,
  tableName: 'payments',
  timestamps: true
});