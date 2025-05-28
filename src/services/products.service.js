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

export {
    createProduct,
    uploadProductImage
}