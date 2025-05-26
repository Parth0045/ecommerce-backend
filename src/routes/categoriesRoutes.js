import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { addNewCategories } from '../controllers/categoriesController.js';
import { getAllcategories } from '../controllers/categoriesController.js';
import { updateCategories } from '../controllers/categoriesController.js';

const router = express.Router();
router.get('/categories', authenticate, getAllcategories);
router.post('/categories', authenticate, addNewCategories);
router.put('/categories/:id', authenticate, updateCategories);
// router.delete('/categories/:', authenticate, register);
export default router;
