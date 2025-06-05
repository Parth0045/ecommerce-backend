import cart from '../models/cart.js';

const createCart = async ({ buyer_id, ...cartItemBody }) => {

    const cartItem = await cart.create({
        buyer_id,
        ...cartItemBody
    });
   
    return cartItem;
};

const getCart = async ({ id }) => {
  
    const cartItems = await cart.findAll({
        where: {
            buyer_id: id,
        },
    });
  
    return cartItems;
};

const updateCart = async ({ cartId, quantity }) => {
  
    const updateCart = await cart.update({ quantity: quantity }, { where: { id: cartId } });
  
    return updateCart[0] > 0 ? true : false;
};

const deleteCart = async (cartId) => {
  
    const deletedCart = await cart.destroy({
        where: {
            id: cartId,
        },
    });
  
    return deletedCart;
};

export {
    createCart,
    getCart,
    updateCart,
    deleteCart
};

