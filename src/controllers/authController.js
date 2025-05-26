import { registerUser } from '../services/authService.js';
import { loginUser } from '../services/authService.js';
import { getUserProfile } from '../services/authService.js';
import { updateUserProfile } from '../services/authService.js';
import { resetUserPassword } from '../services/authService.js';
import { findUserByEmail } from '../services/authService.js';
import { forgotUserPassword } from '../services/authService.js';
import { sendEmail } from '../utils/emailService.js';
import { generateRandomPassword } from '../utils/password.js';

export const register = async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const phone_number = req.body.phone_number;
        const user = await registerUser({ first_name, last_name, email, password, role, phone_number });
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }

};

export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await loginUser(email, password);
        const token = result.token; req.session.jwt = token;
        console.log(email);
        
        res.json({ token, message: 'Logged in successfully' });
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getUserProfile(userId);
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.json({ message: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;
        await updateUserProfile(userId, updateData);
        res.json({ message: 'Profile updated successfully' });
    } catch  (err) {
        res.    json({ message: err.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const user = await findUserByEmail(email);
        console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const newPassword = generateRandomPassword();

        await forgotUserPassword(user, newPassword);

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
        const userId = req.user.id;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        if (!oldPassword || !newPassword) {
            return res.json({ message: 'Old password and new password are required' });
        }

        const result = await resetUserPassword(userId, oldPassword, newPassword);

        return res.json({ message: result.message });
    } catch (err) {
        res.json({ message: 'Server error' });
    }
};










