import express from "express";
import Activity from "../models/Activity.js";

const router = express.Router();

// GET latest 20 activities
router.get("/latest", async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(20);

    res.json({ activities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
