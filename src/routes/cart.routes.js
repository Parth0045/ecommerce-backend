import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import {
    createCartController,
    getCartController,
    updateCartController,
    deleteCartController
} from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/buyer/cart', userAuthMiddleware, createCartController);
router.get('/buyer/cart', userAuthMiddleware, getCartController);
router.put('/buyer/cart/:id', userAuthMiddleware, updateCartController);
router.delete('/buyer/cart/:id', userAuthMiddleware, deleteCartController);
router.delete('/buyer/cart/:itemId', userAuthMiddleware,);

export default router;
