import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // make sure this is a default export or adjust accordingly

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1h';
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export const registerUser = async ({ first_name, last_name, email, password, role, phone_number }) => {
    // Check if user with the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        const error = new Error('Email already in use');
        error.statusCode = 400;
        throw error;
    }

    // Hash the password with salt rounds = 10
    const password_hash = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
        first_name,
        last_name,
        email,
        password_hash,
        role: role || 'buyer',
        phone_number,
    });

    return user;
};

export const loginUser = async (email, password) => {
    // Find user by email and active status
    const user = await User.findOne({ where: { email, is_active: true } });
    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { token, user };
};


export const getUserProfile = async (userId) => {
    return await User.findByPk(userId, {
        attributes: { exclude: ['password_hash'] }
    });
};

export const updateUserProfile = async (userId, updateData) => {
    const filteredData = {};
    if (updateData.first_name !== undefined) {
        filteredData.first_name = updateData.first_name;
    }
    if (updateData.last_name !== undefined) {
        filteredData.last_name = updateData.last_name;
    }
    if (updateData.email !== undefined) {
        filteredData.email = updateData.email;
    }
    if (updateData.phone_number !== undefined) {
        filteredData.phone_number = updateData.phone_number;
    }
    const [updated] = await User.update(filteredData, { where: { id: userId } });
    if (!updated) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return true;
};

export const resetUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findByPk(userId);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    console.log(user.password_hash);
    console.log(oldPassword);
    
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    console.log(isMatch);
    
    if (!isMatch) {
        const error = new Error('Old password is incorrect');
        error.statusCode = 401;
        throw error;
    }

    // Hash new password and save
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = newHashedPassword;
    await user.save();

    return true; // indicates success
};

export const updateUserPassword = async (user, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password_hash = hashedPassword;
  await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};