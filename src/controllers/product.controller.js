import {
    createProduct,
    uploadProductImage,
    getProduct,
    updateProduct,
    deleteProduct,
    fatchAllProducts

} from '../services/products.service.js';
import { uploadFile } from '../utils/uploadImage.js';

const createProductController = async (req, res) => {
    try {
        const createdProduct = await createProduct({ seller_id: req.user.id, ...req.body });
        return res.status(200).json({
            error: false,
            message: "Product Created successfully!",
            data: createdProduct,
        });
    } catch (error) {
        throw Error(error);
    }
};

const imageProductController = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.json({ message: "No image file uploaded" });
        }
        console.log("file.path:", file.path);
        const imageUrl = await uploadFile(file.path);
        await uploadProductImage({ ...req.body, image_url: imageUrl });
        return res.status(200).json({
            error: false,
            message: "Product image added successfully!",
            data: imageUrl,
        });
    } catch (error) {
        throw Error(error);
    }
};

const getProductController = async (req, res) => {
    try {
        const products = await getProduct(req.user);
        return res.status(200).json({
            error: false,
            message: "Product retrieved successfully!",
            data: products,
        });
    } catch (error) {
        throw Error(error);
    }
};

const updateProductController = async (req, res) => {
    try {
        const products = await updateProduct({ productId: req.params.id, ...req.body });
        return res.status(200).json({
            error: false,
            message: "Product updated successfully!",
            data: products,
        });
    } catch (error) {
        throw Error(error);
    }
};

const deleteProductController = async (req, res) => {
    try {
        console.log(req.params.id);

        const deletedProduct = await deleteProduct(req.params.id);
        return res.status(200).json({
            error: false,
            message: "Product deleted successfully!",
            data: deletedProduct,
        });
    } catch (error) {
        throw Error(error);
    }
};

const fatchAllProductController = async (req, res) => {
    try {
        const products = await fatchAllProducts();
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
    fatchAllProductController
}