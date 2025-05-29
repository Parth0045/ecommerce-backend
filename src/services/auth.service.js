import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '../.env' });

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;


const createUser = async (userBody) => {
    const { email } = userBody;
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    return await users.create({ ...userBody });
};

const loginUser = async ({ email, password }) => {
    const user = await users.findOne({ where: { email, is_active: true } });
    if (!user || !(await user.validPassword(password))) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
    return { token, user };
};


const findUser = async (userId) => {
    return await users.findByPk(userId);
};

const updateUser = async ({ id, ...userBody }) => {
    const result = await users.update(
        { ...userBody },
        { where: { id } }
    );
    // result[0] is the number of affected rows
    return result[0] > 0 ? true : false;
};


const resetUserPassword = async ({ userId, oldPassword, newPassword }) => {
    const user = await users.findByPk(userId);
    if (!user) {
        return { message: 'User not found' };
    }
    const isValid = await user.validPassword(oldPassword);
    if (!isValid) {
        return { message: 'Old password is incorrect' };
    }
    user.password_hash = newPassword;
    await user.save();
    return { message: 'Password reset successful' };
};

const forgotUserPassword = async (email, newPassword) => {
    const user = await users.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    user.password_hash = newPassword;
    await user.save();
    return user;
};




export {
    createUser,
    loginUser,
    findUser,
    updateUser,
    resetUserPassword,
    forgotUserPassword,

};