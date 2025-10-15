import express from "express";
import { createOrUpdateProfile, getMyProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrUpdateProfile);
router.get("/me", verifyToken, getMyProfile);

export default router;
