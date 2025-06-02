import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const payment = sequelize.define('payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    buyer_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    seller_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    payment_status: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'pending',
    },
    transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    paid_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
    tableName: 'payments',
    timestamps: true,
    underscored: true,
});

export default payment;
