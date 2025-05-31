import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import {
  createReviewFromOrderController,
  getAllSellerReviewsController,
  getProductReviewsController,
  deleteOwnReviewController,
  deleteSellerReviewController,
  updateOwnReviewController
} from '../controllers/review.controller.js';

const router = express.Router();

router.post('/buyer/review', userAuthMiddleware, createReviewFromOrderController);
router.get('/seller/reviews', userAuthMiddleware, getAllSellerReviewsController);
router.delete('/seller/reviews/:reviewId', userAuthMiddleware, deleteSellerReviewController);
router.get('/buyer/reviews/:productId', getProductReviewsController);
router.delete('/buyer/reviews/:id', userAuthMiddleware, deleteOwnReviewController);
router.put('/buyer/reviews/:id', userAuthMiddleware, updateOwnReviewController);

export default router;
