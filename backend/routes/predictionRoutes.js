import express from "express";
import mongoose from "mongoose";
import Prediction from "../models/Prediction.js";  // same schema used for HF collection
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET latest ML prediction
router.get("/latest",  verifyToken, async (req, res) => {
  try {
    const targetUserId =
    req.user.role === "admin" && req.query.userId
      ? req.query.userId
      : req.user.id;

    const latest = await Prediction.findOne({ userId: targetUserId }).sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No predictions found" });
    }

    // res.json(latest);
    res.json({
  success: true,
  data: latest
});

  } catch (err) {
    console.error("Error fetching latest prediction:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all predictions (ADMIN ONLY)
router.get("/all", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const filter = {};

    // Allow admin to select specific patient reports
    if (req.query.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
     filter.userId = req.query.userId;
    }
    const tests = await Prediction.find(filter)
  .populate("userId", "username email")
  .sort({ timestamp: -1 });

     res.json({
      success: true,
      data: tests
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
