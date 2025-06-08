import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const categories = sequelize.define('category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  seller_id: {
    type: DataTypes.UUID,
    allowNull: false,   // assuming seller_id is required
  },
  category_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'categories',
  timestamps: true,    
  paranoid: true,      
  underscored: true,   
});

export default categories;
