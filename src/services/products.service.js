import product from '../models/products.js';
import categories from '../models/categories.js';
import subCategories from '../models/subCategories.js';

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

export {
    createProduct,
    uploadProductImage,
    getProduct,
    updateProduct,
    deleteProduct,
    fatchAllProducts,
}