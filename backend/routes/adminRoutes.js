import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Prediction from "../models/Prediction.js";
import SymptomLog from "../models/LogSymptom.js";
import Medication from "../models/Medications.js";
import JourneyEvent from "../models/JourneyEvent.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/patient/:userId/report", verifyToken, verifyAdmin, async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const predictions = await Prediction.find({ userId }).sort({ timestamp: -1 });
    const symptoms = await SymptomLog.find({ userId }).sort({ date: -1 });
    const medications = await Medication.find({ patientId: userId });
    const journey = await JourneyEvent.find({ patientId: userId }).sort({ date: -1 });

    return res.json({
      user,
      predictions,
      symptoms,
      medications,
      journey
    });
  } catch (err) {
    console.error("Admin patient report error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
