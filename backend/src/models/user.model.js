import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"] },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const User = model("users", UserSchema);
export default User;
