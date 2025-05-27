import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '../.env' });
const JWT_SECRET = process.env.JWT_SECRET;

const userAuthMiddleware = (req, res, next) => {
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
export {
  userAuthMiddleware
}