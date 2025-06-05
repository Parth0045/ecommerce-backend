import cloudinary from '../config/cloudinaryConfig.js';
const uploadFile = async (filePath) => {
    try {

        const result = await cloudinary.uploader.upload(filePath);

        return result.secure_url;

    } catch (error) {

        throw Error(error);
  
    }
};

export {
    uploadFile
}