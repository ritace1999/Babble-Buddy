import express from "express";
import { routesError } from "../middleware/error.middleware.js";
import authRoutes from "./auth/auth.routes.js";
import messageRoutes from "./messages/message.routes.js";
import userRoutes from "./users/user.routes.js";
import profileRoutes from "./profile/profile.routes.js";

const router = express.Router();

router.use(authRoutes);
router.use("/users", userRoutes);
router.use("/messages", messageRoutes);
router.use("/profile", profileRoutes);
router.use(routesError);

export default router;
