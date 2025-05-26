import express from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
// import categoriesRoutes from './models/categories.js';
const app = express();
app.use(express.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }, 
}));
app.use('/api/auth', authRoutes);
app.use('/api', categoriesRoutes)
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
export default app;
