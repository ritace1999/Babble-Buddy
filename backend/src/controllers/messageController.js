import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

class MessageController {
  send = async (req, res, next) => {
    try {
      const { id: receiverId } = req.params;
      const { message } = req.body;
      const senderId = req.user._id;
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      await Promise.all([conversation.save(), newMessage.save()]);
      res.status(201).json(newMessage);
    } catch (error) {
      next({
        message: "Unable to create message at this moment.",
        status: 500,
      });
    }
  };
  getMessages = async (req, res, next) => {
    try {
      const { id: chatId } = req.params;
      const senderId = req.user._id;
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, chatId] },
      }).populate("messages");
      if (!conversation) return res.status(404).json([]);
      const messages = conversation.messages;
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      next({
        message: "Unable to show message at this moment.",
        status: 500,
      });
    }
  };
}

export default new MessageController();
