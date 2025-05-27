import cloudinary from './config/cloudinaryConfig.js';
const uploadFile = async(filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        console.log("Cloudinary Upload Result:", result);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error); 
        throw new Error(`Cloudinary upload failed: ${error.message}`); 
    }
};

export {
    uploadFile
}