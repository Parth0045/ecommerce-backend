import {
    createUser,
    loginUser,
    findUser,
    updateUser,
    resetUserPassword,
    forgotUserPassword
} from '../services/auth.service.js';
import { sendEmail } from '../utils/emailService.js';
import { generateRandomPassword } from '../utils/password.js';

const createUserController = async (req, res) => {
    try {
        const user = await createUser(req.body);
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
        return res.status(200).json({
            error: false,
            message: "Logged out successfully",
            data: null,
        });
    });
};

const getUserController = async (req, res) => {
    try {
        const user = await findUser(req.user.id);
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
        const updateResult = await updateUser({ id: req.user.id, ...req.body });
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
        if (!req.body.oldPassword || !req.body.newPassword) {
            return res.json({ message: 'Old password and new password are required' });
        }
        const resetPassword = await resetUserPassword({ userId: req.user.id, ...req.body });
        res.status(200).json({
            error: false,
            message: "Reset password successful",
            data: resetPassword
        });
    } catch (error) {
        throw Error(error);
    }
};

const forgotPasswordController = async (req, res) => {
    try {
        const newPassword = generateRandomPassword();
        const user = await forgotUserPassword(req.body.email, newPassword);
        await sendEmail(newPassword, req.body.email);
        res.json({
            status: 'success',
            message: 'Password sent to your email id',
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










