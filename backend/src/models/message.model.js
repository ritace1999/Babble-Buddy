import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverFullName: {
      type: String,
      ref: "User",
      required: false,
    },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", MessageSchema);
export default Message;
