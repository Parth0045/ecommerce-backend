import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
import { createSubCategoryController, getSubCategoryController, updateSubCategoryController, deleteSubCategoryController, fatchAllSubCategoryController } from '../controllers/subcategory.controller.js';

const router = express.Router();
router.get('/seller/subcategories', userAuthMiddleware, getSubCategoryController);
router.post('/seller/subcategories', userAuthMiddleware, createSubCategoryController);
router.put('/seller/subcategories/:id', userAuthMiddleware, updateSubCategoryController);
router.delete('/seller/subcategories/:id', userAuthMiddleware, deleteSubCategoryController);
router.get('/buyer/subcategories', userAuthMiddleware, fatchAllSubCategoryController);

export default router;
