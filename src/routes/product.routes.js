import express from 'express';
import multer from 'multer';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import { createProductController, imageProductController, getProductController, updateProductController, deleteProductController, fatchProductController } from '../controllers/product.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.get('/seller/products', userAuthMiddleware, getProductController);
router.post('/seller/products', userAuthMiddleware, createProductController);
router.post('/seller/products/image', userAuthMiddleware, upload.single('image'), imageProductController);
router.put('/seller/products/:id', userAuthMiddleware, updateProductController);
router.delete('/seller/products/:id', userAuthMiddleware, deleteProductController);
router.get('/buyer/products', userAuthMiddleware,fatchProductController);

export default router;
