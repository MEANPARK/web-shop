import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/sequelizeDB.config';

interface UserAttributes {
  id: string;
  username: string;
  password: string;
  name?: string;
  phone?: string;
  gender?: string;
  email?: string;
  role?: 'admin' | 'user';
  provider: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public password!: string;
  public name?: string;
  public phone?: string;
  public gender?: string;
  public email?: string;
  public role?: 'admin' | 'user';
  public provider!: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  gender: DataTypes.STRING,
  email: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user"
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});