import cloudinary from 'cloudinary';
import dotenv, { config } from 'dotenv';
dotenv.config({path: '../.env'});
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

