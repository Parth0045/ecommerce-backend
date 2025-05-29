import order from '../models/order.js';
import users from '../models/user.js';
import { sendOrderAcceptedEmail } from '../utils/emailOrderService.js';  // adjust relative path if needed

const createOrderService = async ({ buyerId, seller_id, delivery_address, total_amount }) => {
    return await order.create({
        buyer_id: buyerId,
        seller_id,
        delivery_address,
        total_amount,
        order_date: new Date(),
        status: 'Pending',
    });
};

const getBuyerOrdersService = async (buyerId) => {
    const orders = await order.findAll({ where: { buyer_id: buyerId } });
    return orders;
};

const getBuyerOrderByIdService = async (orderId) => {
    const orders = await order.findByPk(orderId);
    return orders;
};

const cancelBuyerOrderService = async (orderId) => {
    const orders = await order.findByPk(orderId);
    if (orders.status === 'Shipped') {
        return res.json({ error: 'Cannot cancel a shipped order' });
    }
    orders.status = 'Cancelled';
    const updatedOrder = await orders.save();
    return updatedOrder;
};

const updateBuyerOrderAddressService = async (orderId, delivery_address) => {
    const orders = await order.findByPk(orderId);
    orders.delivery_address = delivery_address;
    await orders.save();
    return orders;
};

const getSellerOrdersService = async (sellerId) => {
    const orders = await order.findAll({ where: { seller_id: sellerId } });
    return orders;
};

const getSellerOrderByIdService = async (orderId) => {
    const orderData = await order.findByPk(orderId);
    return orderData;
};

const updateOrderStatusService = async (orderId, status) => {
    const orders = await order.findByPk(orderId);
    orders.status = status;
    await orders.save();
    return orders;
};

export const acceptOrderAndSendEmailService = async (orderId) => {
    const orders = await order.findByPk(orderId);
    const buyer = await users.findByPk(orders.buyer_id);
    orders.status = 'Accepted';
    await orders.save();
    await sendOrderAcceptedEmail(buyer.email, orderId);
    return orders;
};

export {
    createOrderService,
    getSellerOrdersService,
    getSellerOrderByIdService,
    updateOrderStatusService,
    getBuyerOrdersService,
    getBuyerOrderByIdService,
    cancelBuyerOrderService,
    updateBuyerOrderAddressService,
    
} 