import express from "express";
import mongoose from "mongoose";
import SymptomLog from "../models/LogSymptom.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//GET symptom logs (patient OR admin for selected user)
router.get("/", verifyToken, async (req, res) => {
  try {
    // const userId = req.user.id;
    const targetUserId =
      req.user.role === "admin" && req.query.userId
        ? req.query.userId
        : req.user.id;

        // Validation for admin queries
    if (req.user.role === "admin" && req.query.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
    }

    const limit = parseInt(req.query.limit || "30", 10);
   const userObjectId = new mongoose.Types.ObjectId(targetUserId);

const logs = await SymptomLog.find({
  userId: userObjectId
})
.sort({ date: 1 })
.limit(limit);
    res.json(logs);
  } catch (err) {
    res.status(500).json({
  message: "Internal server error",
  error: err.message
});
  }
});

// GET today's symptom log (patient OR admin for selected user)
router.get("/today", verifyToken, async (req, res) => {
  try {
    const targetUserId =
      req.user.role === "admin" && req.query.userId
        ? req.query.userId
        : req.user.id;

    if (req.user.role === "admin" && req.query.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
    }
    const date = req.query.date || new Date().toISOString().split("T")[0];
   const userObjectId = new mongoose.Types.ObjectId(targetUserId);

const log = await SymptomLog.findOne({
  userId: userObjectId,
  date
});
    res.json(log || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN: GET ALL logs
router.get("/all", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const logs = await SymptomLog.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//ADMIN: Get highest risk patients
router.get("/risk/high", verifyToken, verifyAdmin, async (req, res) => {
  try {
    // 1. Get ALL logs & populate user info
    const logs = await SymptomLog.find()
      .sort({ date: -1 })
      .populate("userId", "username email"); 

    // 2. Keep only latest log per user
    const latest = new Map();
    
    logs.forEach(log => {
      const uid = log.userId?._id?.toString();
      if (!latest.has(uid)) {
        latest.set(uid, log); // first entry = latest because logs sorted desc
      }
    });

    // 3. Filter high-risk patients
    const highRiskPatients = [...latest.values()]
      .map(log => {
        const isHigh =
          log.tremor_severity >= 7 ||
          log.stiffness_level >= 7 ||
          log.mood_rating <= 3;

        if (!isHigh) return null;

        return {
          userId: log.userId._id,
          username: log.userId.username,   
          email: log.userId.email,
          date: log.date,
          tremor: log.tremor_severity,
          stiffness: log.stiffness_level,
          mood: log.mood_rating,
          sleep: log.sleep_quality
        };
      })
      .filter(Boolean);

    res.json(highRiskPatients);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// WEEKLY AGGREGATE DATA
router.get("/weekly/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Security: block patients from accessing other patients' data
    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const logs = await SymptomLog.find({
  userId: new mongoose.Types.ObjectId(userId)
}).sort({ date: 1 });

    const weekly = {};

    logs.forEach(log => {
      // const day = parseInt(log.date.slice(8, 10));
      const week = `${log.date.slice(0, 4)}-W${Math.ceil(parseInt(log.date.slice(8, 10)) / 7)}`;

      if (!weekly[week]) {
        weekly[week] = {
          tremor: [],
          stiffness: [],
          mood: [],
          sleep: []
        };
      }

      weekly[week].tremor.push(log.tremor_severity);
      weekly[week].stiffness.push(log.stiffness_level);
      weekly[week].mood.push(log.mood_rating);
      weekly[week].sleep.push(log.sleep_quality);
    });

    // Convert arrays → avg values
    const weeklyData = Object.keys(weekly).map(week => ({
      week,
      tremor: avg(weekly[week].tremor),
      stiffness: avg(weekly[week].stiffness),
      mood: avg(weekly[week].mood),
      sleep: avg(weekly[week].sleep)
    }));

    res.json(weeklyData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function avg(arr) {
  return arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;
}

// CREATE or UPDATE symptom log for today
router.post("/", verifyToken, async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const { date } = req.body;

    const update = {
      ...req.body,
      userId: userObjectId
    };

    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };

    const doc = await SymptomLog.findOneAndUpdate(
      { userId: userObjectId, date },
      update,
      options
    );

    // HIGH RISK ALERT
    if (
      doc.tremor_severity >= 7 ||
      doc.stiffness_level >= 7 ||
      doc.mood_rating <= 3
    ) {
      console.log("🚨 HIGH-RISK ALERT for user:", req.user.id);
    }

    res.json(doc);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ANY LOG BY ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const doc = await SymptomLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
