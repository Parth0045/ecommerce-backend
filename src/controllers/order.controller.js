import order from '../models/order.js';
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
    calculateOrderDetails,
    createOrderItemService,
    deleteOrderItemService
    

} from '../services/order.service.js';

const createBuyerOrderController = async (req, res) => {
    try {
        const buyerId = req.user.id;
        console.log(buyerId);
        const delivery_address = req.body.delivery_address;
        console.log(delivery_address);
        const products = req.body.products;
        const orderDetails = await calculateOrderDetails(products);
        const seller_id = orderDetails.seller_id;
        const total_amount = orderDetails.total_amount;
        console.log(orderDetails);
        
        const result = await createOrderService({ buyerId, seller_id, delivery_address, total_amount });

        const orderItem = await createOrderItemService(products, buyerId);

        res.json({ message: 'Order created', order: result });

    } catch (err) {
        res.json({ message: err.message });
    }
};

const getBuyerOrdersController = async (req, res) => {
    try {
        const buyerId = req.user.id;
        const orders = await getBuyerOrdersService(buyerId);
        res.json(orders);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const getBuyerOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getBuyerOrderByIdService(orderId);
        res.json(order);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const cancelBuyerOrderController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const result = await cancelBuyerOrderService(orderId);
        const deleteWithOrderItem = await deleteOrderItemService(orderId);
        res.json({ message: 'Order cancellation requested', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const updateBuyerOrderAddressController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const delivery_address  = req.body.delivery_address;
        const result = await updateBuyerOrderAddressService(orderId, delivery_address);
        res.json({ message: 'Delivery address updated', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const getSellerOrdersController = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const ordersWithItems = await getSellerOrdersService(sellerId);

        res.json({ orders: ordersWithItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getSellerOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getSellerOrderByIdService(orderId);
        res.json(order);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const updateOrderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const status  = req.body.status;
        const result = await updateOrderStatusService(orderId, status);
        res.json({ message: 'Order status updated', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const acceptOrderAndSendEmailController = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await acceptOrderAndSendEmailService(orderId);
        res.json({ message: 'Order accepted and email sent', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

export {
    getSellerOrdersController,
    getSellerOrderByIdController,
    updateOrderStatusController,
    createBuyerOrderController,
    getBuyerOrdersController,
    getBuyerOrderByIdController,
    cancelBuyerOrderController,
    updateBuyerOrderAddressController,
    acceptOrderAndSendEmailController
}

