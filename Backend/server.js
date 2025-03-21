// USING ES6(MODULE) NOT ES5(COMMONJS)
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.routes.js';
import messageRoutes from './Routes/message.routes.js';
import userRoutes from './Routes/user.routes.js';
import connectToDB from './db/connectToMongoDb.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import { app, server } from './socket/socket.js';


dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // to parse the incoming requests with JSON payloads (from req.body);
app.use(cookieParser()); // to parse the incoming cookies from req.cookies;
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/kabutar/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/kabutar", "dist", "index.html"));
    // both our server and frontend are running on the same port, that's exactly what is going to happen in our deployed server
})

server.listen(PORT, () => {
    connectToDB()
    console.log(`Server is listening at port ${PORT}`);
});