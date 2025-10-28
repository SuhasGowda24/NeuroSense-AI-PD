import express from "express";
import SymptomLog from "../models/LogSymptom.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit || "30", 10);
    const logs = await SymptomLog.find({ userId }).sort({ date: 1 }).limit(limit);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/today", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const log = await SymptomLog.findOne({ userId, date });
    res.json(log || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.body;
    const update = { ...req.body, userId };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const doc = await SymptomLog.findOneAndUpdate({ userId, date }, update, options);
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const doc = await SymptomLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
