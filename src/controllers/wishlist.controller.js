import {
    createWishlist,
    deleteWishlist,
    getWishlist
} from '../services/wishlist.service.js';

const createWishlistController = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.body.product_id;
        const wishlist = await createWishlist({ userId, productId });
        res.json({ message: 'wishlist add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const getWishlistController = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlistItem = await getWishlist({ userId });
        res.json(wishlistItem);
    } catch (err) {
        res.json({ message: err.message });
    }
};

const deleteWishlistController = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(productId);
        const categorie = await deleteWishlist({ productId });
        res.send({ message: 'wishlist deleted successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

export {
 getWishlistController,
 createWishlistController,
 deleteWishlistController
}