import { Server } from "socket.io";
import http from 'http';
import express from "express";

const app = express();

const server = http.createServer(app);
// socket server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap = {}; // {userId: socketId};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != 'undefined') userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // we will be using this event name getOnlineUsers in the client to get the online users

    // socket.on() is used to listen to the events. Can be used both on client and server side.
    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };