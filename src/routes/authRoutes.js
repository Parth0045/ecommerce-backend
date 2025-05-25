import express from 'express';
import {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    forgotPassword,
    resetPassword
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', authenticate, resetPassword);
export default router;
