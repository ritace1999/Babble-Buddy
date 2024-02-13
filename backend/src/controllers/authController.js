import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndCookie } from "../utils/generateToken&Cookie.js";

class AuthController {
  signIn = async (req, res, next) => {
    try {
      const { email, userName, password } = req.body;
      const user = await User.findOne({ $or: [{ email }, { userName }] });

      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password invalid." });
      }

      generateTokenAndCookie(user._id, res);
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
        gender: user.gender,
        avatar: user.avatar,
      });
    } catch (error) {
      console.log(error);
      next({
        message: "Unable to sign in at this moment",
        status: 503,
      });
    }
  };
  signUp = async (req, res, next) => {
    try {
      const { fullName, email, userName, password, gender } = req.body;
      const user = await User.findOne({ email });
      const uniqueName = await User.findOne({ userName });
      if (user) {
        return res.status(400).json({ message: "User arleady exists." });
      }
      if (uniqueName) {
        return res.status(400).json({ message: "Username already taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
      const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        gender,
        userName,
        avatar: gender == "Male" ? boyAvatar : girlAvatar,
      });
      generateTokenAndCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        userName: newUser.userName,
        gender: newUser.gender,
        avatar: newUser.avatar,
      });
    } catch (error) {
      console.log(error);
      next({
        message: "Unable to register user at this moment",
        status: 503,
      });
    }
  };
  logout = async (req, res, next) => {
    try {
      res.cookie("jwt", "", {
        maxAge: 0,
      });
      res.status(200).json({ message: "Logged out sucessfully!" });
    } catch (error) {
      next({
        message: "Unable to logout at this moment",
        status: 503,
      });
    }
  };
}

export default new AuthController();
