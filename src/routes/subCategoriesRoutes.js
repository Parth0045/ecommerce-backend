import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { addSubSategories } from '../controllers/subCategoriesContraller.js';

// import { getAllcategories } from '../controllers/categoriesController.js';
// import { updateCategories } from '../controllers/categoriesController.js';
// import { deleteCategories } from '../controllers/categoriesController.js';
// import { displayCategories } from '../controllers/categoriesController.js';

const router = express.Router();
router.get('/seller/subcategories', authenticate, addSubSategories);
router.post('/seller/subcategories', authenticate, addSubSategories );
router.put('/seller/subcategories/:id', authenticate, addSubSategories);
router.delete('/seller/subcategories/:id', authenticate, addSubSategories);
router.get('/buyer/subcategories/categories', authenticate, addSubSategories);

export default router;
