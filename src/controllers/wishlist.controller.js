import {
    createWishlist,
    deleteWishlist,
    getWishlist
} from '../services/wishlist.service.js';

const createWishlistController = async (req, res) => {
    try {
        const wishlist = await createWishlist({ buyer_id: req.user.id, ...req.body });
        return res.status(200).json({
            error: false,
            message: "Wishlist create successfully!",
            data: wishlist
        });
    } catch (error) {
        throw Error(error);
    }
};

const getWishlistController = async (req, res) => {
    try {
        // const userId = req.user.id;
        const wishlistItem = await getWishlist(req.user.id);
        return res.status(200).json({
            error: false,
            message: "Wishlist retrived successfully!",
            data: wishlistItem
        });
    } catch (error) {
        throw Error(error);
    }
};

const deleteWishlistController = async (req, res) => {
    try {
        const deletedWishlist = deleteWishlist(req.params.productId);
        return res.status(200).json({
            error: false,
            message: "Wishlist deleted successfully!",
            data: deletedWishlist
        });
    } catch (error) {
        throw Error(error);
    }
};

export {
    getWishlistController,
    createWishlistController,
    deleteWishlistController
}