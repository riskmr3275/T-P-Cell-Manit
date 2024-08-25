const cloudinary=require('cloudinary').v2


exports.uploadMediaToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };

    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    const fileType = file.mimetype.split('/')[0]; // Extract the type (image, video, etc.)
    console.log(`File MIME type: ${file.mimetype}`); // Debugging line
    options.resource_type = 'auto';

   
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);//yaha image ki url result me save ho jayegi
        return result;
    } catch (error) 
    {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};