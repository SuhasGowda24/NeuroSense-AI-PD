import express from "express";
import SymptomLog from "../models/LogSymptom.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

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

router.get("/all", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const logs = await SymptomLog.find().sort({ date: 1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/risk/high", verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Group by userId → get latest log for each user
    const latestLogs = await SymptomLog.aggregate([
      { $sort: { date: -1 } },
      {
        $group: {
          _id: "$userId",
          latestLog: { $first: "$$ROOT" }
        }
      }
    ]);
    // Compute risk level
    const highRiskPatients = latestLogs
      .map(item => {
        const log = item.latestLog;

        const isHigh =
          log.tremor_severity >= 7 ||
          log.stiffness_level >= 7 ||
          log.mood_rating <= 3;

        if (!isHigh) return null;

        return {
          userId: item._id,
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

router.get("/weekly/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const logs = await SymptomLog.find({ userId }).sort({ date: 1 });

    const weekly = {};

    logs.forEach(log => {
      const day = parseInt(log.date.slice(8, 10));
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

router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.body;
    const update = { ...req.body, userId };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const doc = await SymptomLog.findOneAndUpdate({ userId, date }, update, options);
  // HIGH RISK ALERT
if (
  doc.tremor_severity >= 7 ||
  doc.stiffness_level >= 7 ||
  doc.mood_rating <= 3
) {
  console.log("🚨 HIGH-RISK ALERT for user:", userId);
  // In future: send email, SMS, push notification
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
