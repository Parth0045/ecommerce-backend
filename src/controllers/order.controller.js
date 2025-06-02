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
        const orders = await getBuyerOrders({buyerId: req.user.id});
        return res.status(200).json({
            error: false,
            message: 'Order retrived successfully!',
            data: orders
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const getBuyerOrderByIdController = async (req, res) => {
    try {
        const order = await getBuyerOrderById(req.params.id);
        return res.status(200).json({
            error: false,
            message: 'Order retrived by id successfully!',
            data: order
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const cancelBuyerOrderController = async (req, res) => {
    try {
        // const orderId = req.params.id;
        const cancleOrder = await cancelBuyerOrder(req.params.id);
        const deleteWithOrderItem = await deleteOrderItem(req.params.id);
        return res.status(200).json({
            error: false,
            message: 'Order deleted successfully!',
            data: cancleOrder,deleteWithOrderItem
        }); 
    } catch (error) {
        throw Error(error);
    }
};

const updateBuyerOrderAddressController = async (req, res) => {
    try {
        const updateAddress = await updateBuyerOrderAddress({
            id: req.params.id,
            ...req.body
        });

        return res.status(200).json({
            error: false,
            message: 'Order address updated successfully!',
            data: updateAddress
        });

    } catch (error) {
        throw Error(error);
    }
};

const getSellerOrdersController = async (req, res) => {
    try {
        const ordersWithItems = await getSellerOrders({sellerId: req.user.id});
            return res.status(200).json({
            error: false,
            message: 'Order retrived successfully!',
            data: ordersWithItems
        });

    } catch (error) {
        throw Error(error);
    }
};

const getSellerOrderByIdController = async (req, res) => {
    try {
        // const orderId = req.params.id;
        const order = await getSellerOrderById({orderId:req.params.id});
            return res.status(200).json({
            error: false,
            message: 'Order retrived by id successfully!',
            data: order
        });

    } catch (error) {
        throw Error(error);
    }
};

const updateOrderStatusController = async (req, res) => {
    try {
        const updatedOrderStatus = await updateOrderStatus(req.params.id, req.body.status);
            return res.status(200).json({
            error: false,
            message: 'Order status updated successfully!',
            data: updatedOrderStatus
        });

    } catch (error) {
        throw Error(error);
    }
};

const acceptOrderAndSendEmailController = async (req, res) => {
    try {
        const result = await acceptOrderAndSendEmail(req.params.orderId);
        return res.status(200).json({
            error: false,
            message: 'Order accepted and send mail successfully!',
            data: result
        });

    } catch (error) {
        throw Error(error);
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

