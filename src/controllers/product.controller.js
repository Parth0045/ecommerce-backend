import {
    createProduct,
uploadProductImage

} from '../services/products.service.js';
// import { uploadFile } from '../utils/uploadImage.js';

const createProductController = async (req, res) => {
    try {
        const seller_id = req.user.id;
        console.log("hello");
        const category_id = req.body.category_id;
        const subcategory_id = req.body.subcategory_id;
        const product_name = req.body.product_name;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const price = req.body.price;
        console.log(seller_id);
        console.log(product_name);
        console.log("from controller",description);
        const categorie = await createProduct({ seller_id, category_id, subcategory_id, product_name, description, quantity, price });
        res.json({ message: 'Product add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};
const imageProductController = async (req, res) => {
    try {
        const product_id = req.body.product_id;
        console.log("from controller:",product_id);
        const categorie = await uploadProductImage({product_id });
        res.json({ message: 'Product image add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

export {
    createProductController,
    imageProductController
}