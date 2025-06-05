import payment from '../models/payment.js';

const getSellerPayments = async (sellerId) => {
    return await payment.findAll({ where: { seller_id: sellerId } });
};

const getSellerPaymentByOrderId = async (sellerId, orderId) => {
    return await payment.findOne({ where: { seller_id: sellerId, order_id: orderId } });
};

const getSellerEarnings = async (sellerId) => {

    const payments = await payment.findAll({
        where: {
            seller_id: sellerId,
            payment_status: 'success'
        }
    });

    let totalEarnings = 0;

    for (let payment of payments) {
        totalEarnings = totalEarnings + parseFloat(payment.amount);
    }

    const result = {
        total_earnings: totalEarnings,
        total_orders: payments.length
    };

    return result;
};

const checkoutPayment = async (buyerId, payload) => {

    const newPayment = await payment.create({
        buyer_id: buyerId,
        payment_status: 'pending',
        ...payload
    });

    return newPayment;
};

const verifyPayment = async ({ transaction_id, status }) => {

    const updated = await payment.update(
        { payment_status: status },
        { where: { transaction_id } }
    );

    return updated[0] > 0;
};

const getPaymentStatus = async (buyerId, orderId) => {

    return await payment.findOne({

        where: {
            buyer_id: buyerId,
            order_id: orderId
        }

    });
};

export {
    getSellerPayments,
    getSellerPaymentByOrderId,
    getSellerEarnings,
    checkoutPayment,
    verifyPayment,
    getPaymentStatus
} 