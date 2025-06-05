import { Router } from 'express';

import authRoutes from './auth.routes.js';
import categoriesRoutes from './category.routes.js';
import productsRoutes from './product.routes.js';
import cartRoutes from './cart.routes.js';
import wishlistRoutes from './wishlist.routes.js';
import orderRoutes from './order.routes.js';
import paymentRoutes from './payment.routes.js';
import reviewRoutes from './review.route.js';
import userRoutes from './user.route.js';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api', userRoutes);
router.use('/api', categoriesRoutes);
router.use('/api', productsRoutes);
router.use('/api', cartRoutes );
router.use('/api', wishlistRoutes );
router.use('/api', orderRoutes );
router.use('/api', paymentRoutes );
router.use('/api', reviewRoutes );

export default router;