import { v2 as cloudinary } from 'cloudinary';

async function checkImageExists(publicId) {
    try {
        const result = await cloudinary.api.resource(publicId);
        return true; // Image exists
    } catch (error) {
        if (error.http_code === 404) {
            return false; // Image does not exist
        }
        throw error; // Some other error occurred
    }
}

export const uploadProfileImage = async (profileImage, user) => {
    if (profileImage) {
        if (user.profileImg) {
            if (checkImageExists(user.profileImg.split("/").pop().split(".")[0])) {
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }
        }
        const uploadedResponse = await cloudinary.uploader.upload(profileImage);
        profileImage = uploadedResponse.secure_url;
    }
    return profileImage;
}