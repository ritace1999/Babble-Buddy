import express from "express";
import { authCheck } from "../../middleware/authCheck.js";
import userController from "../../controllers/userController.js";

const router = express.Router();

router.get("/", authCheck, userController.getUser);
router.post("/", authCheck, userController.readUserPagination);

export default router;
