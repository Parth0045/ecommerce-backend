import {
    createOrder,
    getSellerOrders,
    getSellerOrderById,
    updateOrderStatus,
    acceptOrderAndSendEmail,
    getBuyerOrders,
    getBuyerOrderById,
    cancelBuyerOrder,
    updateBuyerOrderAddress,
    calculateOrderDetails,
    deleteOrderItem


} from '../services/order.service.js';

const createBuyerOrderController = async (req, res) => {
    try {
        const products = req.body.products;
        const orderDetails = await calculateOrderDetails(products);
        const order = await createOrder({ buyer_id: req.user.id, ...orderDetails, ...req.body });
        return res.status(200).json({
            error: false,
            message: 'Order created successfully!',
            data: order
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const getBuyerOrdersController = async (req, res) => {
    try {
        const buyerId = req.user.id;
        const orders = await getBuyerOrders(buyerId);
        res.json(orders);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const getBuyerOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getBuyerOrderById(orderId);
        res.json(order);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const cancelBuyerOrderController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const result = await cancelBuyerOrder(orderId);
        const deleteWithOrderItem = await deleteOrderItem(orderId);
        res.json({ message: 'Order cancellation requested', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const updateBuyerOrderAddressController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const delivery_address = req.body.delivery_address;
        const result = await updateBuyerOrderAddress(orderId, delivery_address);
        res.json({ message: 'Delivery address updated', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const getSellerOrdersController = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const ordersWithItems = await getSellerOrders(sellerId);

        res.json({ orders: ordersWithItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getSellerOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getSellerOrderById(orderId);
        res.json(order);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const updateOrderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const status = req.body.status;
        const result = await updateOrderStatus(orderId, status);
        res.json({ message: 'Order status updated', result });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const acceptOrderAndSendEmailController = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await acceptOrderAndSendEmail(orderId);
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

