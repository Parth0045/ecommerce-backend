import { registerUser } from '../services/authService.js';
import { loginUser } from '../services/authService.js';
import { getUserProfile } from '../services/authService.js';
import { updateUserProfile } from '../services/authService.js';
import { resetUserPassword } from '../services/authService.js';
import { findUserByEmail, updateUserPassword } from '../services/authService.js';
import { sendEmail } from '../utils/emailService.js';
import { generateRandomPassword } from '../utils/password.js';

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role, phone_number } = req.body;
        const user = await registerUser({ first_name, last_name, email, password, role, phone_number });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        // Check if custom error thrown from service
        if (err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await loginUser(email, password);
        req.session.jwt = token;
        res.json({ token, message: 'Logged in successfully' });
    } catch (err) {
        console.error(err);
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Server error';
        res.status(statusCode).json({ message });
    }
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getUserProfile(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error in getProfile:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;
        await updateUserProfile(userId, updateData);
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating profile:', err);
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({ message: err.message || 'Server error' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPassword = generateRandomPassword();

        await updateUserPassword(user, newPassword);

        await sendEmail({
            to: user.email,
            subject: 'Your new password',
            text: `Your password has been reset. Your new password is: ${newPassword}`,
        });

        res.json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        console.error('Error in forgotPassword:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        // Make sure req.user exists (set by auth middleware)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old password and new password are required' });
        }
        await resetUserPassword(userId, oldPassword, newPassword);
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Error in resetPassword:', err);
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message || 'Server error' });
    }
};









