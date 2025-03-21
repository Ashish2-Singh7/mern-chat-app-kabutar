import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message, imageMessage, videoMessage) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message, imageMessage, videoMessage })
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);

        } catch {
            toast.error("Something went wrong!. Maybe the file size is exceeding the limit of 4mb");
        } finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading }
}
export default useSendMessage;