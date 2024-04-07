import { uploadPic } from "../middleware/uploadImages.js";
import { fileRemover } from "../utils/fileRemover.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

class ProfileController {
  read = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      next({
        message: "Unable to show at this moment",
        status: 503,
      });
    }
  };

  update = async (req, res, next) => {
    try {
      const { fullName, userName, gender } = req.body;
      const userId = req.user._id;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return next({ message: "User not found", status: 404 });
      }

      // Check if there are any changes
      const changes = {};
      if (
        fullName &&
        JSON.stringify(fullName) !== JSON.stringify(user.fullName)
      ) {
        changes.fullName = fullName;
      }
      if (
        userName &&
        JSON.stringify(userName) !== JSON.stringify(user.userName)
      ) {
        changes.userName = userName;
      }
      if (gender && JSON.stringify(gender) !== JSON.stringify(user.gender)) {
        changes.gender = gender;
      }

      if (Object.keys(changes).length === 0) {
        return next({ message: "No changes made to the profile", status: 400 });
      }

      // Apply changes and save the updated user document
      user.set(changes);
      await user.save();

      // Fetch the updated user to include in the response
      const updatedUser = await User.findById(userId);
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        userName: updatedUser.userName,
        avatar: updatedUser.avatar,
        gender: updatedUser.gender,
        message: "Profile updated successfully",
      });
    } catch (error) {
      next({ message: "Unable to update profile at this moment", status: 500 });
    }
  };

  passwordUpdate = async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user._id;

      // Validate input fields
      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: "Both passwords are required to update" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return next({ message: "User not found", status: 404 });
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return next({ message: "Incorrect Old Password", status: 401 });
      }

      // Check if new password is same as old password
      const newPasswordMatchesOld = await bcrypt.compare(
        newPassword,
        user.password
      );
      if (newPasswordMatchesOld) {
        return next({
          message: "New password cannot be the same as the old password",
          status: 422,
        });
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await user.updateOne({ password: hash });

      return res.json({ message: "Password changed successfully." });
    } catch (err) {
      return next({
        message: err.message || "An error occurred while changing password",
        status: 500,
      });
    }
  };

  updateAvatar = async (req, res, next) => {
    try {
      // Use the uploadPic middleware to handle the file upload
      uploadPic.single("avatar")(req, res, async function (err) {
        if (err) {
          // Handle the upload error
          const error = new Error("An unknown error occurred when uploading");
          next(error);
        } else {
          if (req.file) {
            let filename;
            let updatedUser = await User.findById(req.user._id);
            filename = updatedUser.avatar;
            if (filename) {
              fileRemover(filename);
            }
            updatedUser.avatar = req.file.filename;
            await updatedUser.save();
            res.json({
              _id: updatedUser._id,
              fullName: updatedUser.fullName,
              email: updatedUser.email,
              userName: updatedUser.userName,
              avatar: updatedUser.avatar,
            });
          } else {
            let filename;
            let updatedUser = await User.findById(req.user._id);
            filename = updatedUser.avatar;
            updatedUser.avatar = "";
            await updatedUser.save();
            fileRemover(filename);
            res.json({
              _id: updatedUser._id,
              fullName: updatedUser.fullName,
              email: updatedUser.email,
              userName: updatedUser.userName,
              avatar: updatedUser.avatar,
              message: "Avatar updated.",
            });
          }
        }
      });
    } catch (error) {
      // Handle any other errors
      next({
        message: "Unable to update profile Picture",
        status: 500,
      });
    }
  };
  deleteAvatar = async (req, res, next) => {
    try {
      const { _id, avatar } = req.user;

      // Check if the user has an avatar before attempting to remove it
      if (!avatar) {
        return res
          .status(404)
          .json({ message: "No avatar found for deletion" });
      }

      // Remove the avatar file from disk
      await fileRemover(avatar);

      // Set the avatar field to an empty string in the database
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { avatar: "" },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Avatar deleted successfully" });
    } catch (error) {
      next({
        message: "Unable to fulfill the request at this moment",
        status: 500,
      });
    }
  };
}

export default new ProfileController();
