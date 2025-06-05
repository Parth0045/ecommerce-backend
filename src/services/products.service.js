import product from '../models/products.js';
import categories from '../models/categories.js';
import subCategories from '../models/subCategories.js';
import wishlist from '../models/wishlist.js';

const createProduct = async ({ seller_id, ...productBody }) => {
    const createdProduct = await product.create({
        seller_id, ...productBody
    });
    return createdProduct;
};

const uploadProductImage = async ({ product_id, image_url }) => {
    console.log("Updating product ID:", product_id);
    const result = await product.update(
        { image_url: image_url },
        { where: { id: product_id } }
    );
    console.log("Update result:", result);
    return result[0];
};

const getProduct = async (userId) => {
    const products = await product.findAll({
        where: { seller_id: userId.id },
        include: [
            {
                model: categories,
                as: 'category',
            },
            {
                model: subCategories,
                as: 'subCategory',
            },
        ],
    });
    return products;
};

const updateProduct = async ({ productId, ...updateProductRecords }) => {

    const updatedProduct = await product.update({
        ...updateProductRecords
    }, { where: { id: productId } });

    return updatedProduct[0] > 0 ? true : false;
}

const deleteProduct = async (productId) => {
    const deletedProduct = await product.destroy({
        where: {
            id: productId,
        },
    });
    return deletedProduct;
};

const fatchAllProducts = async () => {
    const products = await product.findAll({
        include: [
            {
                model: categories,
                as: 'category',
                attributes: { exclude: ['deleted_at'] },
            },
            {
                model: subCategories,
                as: 'subCategory',
                attributes: { exclude: ['deleted_at'] },
            },
        ],
    });
    return products;
};

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
    const deletedCount = await wishlist.destroy({
        where: {
            product_id: productId,
        },
    });
    return deletedCount > 0;
};

export {
    createProduct,
    uploadProductImage,
    getProduct,
    updateProduct,
    deleteProduct,
    fatchAllProducts,
    createWishlist,
    deleteWishlist,
    getWishlist
}