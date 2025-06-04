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

const forgotUserPassword = async (email, newPassword) => {
   
    const user = await users.findOne({ where: { email } });
   
    user.password_hash = newPassword;
   
    await user.save();   
    return user;
};

export {
    createUser,
    loginUser,
    forgotUserPassword
};