import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { uploadProfileImage } from "../services/mediaupload.service.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { username, fullName, currentPassword, newPassword, gender, profileImage } = req.body;
        const loggedInUserId = req.user._id;
        const loggedUser = await User.findById(loggedInUserId);
        if (!loggedUser) return res.status(404).json({ error: "User not found" });
        if ((!currentPassword && newPassword) || (!newPassword && currentPassword)) {
            return res.status(400).json({ error: "Please provide both the current password and the new password" });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, loggedUser.password);
            if (!isMatch) return res.status(403).json({ error: "Incorrect password entered" });
            if (newPassword.length < 6) return res.status(400).json({ error: "Password must be atleast 6 characters long" });
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            loggedUser.password = hashPassword;
        }

        profileImage = uploadProfileImage(profileImage, loggedUser);

        loggedUser.fullName = fullName || loggedUser.fullName;
        loggedUser.username = username || loggedUser.username;
        loggedUser.gender = gender || loggedUser.coverImg;
        loggedUser.profilePic = profileImage;


        loggedUser = await loggedUser.save();

        loggedUser.password = null;

        return res.status(200).json(loggedUser);

    } catch (error) {
        console.log("Error in updateUserProfile controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}