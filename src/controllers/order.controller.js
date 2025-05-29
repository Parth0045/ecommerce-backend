import {
    createOrderService,
    getSellerOrdersService,
    getSellerOrderByIdService,
    updateOrderStatusService,
    acceptOrderAndSendEmailService,
    getBuyerOrdersService,
    getBuyerOrderByIdService,
    cancelBuyerOrderService,
    updateBuyerOrderAddressService,
} from '../services/order.service.js';
import { calculateOrderDetails } from '../services/products.service.js';

const createBuyerOrder = async (req, res) => {
    try {
        const buyerId = req.user.id;
        console.log(buyerId);
        const delivery_address = req.body.delivery_address;
        console.log(delivery_address);
        const products = req.body.products;
        const orderDetails = await calculateOrderDetails(products);
        const seller_id = orderDetails.seller_id;
        const total_amount = orderDetails.total_amount;
        const result = await createOrderService({ buyerId, seller_id, delivery_address, total_amount });
        res.json({ message: 'Order created', order: result });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const getBuyerOrders = async (req, res) => {
    try {
        const buyerId = req.user.id;
        const orders = await getBuyerOrdersService(buyerId);
        res.json(orders);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const getBuyerOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getBuyerOrderByIdService(orderId);
        res.json(order);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const cancelBuyerOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const result = await cancelBuyerOrderService(orderId);
        res.json({ message: 'Order cancellation requested', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const updateBuyerOrderAddress = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { delivery_address } = req.body;
        const result = await updateBuyerOrderAddressService(orderId, delivery_address);
        res.json({ message: 'Delivery address updated', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const getSellerOrders = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const orders = await getSellerOrdersService(sellerId);
        res.json(orders);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const getSellerOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getSellerOrderByIdService(orderId);
        res.json(order);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const status  = req.body.status;
        const result = await updateOrderStatusService(orderId, status);
        res.json({ message: 'Order status updated', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const acceptOrderAndSendEmail = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await acceptOrderAndSendEmailService(orderId);
        res.json({ message: 'Order accepted and email sent', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

export {
    getSellerOrders,
    getSellerOrderById,
    updateOrderStatus,
    createBuyerOrder,
    getBuyerOrders,
    getBuyerOrderById,
    cancelBuyerOrder,
    updateBuyerOrderAddress,
    acceptOrderAndSendEmail
}