import express from "express";
import AuthController from "../../controllers/authController.js";

const router = express.Router();

router.post("/signin", AuthController.signIn);
router.post("/signup", AuthController.signUp);
router.post("/logout", AuthController.logout);

export default router;
