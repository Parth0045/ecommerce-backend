import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import { createSubCategoryController } from '../controllers/subcategory.controller.js';

const router = express.Router();
router.get('/seller/subcategories', userAuthMiddleware, createSubCategoryController);
router.post('/seller/subcategories', userAuthMiddleware, createSubCategoryController );
router.put('/seller/subcategories/:id', userAuthMiddleware, createSubCategoryController);
router.delete('/seller/subcategories/:id', userAuthMiddleware, createSubCategoryController);
router.get('/buyer/subcategories/categories', userAuthMiddleware, createSubCategoryController);

export default router;
