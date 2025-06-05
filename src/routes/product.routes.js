import express from 'express';
import multer from 'multer';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import {
    createProductController,
    imageProductController,
    getProductController,
    updateProductController,
    deleteProductController,
    fatchAllProductController,
     getWishlistController,
    createWishlistController,
    deleteWishlistController
} from '../controllers/product.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/seller/products', userAuthMiddleware, getProductController);
router.post('/seller/products', userAuthMiddleware, createProductController);
router.post('/seller/products/image', userAuthMiddleware, upload.single('image'), imageProductController);
router.put('/seller/products/:id', userAuthMiddleware, updateProductController);
router.delete('/seller/products/:id', userAuthMiddleware, deleteProductController);
router.get('/buyer/products', userAuthMiddleware, fatchAllProductController);

router.post('/buyer/wishlist', userAuthMiddleware, createWishlistController);
router.get('/buyer/wishlist', userAuthMiddleware, getWishlistController);
router.delete('/buyer/wishlist/:productId', userAuthMiddleware, deleteWishlistController);

export default router;
