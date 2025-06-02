import {
    getSellerPayments,
    getSellerPaymentByOrderId,
    getSellerEarnings,
    checkoutPayment,
    verifyPayment,
    getPaymentStatus
} from '../services/payment.service.js';

const getSellerPaymentsController = async (req, res) => {
    try {
        const payments = await getSellerPayments(req.user.id);
        return res.status(200).json({
            error: false,
            message: 'payment retrived successfully!',
            data: payments
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const getSellerPaymentByOrderController = async (req, res) => {
    try {
        const payment = await getSellerPaymentByOrderId(req.user.id, req.params.orderId);
        return res.status(200).json({
            error: false,
            message: 'Payment get by id successfully!',
            data: payment
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const getSellerEarningsController = async (req, res) => {
    try {
        const earnings = await getSellerEarnings(req.user.id);
        return res.status(200).json({
            error: false,
            message: 'All earnings retrived successfully!',
            data: earnings
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const checkoutPaymentController = async (req, res) => {
    try {
        const result = await checkoutPayment(req.user.id, req.body);
        return res.status(200).json({
            error: false,
            message: 'Payment checkout successfully!',
            data: result
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const verifyPaymentController = async (req, res) => {
    try {
        const result = await verifyPayment(req.body);
        return res.status(200).json({
            error: false,
            message: 'Payment verify successfully!',
            data: result
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const getPaymentStatusController = async (req, res) => {
    try {
        const status = await getPaymentStatus(req.user.id, req.params.orderId);
        return res.status(200).json({
            error: false,
            message: 'Payment status successfully!',
            data: status
        }); 
    } catch (error) {
        throw Error(error);
    }
};

export {
    getSellerPaymentsController,
    getSellerPaymentByOrderController,
    getSellerEarningsController,
    checkoutPaymentController,
    verifyPaymentController,
    getPaymentStatusController
} 