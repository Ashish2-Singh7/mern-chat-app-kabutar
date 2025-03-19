import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const { conversation, setConversation, selectedConversation } = useConversation();
    const [forceRender, setForceRender] = useState(0);

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/conversation/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setConversation(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (selectedConversation?._id) getMessages();

    }, [selectedConversation?._id, setConversation, forceRender]);

    return { conversation, loading, setForceRender };

}

export default useGetConversation;