import { Schema, model } from "mongoose";

const ConvoSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = model("conversations", ConvoSchema);
export default Conversation;
