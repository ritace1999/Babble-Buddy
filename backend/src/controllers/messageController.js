import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverId, io } from "../socket.js";

class MessageController {
  send = async (req, res, next) => {
    try {
      const senderId = req.user._id;
      const receiverId = req.params.id;
      const { message } = req.body;
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({ message: "User not found." });
      }

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = await Message.create({
        senderId,
        receiverFullName: receiver.fullName,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      await Promise.all([conversation.save(), newMessage.save()]);

      const receiverSocketId = getReceiverId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.status(201).json(newMessage);
    } catch (error) {
      console.log(error);
      next({
        message: "Unable to create message at this moment.",
        status: 500,
      });
    }
  };

  getMessages = async (req, res, next) => {
    try {
      const receiverId = req.params.id;
      const senderId = req.user._id;

      if (!receiverId) {
        return res.status(400).json({ message: "Invalid receiver ID" });
      }

      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      }).populate("messages");

      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      if (!conversation.messages || conversation.messages.length === 0) {
        return res
          .status(200)
          .json({ message: "No messages found in this conversation" });
      }
      return res.status(200).json(conversation.messages);
    } catch (error) {
      // console.log(error);
      next({
        message: "Unable to show messages at this moment.",
        status: 500,
      });
    }
  };
}

export default new MessageController();
