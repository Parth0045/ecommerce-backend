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
    allowNull: false,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  sub_category_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'sub_categories',
  timestamps: true,    
  paranoid: true,      
  underscored: true,  
});

export default subCategories;
