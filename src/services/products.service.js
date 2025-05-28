import product from '../models/products.js';

const createProduct = async ({ seller_id, category_id, subcategory_id, product_name, description, quantity, price }) => {

    console.log(description);

    const categorie = await product.create({
        seller_id, category_id, subcategory_id, product_name, description, quantity, price
    });
    return categorie;
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
const getProduct = async (seller_id) => {
    const sellerID = seller_id.seller_id;
    const products = await product.findAll({
        where: {
            seller_id: sellerID,
        },
    });
    console.log(products);
    console.log("hello");
    return products;
};
const updateProduct = async ({ productId, updatedCategoryId, updatedSubCategoryId, updatedProductName, updatedDescription, updatedPrice, updatedQuantity }) => {
    console.log("Service ", updatedProductName);
    console.log("Service ", updatedDescription);

    const result = await product.update({
        category_id: updatedCategoryId, subcategory_id: updatedSubCategoryId, product_name: updatedProductName, description: updatedDescription, price: updatedPrice, quantity: updatedQuantity
    }, { where: { id: productId } });
    const updated = result[0];
    console.log(updated);
    return updated;
};
const deleteProduct = async ({ productId }) => {
    console.log("Service ", productId);
    const result = await product.destroy({
        where: {
            id: productId,
        },
    });
    console.log(result);
    return result;
};
const fatchProducts = async () => {
    const products = await product.findAll();
    return products;
};

const calculateOrderDetails = async (products) => {
    let total_amount = 0;
    let seller_id = null;
    for (const item of products) {
        const products = await product.findByPk(item.product_id);
        seller_id = products.seller_id;
        total_amount += products.price * item.quantity;
    }
    return { seller_id, total_amount };
};

export {
    createProduct,
    uploadProductImage,
    getProduct,
    updateProduct,
    deleteProduct,
    fatchProducts,
    calculateOrderDetails
}