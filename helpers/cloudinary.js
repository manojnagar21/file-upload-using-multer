require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadImage = async (imagePath, mimeType) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    let options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    // 1. Identify and validate the file format
    if (mimeType.startsWith('image/')) {
        options.resource_type = 'image'; // Set resource type for images
    } else if (mimeType === 'text/plain') {
        options.resource_type = 'raw';   // Text files must use 'raw'
    } else {
        throw new Error('Upload rejected: Only images and text files are allowed.');
    }

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        // console.log(result);
        return { publicId: result.public_id, resourceType: result.resource_type };
    } catch (error) {
        console.error(error);
    }
};
const getAssetInfo = async (publicId, resourceType) => {

    // Return colors in the response
    const options = {
        // colors: true,
        resource_type: resourceType,
        type: 'upload'
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        // console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error("Error: ", error);
    }
};
module.exports = {
    uploadImage,
    getAssetInfo
}