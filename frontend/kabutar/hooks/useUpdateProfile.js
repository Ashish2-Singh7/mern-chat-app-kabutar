import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


const updateUserProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const updateProfile = async ({ fullName, username, newPassword, currentPassword, gender, profilePic }) => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/update', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, newPassword, currentPassword, gender, profileImage: profilePic })
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Profile updated succesfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateProfile };
}

export default updateUserProfile;