import { createUser, loginUser, findUser, updateUser, resetUserPassword, forgotUserPassword } from '../services/auth.service.js';
import { sendEmail } from '../utils/emailService.js';
import { generateRandomPassword } from '../utils/password.js';

const createUserController = async (req, res) => {
    try {
        const userBody = req.body;
        const user = await createUser(userBody);
        return res.status(200).json({
            error: false,
            message: 'User registered successfully!',
            data: { user }
        });
    } catch (error) {
        throw Error(error);
    }
};

const loginUserController = async (req, res) => {
    try {
        const { token, user } = await loginUser(req.body);
        req.session.jwt = token;
        return res.status(200).json({
            error: false,
            message: "You have login successfully!",
            data: { user: user, token: token },
        });
    } catch (error) {
        throw Error(error);
    }
};

const logoutUserController = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
};

const getUserController = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await findUser(userId);
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        return res.status(200).json({
            error: false,
            message: 'User get successfully!',
            data: { user }
        });
    }
    catch (error) {
        throw Error(error);
    }
};

const updateUserController = async (req, res) => {
    try {
        const userBody = req.body;
        const updateResult = await updateUser({ id: req.user.id, ...userBody });
        res.status(200).json({
            error: false,
            message: "Update successful",
            data: updateResult
        });
    } catch (error) {
        throw Error(error);

    }
};
const resetPasswordController = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!req.body.oldPassword || !req.body.newPassword) {
            return res.json({ message: 'Old password and new password are required' });
        }
        const result = await resetUserPassword({ userId, ...req.body });
        res.json({ message: result.message });
    } catch (error) {
        throw Error(error);
    }
};

const forgotPasswordController = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const newPassword = generateRandomPassword();
        const user = await forgotUserPassword(email, newPassword);  // returns user if success
        await sendEmail(newPassword, email);
        res.json({
            status: 'success',
            message: 'Password sent to your email id',
            timestamp: new Date().toISOString(),
            data: user
        });

    } catch (error) {
        throw Error(error);
    }
};
export {
    createUserController,
    loginUserController,
    logoutUserController,
    getUserController,
    forgotPasswordController,
    resetPasswordController,
    updateUserController,
};










