import express from "express";
import MessageController from "../../controllers/messageController.js";
import { authCheck } from "../../middleware/authCheck.js";

const router = express.Router();

router.post("/send/:id", authCheck, MessageController.send);
router.get("/:id", authCheck, MessageController.getMessages);

export default router;
