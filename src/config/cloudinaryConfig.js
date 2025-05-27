import cloudinary from 'cloudinary';
import dotenv, { config } from 'dotenv';
dotenv.config({ path: '../.env' });
dotenv.config();
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
console.log(CLOUD_API_KEY);

const cloudConnect = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});
console.log(cloudinary.config());

export default { cloudConnect };