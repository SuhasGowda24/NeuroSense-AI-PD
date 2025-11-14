import express from "express";
import Prediction from "../models/Prediction.js";  // same schema used for HF collection

const router = express.Router();

// GET latest ML prediction
router.get("/latest", async (req, res) => {
  try {
    const latest = await Prediction.findOne().sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No predictions found" });
    }

    res.json(latest);
  } catch (err) {
    console.error("Error fetching latest prediction:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
