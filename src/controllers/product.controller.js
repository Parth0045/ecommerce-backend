import {
    createProduct,
    uploadProductImage,
    getProduct,
    updateProduct,
    deleteProduct,
    fatchProducts

} from '../services/products.service.js';
import { uploadFile } from '../utils/uploadImage.js';
import fs from 'fs';

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
        console.log("from controller", description);
        const categorie = await createProduct({ seller_id, category_id, subcategory_id, product_name, description, quantity, price });
        res.json({ message: 'Product add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};
const imageProductController = async (req, res) => {
    try {
        const product_id = req.body.product_id;
        const file = req.file;
        if (!file) {
            return res.json({ message: "No image file uploaded" });
        }
        console.log("file.path:", file.path);
        const imageUrl = await uploadFile(file.path);
        await uploadProductImage({ product_id, image_url: imageUrl });
        res.json({ message: 'Product image added successfully', imageUrl });
    } catch (err) {
        res.json({ message: err.message });
    }
};
const getProductController = async (req, res) => {
    try {

        const userId = req.user.id;
        const seller_id = userId;
        console.log(seller_id);
        const products = await getProduct({ seller_id });
        res.json(products);
    } catch (err) {
        res.json({ message: err.message });
    }
};
const updateProductController = async (req, res) => {
    try {

        const productId = req.params.id;
        const updatedCategoryId = req.body.category_id;
        const updatedSubCategoryId = req.body.subcategory_id;
        const updatedProductName = req.body.product_name;
        const updatedDescription = req.body.description;
        const updatedPrice = req.body.price;
        const updatedQuantity = req.body.quantity;
        const categorie = await updateProduct({ productId, updatedCategoryId, updatedSubCategoryId, updatedProductName, updatedDescription, updatedPrice, updatedQuantity });
        res.send({ message: 'Categorie updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};
const deleteProductController = async (req, res) => {
    try {

        const productId = req.params.id;
        const products = await deleteProduct({ productId });
        res.send({ message: 'Product deleted successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};
const fatchProductController = async (req, res) => {
    try {
        const products = await fatchProducts();
        res.json(products);
    } catch (err) {
        res.json({ message: err.message });
    }
};

export {
    createProductController,
    imageProductController,
    getProductController,
    updateProductController,
    deleteProductController,
    fatchProductController
}