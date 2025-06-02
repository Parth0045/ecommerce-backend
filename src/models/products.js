import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';
import categories from './categories.js';
import subCategories from './subCategories.js';

const product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  seller_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  subcategory_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  product_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: { min: 0 },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 0 },
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'products',
  timestamps: true,
  paranoid: true,
  underscored: true, // 🔧 This maps createdAt → created_at, etc.
});

product.belongsTo(categories, {
  foreignKey: 'category_id',
  as: 'category',
});

product.belongsTo(subCategories, {
  foreignKey: 'subcategory_id',
  as: 'subCategory',
});

export default product;
