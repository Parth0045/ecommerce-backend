import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const wishlist = sequelize.define('wishlist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  buyer_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
   product_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  added_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  }, {
  tableName: 'wishlist',
  timestamps: true,
  paranoid: true,
  underscored: true,
});

export default wishlist;
