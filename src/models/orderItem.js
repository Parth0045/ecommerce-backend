import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const orderItems = sequelize.define('order_items', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
        },
    },  
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
   
}, {
    tableName: 'orders_item',
    timestamps: false,
    underscored: true,
});

export default orderItems;
