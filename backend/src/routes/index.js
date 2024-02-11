import express from "express";
import { routesError } from "../middleware/error.middleware.js";
import authRoutes from "./auth/auth.routes.js";
import messageRoutes from "./messages/message.routes.js";
import conversationRoutes from "./conversation/conversation.routes.js";

const router = express.Router();

router.use(authRoutes);
router.use("/messages", messageRoutes);
router.use("/conversation", conversationRoutes);
router.use(routesError);

export default router;
