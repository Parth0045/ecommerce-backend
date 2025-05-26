import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const users = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('seller', 'buyer'),
    allowNull: false,
    defaultValue: 'buyer',
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'users',
  timestamps: false,
  paranoid: true,
  underscored: true,
});

export default users  ;
