import wishlist from '../models/wishlist.js';

const createWishlist = async ({ buyer_id, ...wishlistBody }) => {
  
    const wishlistItem = await wishlist.create({
        buyer_id,
        ...wishlistBody,
    });
    return wishlistItem;
};

const getWishlist = async (userId) => {
    console.log(userId);
    
    const wishlistItem = await wishlist.findAll({
        where: {
            buyer_id: userId,
        },
    });
    return wishlistItem;
};

const deleteWishlist = async (productId) => {
    const deleteWishlist = await wishlist.destroy({
        where: {
            product_id: productId,
        },
    });
    return deleteWishlist;
};
export {
    createWishlist,
    deleteWishlist,
    getWishlist
};

