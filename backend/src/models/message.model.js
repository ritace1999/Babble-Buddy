import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = model("messages", MessageSchema);
export default Message;
