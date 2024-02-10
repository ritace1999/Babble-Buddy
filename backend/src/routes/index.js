import express from "express";
import { routesError } from "../middleware/error.middleware.js";

const router = express.Router();

router.use(routesError);

export default router;
