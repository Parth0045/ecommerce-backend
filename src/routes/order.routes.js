import express from 'express';
import {
    getSellerOrders,
    getSellerOrderById,
    updateOrderStatus,
    acceptOrderAndSendEmail,
    createBuyerOrder,
    getBuyerOrders,
    getBuyerOrderById,
    cancelBuyerOrder,
    updateBuyerOrderAddress
} from '../controllers/order.controller.js';

import { userAuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/seller/orders', userAuthMiddleware, getSellerOrders);
router.get('/seller/orders/:id', userAuthMiddleware, getSellerOrderById);
router.put('/seller/orders/:id/status', userAuthMiddleware, updateOrderStatus);
router.post('/seller/orders/:orderId/accept', userAuthMiddleware, acceptOrderAndSendEmail);

router.post('/buyer/orders', userAuthMiddleware, createBuyerOrder);
router.get('/buyer/orders', userAuthMiddleware, getBuyerOrders);
router.get('/buyer/orders/:id', userAuthMiddleware, getBuyerOrderById);
router.delete('/buyer/orders/:id', userAuthMiddleware, cancelBuyerOrder);
router.put('/buyer/orders/:id/update-address', userAuthMiddleware, updateBuyerOrderAddress);

export default router;