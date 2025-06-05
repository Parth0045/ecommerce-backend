import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import sequelize from './config/dbConnect.js';
import indexRoutes from './routes/index.js';
import cors from 'cors';

dotenv.config();
dotenv.config({ path: '../.env' }); 

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
}));

app.use('/api', indexRoutes); 

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync();
  })

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});