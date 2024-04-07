import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authCheck = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const err = new Error(" Token missing");
    err.status = 401;
    return next(err);
  }

  try {
    const token = authHeader.split(" ")[1];

    const { userId } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.message = "Token has expired";
    } else if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
    }
    next(error);
  }
};
