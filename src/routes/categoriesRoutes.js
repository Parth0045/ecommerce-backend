import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';

import { addNewCategories, getAllcategories, updateCategories, deleteCategories, displayCategories } from '../controllers/categoriesController.js';

// import { addNewCategories } from '../controllers/categoriesController.js';
// import { getAllcategories } from '../controllers/categoriesController.js';
// import { updateCategories } from '../controllers/categoriesController.js';
// import { deleteCategories } from '../controllers/categoriesController.js';
// import { displayCategories } from '../controllers/categoriesController.js';

const router = express.Router();
router.get('/seller/categories', authenticate, getAllcategories);
router.post('/seller/categories', authenticate, addNewCategories);
router.put('/seller/categories/:id', authenticate, updateCategories);
router.delete('/seller/categories/:id', authenticate, deleteCategories);
router.get('/buyer/categories', authenticate, displayCategories);

export default router;
