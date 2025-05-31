import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const subCategories = sequelize.define('subcategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
   seller_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  sub_category_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
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
  tableName: 'sub_categories',
  timestamps: true,
  paranoid: true,
  underscored: true,
});

export default subCategories;
