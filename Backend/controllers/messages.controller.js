import Conversation from '../model/conversation.model.js';
import Message from '../model/message.model.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // renaming id with reciever id
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        // find that conversation document which contain in it's participants all the fields given in array

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({ senderId, receiverId, message });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // not an optimized way of doing this as at first conversation will run in parallel and then newMessage
        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        return res.status(201).json(newMessage);

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

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages

        return res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessages controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}