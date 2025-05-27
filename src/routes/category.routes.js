import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import{ createCategoryController, getCategoryController, updateCategoryController, deleteCategoryController, fatchCategoryController } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/seller/categories', userAuthMiddleware, getCategoryController);
router.post('/seller/categories', userAuthMiddleware, createCategoryController);
router.put('/seller/categories/:id', userAuthMiddleware, updateCategoryController);
router.delete('/seller/categories/:id', userAuthMiddleware, deleteCategoryController);
router.get('/buyer/categories', userAuthMiddleware, fatchCategoryController);

export default router;
