import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import{ createProductController, imageProductController } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/seller/products', userAuthMiddleware);
router.post('/seller/products', userAuthMiddleware, createProductController);
router.post('/seller/products/image', userAuthMiddleware,imageProductController);
router.put('/seller/products/:id', userAuthMiddleware);
router.delete('/seller/products/:id', userAuthMiddleware);
router.get('/buyer/products', userAuthMiddleware);

export default router;
