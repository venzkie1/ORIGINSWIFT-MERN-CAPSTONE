// import createError from "../utils/createError";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const createMessage = async (req, res, next) =>{
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc,
    })

    try {
        const savedMessage = await newMessage.save();
        if (savedMessage instanceof Message) {
          } else {
          }
        const isReceiver = !req.isSeller;
        await Conversation.findOneAndUpdate(
            { id: req.body.conversationId },
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.desc,
                },
            },
            {
                new: true,
            }
        );

        res.status(201).send(savedMessage);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


export const getMessages = async (req, res, next) =>{
    try{
        const messages = await Message.find({ conversationId: req.params.id });
        const users = await User.find({ _id: { $in: messages.map(m => m.userId) } });
            // update the `seenAt` field of messages that have been seen by the current user
        messages.forEach(m => {
            if (m.userId !== req.userId && !m.seenAt) {
            m.seenAt = Date.now();
            m.save();
            }
        });
        res.status(200).send({ messages, users });

    }catch(err){
        next(err);
    }
}
