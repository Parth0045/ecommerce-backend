import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import { getWishlistController, createWishlistController, deleteWishlistController } from '../controllers/wishlist.controller.js';

const router = express.Router();

router.post('/buyer/wishlist', userAuthMiddleware, createWishlistController);
router.get('/buyer/wishlist', userAuthMiddleware, getWishlistController);
router.delete('/buyer/wishlist/:productId', userAuthMiddleware, deleteWishlistController);

export default router;
