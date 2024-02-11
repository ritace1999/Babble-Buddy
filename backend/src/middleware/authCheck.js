import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Access denied. " });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token." });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    next({
      message: "Unable to preocess request this moment.",
      status: 500,
    });
  }
};
