import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';
import bcrypt from 'bcrypt';

const users = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('seller', 'buyer'),
    allowNull: true,
    defaultValue: 'buyer',
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'users',
  timestamps: true,    // Enables created_at and updated_at managed by Sequelize
  paranoid: true,      // Enables soft deletes with deleted_at managed by Sequelize
  underscored: true,   // Uses snake_case column names like created_at instead of createdAt
  hooks: {
    beforeCreate: async (user) => {
      if (user.password_hash) {
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password_hash')) {
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      }
    },
  }
});

function validPassword(password) {
  return bcrypt.compareSync(password, this.password_hash);
}

users.prototype.validPassword = validPassword;

export default users;
