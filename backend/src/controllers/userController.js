import User from "../models/user.model.js";

class UserController {
  getUser = async (req, res, next) => {
    try {
      const loggedInUserId = req.user._id;
      console.log(loggedInUserId);
      const filterUsers = await User.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
      res.status(200).json(filterUsers);
    } catch (error) {
      next({
        message: "Unable to show at this moment",
        status: 503,
      });
    }
  };
}
export default new UserController();
