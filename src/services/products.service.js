import product from '../models/products.js';
import categories from '../models/products.js';

const createProduct = async ({ seller_id, category_id, subcategory_id, product_name, description, quantity, price }) => {

    console.log(description);

    const categorie = await product.create({
        seller_id, category_id, subcategory_id, product_name, description, quantity, price
    });
    return categorie;
};

export {
    createProduct
}