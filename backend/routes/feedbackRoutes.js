import express from "express";
import Feedback from "../models/Feedback.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route POST /api/feedback
 * @desc Submit patient feedback
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const feedback = new Feedback({
      userId: req.user.id,
      user_email: req.user.email,
      ...req.body,
      source: req.body.source || "general"
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully"
    });
  } catch (err) {
    console.error("Feedback submit error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route GET /api/feedback/all
 * @desc Admin – view all feedback
 */
router.get("/all", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: feedback
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/**
 * @route GET /api/feedback/user/:userId
 * @desc Admin – view feedback of one patient
 */
router.get("/user/:userId", verifyToken, verifyAdmin, async (req, res) => {
  const feedback = await Feedback.find({ userId: req.params.userId })
    .sort({ createdAt: -1 });

  res.json({ success: true, data: feedback });
});

/**
 * @route PUT /api/feedback/:id
 * @desc Admin – update feedback status / response
 */
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status, response } = req.body;

    const update = {
      status
    };

    if (response) {
      update.response = response;
      update.responded_at = new Date();
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


export default router;
