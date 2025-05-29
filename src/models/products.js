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
    allowNull: false,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  subcategory_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  product_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
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
    allowNull: true,
  },
}, {
  tableName: 'products',
  timestamps: false,
  paranoid: false,
});

// ✅ Define associations
product.belongsTo(categories, {
  foreignKey: 'category_id',
  as: 'category',
});

product.belongsTo(subCategories, {
  foreignKey: 'subcategory_id',
  as: 'subCategory',
});

export default product;
