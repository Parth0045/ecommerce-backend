import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const review = sequelize.define('review', {
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
    seller_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    buyer_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.TEXT,
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
    tableName: 'reviews',
    timestamps: false,
    underscored: true,
});

export default review;
