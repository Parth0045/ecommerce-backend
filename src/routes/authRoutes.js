import express from 'express';
import { register } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { logout } from '../controllers/authController.js';
import { getProfile } from '../controllers/authController.js';
import { updateProfile } from '../controllers/authController.js';
import { forgotPassword } from '../controllers/authController.js';
import { resetPassword } from '../controllers/authController.js';
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
