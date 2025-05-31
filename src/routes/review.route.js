import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import {
createReviewController
} from '../controllers/review.controller.js';

const router = express.Router();
router.post('/buyer/review', userAuthMiddleware, createReviewController);
export default router;
