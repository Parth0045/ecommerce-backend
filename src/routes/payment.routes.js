import express from 'express';
import {
    getSellerPaymentsController,
    getSellerPaymentByOrderController,
    getSellerEarningsController,
    checkoutPaymentController,
    verifyPaymentController,
    getPaymentStatusController
} from '../controllers/payment.controller.js';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/seller/payments',userAuthMiddleware,getSellerPaymentsController);
router.get('/seller/payments/:orderId',userAuthMiddleware, getSellerPaymentByOrderController);
router.get('/seller/earnings', userAuthMiddleware,getSellerEarningsController);
router.post('/buyer/payments/checkout', userAuthMiddleware,checkoutPaymentController);
router.post('/buyer/payments/verify',userAuthMiddleware, verifyPaymentController);
router.get('/buyer/payments/status/:orderId',userAuthMiddleware, getPaymentStatusController);

export default router;
