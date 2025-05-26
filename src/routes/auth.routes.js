import express from 'express';
import { createUserController, loginUserController, logoutUserController, getUserController, forgotPasswordController, resetPasswordController, updateUserController } from '../controllers/auth.controller.js'; 
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', createUserController);
router.post('/login', loginUserController);
router.post('/logout', userAuthMiddleware, logoutUserController);
router.get('/profile', userAuthMiddleware, getUserController);
router.put('/profile', userAuthMiddleware, updateUserController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', userAuthMiddleware, resetPasswordController);

export default router;
