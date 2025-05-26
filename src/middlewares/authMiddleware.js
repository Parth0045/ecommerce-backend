import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key' ;

export const authenticate = (req, res, next) => {
  const token = req.session.jwt;
  if (!token) {
    return res.json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({ message: 'Invalid or expired token' });
  }
};
