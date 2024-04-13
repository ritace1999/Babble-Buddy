import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"] },
    avatar: { type: String, default: "" },
    isAdmin: { type: String, default: "User", enum: ["Admin", "User"] },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);
export default User;
