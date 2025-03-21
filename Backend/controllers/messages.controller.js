import Conversation from '../model/conversation.model.js';
import Message from '../model/message.model.js';
import { sendImageMessage, sendVideoMessage, uploadConversationBgImage } from '../services/mediaupload.service.js';
import { getRecieverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        let { imageMessage, videoMessage } = req.body;
        const { id: receiverId } = req.params; // renaming id with reciever id
        const senderId = req.user._id;

        if (message || imageMessage || videoMessage) {

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });
            // find that conversation document which contain in it's participants all the fields given in array

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                });
            }

            const newMessage = new Message({ senderId, receiverId });

            if (message) {
                newMessage.message = message;
            }
            if (imageMessage) {
                imageMessage = await sendImageMessage(imageMessage);
                newMessage.media = {
                    mediaType: "image",
                    mediaUrl: imageMessage
                };
            }
            if (videoMessage) {
                videoMessage = await sendVideoMessage(videoMessage);
                newMessage.media = {
                    mediaType: "video",
                    mediaUrl: videoMessage
                };
            }

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            await newMessage.save();
            await conversation.save();
            // not an optimized way of doing this as, at first conversation will run in parallel and then newMessage
            // await conversation.save();
            // await newMessage.save();

            // this will run in parallel
            // await Promise.all([conversation.save(), newMessage.save()]);

            // SOCKET IO FUNCTIONALITY
            const recieverSocketId = getRecieverSocketId(receiverId);
            if (recieverSocketId) {
                // io.on(<socket_id>).emit() used to send events to specific client
                io.to(recieverSocketId).emit("newMessage", newMessage);
            }

            return res.status(201).json(newMessage);
        }
        else {
            return res.status(200).json({ error: "Fields can't be empty" });
        }
    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatID } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatID] }
        }).populate("messages");  // NOT REFERENCES BUT ACTUAL MESSAGES

        // if(!conversation){
        //     return res.status(200).json({message: "Conversation doesn't exists"});
        // }
        // BETTER SYNTAX

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages

        return res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessages controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getConversation = async (req, res) => {
    try {
        const { id: userToChatID } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatID] }
        });

        if (!conversation) return res.status(200).json([]);

        return res.status(200).json(conversation);


    } catch (error) {
        console.log("Error in getConversation controller ", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const updateConversation = async (req, res) => {
    try {
        const { id: receiverId } = req.params; // renaming id with reciever id
        const senderId = req.user._id;
        let { bgImage } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (bgImage) {
            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                });
                bgImage = await uploadConversationBgImage(bgImage, conversation);
                conversation.backgroundImage = bgImage;
            }
            else {
                bgImage = await uploadConversationBgImage(bgImage, conversation);
                conversation.backgroundImage = bgImage;
            }
            await conversation.save();

            return res.status(200).json(conversation);
        }
        else {
            return res.status(200).json({ message: "Nothing to update" });
        }

    } catch (error) {
        console.log("Error in updateConversation controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}