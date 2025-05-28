import {
    createCart,
    deleteCart,
    getCart,
    updateCart

} from '../services/cart.service.js';
const createCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.body.product_id;
        const quantity = req.body.quantity;
        console.log("from controller", productId);
        console.log("from controller", quantity);
        const carts = await createCart({ userId, productId, quantity });
        res.json({ message: 'cart add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const getCartController = async (req, res) => {
    try {

        const userId = req.user.id;
        const cartItems = await getCart({ userId });
        res.json(cartItems);
    } catch (err) {
        res.json({ message: err.message });
    }
};

const updateCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartId = req.params.id;
        const quantity = req.body.quantity;

        const updatedCartItems = await updateCart({ cartId, quantity });
        res.send({ message: 'Categorie updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const deleteCartController = async (req, res) => {
    try {

        const cartId = req.params.id;
        const categorie = await deleteCart({ cartId });
        res.send({ message: 'cart deleted successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

export {
    createCartController,
    getCartController,
    updateCartController,
    deleteCartController
}