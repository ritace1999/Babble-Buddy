import express from "express";
import ConversationController from "../../controllers/conversationController.js";

const router = express.Router();

router.post("/", ConversationController.create);

export default router;
