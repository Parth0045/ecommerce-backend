import product from '../models/products.js';
import categories from '../models/products.js';

const createProduct = async ({ seller_id, category_id, subcategory_id, product_name, description, quantity, price }) => {

    console.log(description);

    const categorie = await product.create({
        seller_id, category_id, subcategory_id, product_name, description, quantity, price
    });
    return categorie;
};
const uploadProductImage = async ({ product_id }) => {
    console.log("Service ", product_id);

    const result = await categories.update({ image_url: updatedCategorieName }, { where: { id: product_id } });
    const updated = result[0];
    console.log(updated);
    return updated;
}
export {
    createProduct,
    uploadProductImage
}