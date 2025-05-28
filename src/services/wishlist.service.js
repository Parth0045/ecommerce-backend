import wishlist from '../models/wishlist.js';
import cart from '../models/wishlist.js';

const createWishlist = async ({ userId, productId }) => {
    const buyer_id = userId;
    const product_id = productId;
    const wishlistItem = await wishlist.create({
        buyer_id,
        product_id,
    });

    return wishlistItem;

    
};

const getWishlist = async (userId) => {
    const buyer_id = userId.userId;
    const wishlistItem = await wishlist.findAll({
        where: {
            buyer_id: buyer_id,
        },
    });
    return wishlistItem;
};

const deleteWishlist = async ({ productId }) => {
    const result = await wishlist.destroy({
        where: {
            product_id: productId,
        },
    });
    return result;
};


export {
    createWishlist,
    deleteWishlist,
    getWishlist
};

