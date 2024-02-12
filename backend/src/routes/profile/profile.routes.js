import express from "express";
import { authCheck } from "../../middleware/authCheck.js";
import profileController from "../../controllers/profileController.js";

const router = express.Router();

router.get("/", authCheck, profileController.read);
router.put("/edit", authCheck, profileController.update);
router.put("/edit-password", authCheck, profileController.passwordUpdate);
router.put("/edit-avatar", authCheck, profileController.updateAvatar);
router.delete("/edit-avatar/:id", authCheck, profileController.deleteAvatar);

export default router;
