import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketConext';

const useListenJoinUsers = (setRefetch) => {
    const { socket } = useSocketContext();

    useEffect(() => {
        socket?.on("newUserJoined", () => {
            setRefetch(prevState => prevState + 1);
        });

        // a very important cleanup function must to perform
        return () => socket?.off("newUserJoined"); // important as it's make's sure you are not listening to this event more than once.
        // if you remove this line then whenver you will recieve message the sound will play the no of times equal to the number of users you have in your app.
    }, [socket]);
};

export default useListenJoinUsers;
