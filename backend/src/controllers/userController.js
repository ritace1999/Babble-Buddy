import User from "../models/user.model.js";

class UserController {
  getUser = async (req, res, next) => {
    try {
      const loggedInUserId = req.user._id;
      const searchKeyword = req.query.searchKeyword;
      let query = { _id: { $ne: loggedInUserId } };

      // Check if there's a search keyword
      if (searchKeyword) {
        // Construct a regex pattern for case-insensitive search

        query.$or = [
          { fullName: { $regex: searchKeyword, $options: "i" } },
          { userName: { $regex: searchKeyword, $options: "i" } },
        ];
      }

      // Fetch users matching the query and exclude the password field
      const filterUsers = await User.find(query).select("-password");

      res.status(200).json(filterUsers);
    } catch (error) {
      next({
        message: "Unable to show user at this moment",
        status: 503,
      });
    }
  };

  readUserPagination = async (req, res, next) => {
    try {
      const searchKeyword = req.query.searchKeyword;
      let where = {};

      // Check if there's a search keyword
      if (searchKeyword) {
        // Perform a case-insensitive search on the 'name' and 'userName' fields
        where.$or = [
          { fullName: { $regex: searchKeyword, $options: "i" } },
          { userName: { $regex: searchKeyword, $options: "i" } },
        ];
      }

      // Exclude the logged-in user from the search results
      const loggedInUserId = req.user.id;
      where._id = { $ne: loggedInUserId };

      // Construct the query with the filter
      let query = User.find(where).select("-password");

      // Pagination
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * pageSize;
      const total = await User.countDocuments(where);
      const pages = Math.ceil(total / pageSize);

      // Set response headers
      res.set({
        "x-filter": searchKeyword,
        "x-totalcount": JSON.stringify(total),
        "x-current-page": JSON.stringify(page),
        "x-pagesize": JSON.stringify(pageSize),
        "x-totalpagecount": JSON.stringify(pages),
      });

      // If requested page exceeds the total number of pages, return an empty array
      if (page > pages) {
        return res.json([]);
      }

      // Execute the query with pagination
      const result = await query.skip(skip).limit(pageSize);

      // Return the paginated result along with response headers
      return res.json({
        headers: {
          "x-filter": searchKeyword,
          "x-totalcount": total,
          "x-current-page": page,
          "x-pagesize": pageSize,
          "x-totalpagecount": pages,
        },
        data: result,
      });
    } catch (error) {
      console.log(error);
      next({
        msg: "Unable to show users at this moment",
        status: 400,
      });
    }
  };
}
export default new UserController();
