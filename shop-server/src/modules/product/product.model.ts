import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/sequelizeDB.config';

interface ProductAttributes {
    id: string;
    name: string;
    price: number;
    describe: string;
    stock: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: string;
    public name!: string;
    public price!: number;
    public describe!: string;
    public stock!: number;
}

Product.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  describe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'products',
  timestamps: true
});