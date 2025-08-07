import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/sequelizeDB.config';

interface CartAttributes {
  id: string;
  userId: string;
  productId: string; 
  quantity: number;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: string;
  public userId!: string;
  public productId!: string; 
  public quantity!: number;
}

Cart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: { //개수
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: 'carts',
  timestamps: true
});