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
        allowNull: false,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
