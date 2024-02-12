import { uploadPic } from "../middleware/uploadImages.js";
import { fileRemover } from "../utils/fileRemover.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

class ProfileController {
  read = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
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
      const { fullName, userName } = req.body;
      const userId = req.user._id;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return next({
          message: "User not found",
          status: 404,
        });
      }

      // Check if there are any changes
      const changes = {};
      if (fullName && fullName !== user.fullName) {
        changes.fullName = fullName;
      }

      if (userName && userName !== user.userName) {
        changes.userName = userName;
      }

      if (Object.keys(changes).length === 0) {
        // No changes, respond with an error message
        return next({
          message: "No changes made to the profile",
          status: 400,
        });
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
        message: "Profile updated successfully",
      });
    } catch (error) {
      next({
        message: "Unable to update profile at this moment",
        status: 500,
      });
    }
  };

  passwordUpdate = async (req, res, next) => {
    try {
      const { opassword, password } = req.body;
      const userId = req.user._id;

      // Validate input fields
      if (!opassword || !password) {
        return res
          .status(400)
          .json({ message: "Both password are required to update" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return next({
          message: "User not found",
          status: 404,
        });
      }

      const passwordMatch = await bcrypt.compare(opassword, user.password);

      if (passwordMatch) {
        // Check if new password is same as old password
        const newPasswordMatchesOld = await bcrypt.compare(
          password,
          user.password
        );
        if (newPasswordMatchesOld) {
          return next({
            message: "New password cannot be the same as the old password",
            status: 422,
          });
        }

        const hash = await bcrypt.hash(password, 10);
        await user.updateOne({ password: hash });
        return res.json({
          message: "Password changed successfully.",
        });
      } else {
        return next({
          message: "Incorrect Old Password",
          status: 401,
        });
      }
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
          console.log(err);
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
        msg: "Unable to update profile Picture",
        status: 500,
      });
    }
  };
  deleteAvatar = async (req, res, next) => {
    try {
      // Check if the user has an avatar before attempting to remove it
      if (!req.user.avatar) {
        throw new Error("No avatar found for deletion");
      }

      // Remove the avatar file from disk
      fileRemover(req.user.avatar);

      // Set the avatar field to undefined in the database
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { avatar: 1 } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.json({ msg: "Avatar deleted successfully" });
    } catch (error) {
      if (error.message === "No avatar found for deletion") {
        return res.status(404).json({ msg: "No avatar found for deletion" });
      }

      next({
        msg: "Unable to fulfill the request at this moment",
        status: 500,
      });
    }
  };
}

export default new ProfileController();
