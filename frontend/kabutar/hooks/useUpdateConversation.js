import { useState } from "react"
import toast from "react-hot-toast";

import useConversation from '../zustand/useConversation';

const useUpdateConversation = () => {
    const { selectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);

    const updateConversation = async (bgImage) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bgImage }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            toast.success("Background image added successfully");
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { loading, updateConversation };
}

export default useUpdateConversation;