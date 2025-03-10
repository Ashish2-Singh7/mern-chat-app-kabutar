import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            // on deployment Socket io will not work as the link has got changed now updating the link, repush and redeploy will work.
            const socket = io('https://mern-chat-app-kabutar-prod.onrender.com', {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);


            // socket.on() is used to listen to the events. Can be used both on client and server side.k
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            // performance reasons 
            return () => socket.close();
            // clean up function
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
}