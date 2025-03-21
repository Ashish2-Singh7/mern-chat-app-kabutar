import { v2 as cloudinary } from 'cloudinary';

async function checkImageExists(publicId) {
    try {
        const result = await cloudinary.api.resource(publicId);
        return true; // Image exists
    } catch (error) {
        if (error.http_code === 404) {
            return false; // Image does not exist
        }
        return false; // Some other error occurred
    }
}

export const uploadProfileImage = async (profileImage, user) => {
    try {
        if (profileImage) {
            if (user.profilePic) {
                if (checkImageExists(user.profilePic.split("/").pop().split(".")[0])) {
                    await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
                }
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImage);
            profileImage = uploadedResponse.secure_url;
        }
        return profileImage;
    } catch (error) {
        console.log("Error in uploadProfileImage service", error.message);
        return null;
    }
}

export const uploadConversationBgImage = async (conversationBgImage, conversation) => {
    try {
        if (conversationBgImage) {
            if (conversation.backgroundImage) {
                if (checkImageExists(conversation.backgroundImage.split("/").pop().split(".")[0])) {
                    await cloudinary.uploader.destroy(conversation.backgroundImage.split("/").pop().split(".")[0]);
                }
            }
            const uploadedResponse = await cloudinary.uploader.upload(conversationBgImage);
            conversationBgImage = uploadedResponse.secure_url;
        }
        return conversationBgImage;
    } catch (error) {
        console.log("Error in uploadConversationBgImage service", error.message);
        return null;
    }
}

export const sendImageMessage = async (imageToSend) => {
    try {
        const uploadedResponse = await cloudinary.uploader.upload(imageToSend);
        imageToSend = uploadedResponse.secure_url;

        return imageToSend;
    }
    catch (error) {
        console.log("Error in sendImageMessage service", error.message);
        return null;
    }
}

export const sendVideoMessage = async (VideoToSend) => {
    try {
        const uploadedResponse = await cloudinary.uploader.upload(VideoToSend, {
            resource_type: "video"
        });
        VideoToSend = uploadedResponse.secure_url;

        return VideoToSend;

    } catch (error) {
        console.log("Error in sendVideoMessage service", error.message);
        return null;
    }
}
