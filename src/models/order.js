import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const order = sequelize.define('order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    buyer_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
    },
    total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    delivery_address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'orders',
    timestamps: false,
    underscored: true,
});

export default order;
