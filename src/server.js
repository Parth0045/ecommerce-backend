import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import sequelize from './config/dbConnect.js';
import authRoutes from './routes/auth.routes.js';
import categoriesRoutes from './routes/category.routes.js';
import subCategoriesRoutes from './routes/subcategory.routes.js';
import productsRoutes from './routes/product.routes.js';

dotenv.config();
dotenv.config({ path: '../.env' }); 

const app = express();

app.use(express.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
}));

app.use('/api/auth', authRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', subCategoriesRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync();
  })

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});