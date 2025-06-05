import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '../.env' });

const JWT_SECRET = process.env.JWT_SECRET;
const userAuthMiddleware = (req, res, next) => {
  
  const token = req.session?.jwt;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }
  
  try {
   
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  
  } catch (err) {

    return res.status(401).json({
      success: false,
      message: err.name === 'TokenExpiredError'
        ? 'Session expired. Please log in again.'
        : 'Invalid token. Authentication failed.'
    });

  }
};

export { userAuthMiddleware };
