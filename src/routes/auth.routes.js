import express from 'express';
import {
    createUserController,
    loginUserController,
    logoutUserController,
    forgotPasswordController
} from '../controllers/auth.controller.js';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', createUserController);
router.post('/login', loginUserController);
router.post('/logout', userAuthMiddleware, logoutUserController);
router.post('/forgot-password', forgotPasswordController);

export default router;
