import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  signIn = async (req, res, next) => {
    try {
      const { identifier, password } = req.body;
      const user = await User.findOne({
        $or: [{ email: identifier }, { userName: identifier }],
      });

      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password invalid." });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
        gender: user.gender,
        avatar: user.avatar,
        token: token,
      });
    } catch (error) {
      console.error(error);
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
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        gender,
        userName,
      });

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
}

export default new AuthController();
