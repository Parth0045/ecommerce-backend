import express from 'express';
import {
    getUserController,
    resetPasswordController,
    updateUserController
} from '../controllers/user.controller.js';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/profile', userAuthMiddleware, getUserController);
router.put('/profile/:id', userAuthMiddleware, updateUserController);
router.post('/reset-password', userAuthMiddleware, resetPasswordController);

export default router;
