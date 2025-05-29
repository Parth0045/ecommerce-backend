import order from '../models/order.js';
import users from '../models/user.js';
import product from '../models/products.js';
import orderItems from '../models/orderItem.js';
import { sendOrderAcceptedEmail } from '../utils/emailOrderService.js';  // adjust relative path if needed

const createOrderService = async ({ buyerId, seller_id, delivery_address, total_amount }) => {
    const orders = await order.create({
        buyer_id: buyerId,
        seller_id,
        delivery_address,
        total_amount,
        order_date: new Date(),
        status: 'Pending',

    });
    return orders;
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
    const ordersWithItems = [];
    for (const singleOrder of orders) {
        const orderItemsData = await orderItems.findAll({ where: { order_id: singleOrder.id } });
        ordersWithItems.push({...singleOrder.dataValues,  items: orderItemsData});
    }
    return ordersWithItems;
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

const acceptOrderAndSendEmailService = async (orderId) => {
    const orders = await order.findByPk(orderId);
    const buyer = await users.findByPk(orders.buyer_id);
    orders.status = 'Accepted';
    await orders.save();
    await sendOrderAcceptedEmail(buyer.email, orderId);
    return orders;
};

const calculateOrderDetails = async (products) => {
    let total_amount = 0;
    let seller_id = null;

    for (const item of products) {
        const products = await product.findByPk(item.product_id);
        seller_id = products.seller_id;
        total_amount = total_amount + item.quantity * products.price;
    }
    return { seller_id, total_amount };
};

const createOrderItemService = async (products, buyer_id) => {
    try {
        const orders = await order.findAll({ where: { buyer_id } });
        for (const order of orders) {
            for (const item of products) {
                const existingOrderItem = await orderItems.findOne({
                    where: {
                        order_id: order.id,
                        product_id: item.product_id
                    },
                });

                if (existingOrderItem) 
                {
                        console.log("existing is skip")
                }else
                    {
                    const productData = await product.findByPk(item.product_id);
                    await orderItems.create({
                        order_id: order.id,
                        product_id: item.product_id,
                        price: productData.price,
                        quantity: item.quantity,
                    });
                    console.log("Created order item for order:");
                }
            }
        }
    } catch (error) {
        console.error("Error creating order items:", error.message);
    }
};

const deleteOrderItemService = async (orderId) => {
    const result = await orderItems.destroy({
        where: {
            order_id: orderId,
        },
    });
    console.log(result);
    return result;
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
    calculateOrderDetails,
    acceptOrderAndSendEmailService,
    createOrderItemService,
    deleteOrderItemService
} 
