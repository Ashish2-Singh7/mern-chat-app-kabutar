import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketConext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../src/assets/sounds/notification.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        // a very important cleanup function must to perform
        return () => socket?.off("newMessage"); // important as it's make's sure you are not listening to this event more than once.
        // if you remove this line then whenver you will recieve message the sound will play the no of times equal to the number of users you have in your app.
    }, [messages, setMessages, socket]);
};

export default useListenMessages
