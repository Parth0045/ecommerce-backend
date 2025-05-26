import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({path: '../.env'});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;


const createUser = async ({ first_name, last_name, email, password, role, phone_number }) => {
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
        const error = new Error('Email already in use');
        throw error;
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = await users.create({
        first_name,
        last_name,
        email,
        password_hash,
        role: role || 'buyer',
        phone_number,
    });
    return user;
};

const loginUser = async (email, password) => {
    const user = await users.findOne({ where: { email, is_active: true } });
    if (!user) {
        const error = new Error('Invalid email or password');
        throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
        const error = new Error('Invalid email or password');
        throw error;
    }
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
    return { token, user };
};

const findUser = async (userId) => {
    const user = await users.findByPk(userId);
    
    return user;
};

const updateUser = async (userId, updateData) => {
    const filteredData = {
        first_name: updateData.first_name,
        last_name: updateData.last_name,
        email: updateData.email,
        phone_number: updateData.phone_number,
    };
    const result = await users.update(filteredData, { where: { id: userId } });
    const updated = result[0];
    if (updated) {
        return true;
    } else {
        return 'User not found';
    }

};

const resetUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await users.findByPk(userId);
    if (!user) {
        return { message: 'User not found' };
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
        return { message: 'Old password is incorrect' };
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = newHashedPassword;
    await user.save();
    return { message: 'Password reset successful' };
};

const forgotUserPassword = async (user, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();
};

const findUserByEmail = async (email) => {
    return await users.findOne({ where: { email } });
};

export {
  createUser,
  loginUser,
  findUser,
  updateUser,
  resetUserPassword,
  forgotUserPassword,
  findUserByEmail
};