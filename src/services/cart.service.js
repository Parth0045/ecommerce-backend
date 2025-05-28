import cart from '../models/cart.js';

const createCart = async ({ userId, productId, quantity }) => {
    const buyer_id = userId;
    const product_id = productId;
    const newCartItem = await cart.create({
        buyer_id,
        product_id,
        quantity,
    });

    return newCartItem;

    
};

const getCart = async (userId) => {
    const buyer_id = userId.userId;
    const cartItems = await cart.findAll({
        where: {
            buyer_id: buyer_id,
        },
    });
    console.log("hello");
    return cartItems;
};
const updateCart = async ({ userId, cartId, quantity }) => {
    const result = await cart.update({ quantity: quantity }, { where: { id: cartId } });
    const updated = result[0];
    console.log(updated);
    return updated;
};
const deleteCart = async ({ cartId }) => {
    const result = await cart.destroy({
        where: {
            id: cartId,
        },
    });
    console.log(result);
    return result;
};


export {
    createCart,
    getCart,
    updateCart,
    deleteCart
};

