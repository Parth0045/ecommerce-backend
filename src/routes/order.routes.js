import express from 'express';
import {
    getSellerOrdersController,
    getSellerOrderByIdController,
    updateOrderStatusController,
    createBuyerOrderController,
    getBuyerOrdersController,
    getBuyerOrderByIdController,
    cancelBuyerOrderController,
    updateBuyerOrderAddressController,
    acceptOrderAndSendEmailController
} from '../controllers/order.controller.js';

import { userAuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/seller/orders', userAuthMiddleware, getSellerOrdersController);
router.get('/seller/orders/:id', userAuthMiddleware, getSellerOrderByIdController);
router.put('/seller/orders/:id/status', userAuthMiddleware, updateOrderStatusController);
router.post('/seller/orders/:orderId/accept', userAuthMiddleware, acceptOrderAndSendEmailController);

router.post('/buyer/orders', userAuthMiddleware, createBuyerOrderController);
router.get('/buyer/orders', userAuthMiddleware, getBuyerOrdersController);
router.get('/buyer/orders/:id', userAuthMiddleware, getBuyerOrderByIdController);
router.delete('/buyer/orders/:id', userAuthMiddleware, cancelBuyerOrderController);
router.put('/buyer/orders/:id/update-address', userAuthMiddleware, updateBuyerOrderAddressController);

export default router;

