import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getDashboardData);

export default router;
