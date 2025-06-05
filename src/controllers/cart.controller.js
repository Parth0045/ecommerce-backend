import {
    createCart,
    deleteCart,
    getCart,
    updateCart
} from '../services/cart.service.js';

const createCartController = async (req, res) => {
  
    try {
  
        const cart = await createCart({ buyer_id: req.user.id, ...req.body });
  
        return res.status(200).json({
            error: false,
            message: "Cart create successfully!",
            data: cart
        });
  
    } catch (error) {
  
        throw Error(error);
  
    }
};

const getCartController = async (req, res) => {
  
    try {
  
        const cartItems = await getCart({ id: req.user.id });
  
        return res.status(200).json({
            error: false,
            message: "Cart retrieved successfully!",
            data: cartItems
        });
  
    } catch (error) {
  
        throw Error(error);
  
    }
};

const updateCartController = async (req, res) => {
  
    try {
  
        const updatedCartItems = await updateCart({cartId: req.params.id, ...req.body });
  
        return res.status(200).json({
            error: false,
            message: "Cart updated successfully!",
            data: updatedCartItems
        });
  
    } catch (error) {
  
        throw Error(error);
  
    }
};

const deleteCartController = async (req, res) => {
  
    try {

        const deletedCart = await deleteCart( req.params.id );
  
        return res.status(200).json({
            error: false,
            message: "Cart deleted successfully!",
            data: deletedCart
        });
  
    } catch (error) {
  
        throw Error(error);
  
    }
};

export {
    createCartController,
    getCartController,
    updateCartController,
    deleteCartController
}
