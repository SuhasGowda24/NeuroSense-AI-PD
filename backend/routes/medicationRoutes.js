import express from "express";
import Medication from "../models/Medications.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all medications for logged-in patient
router.get("/", verifyToken, async (req, res) => {
  try {
    // If admin → allow ?userId=
    const targetUserId = req.user.role === "admin" && req.query.userId
      ? req.query.userId
      : req.user.id;

      // Validate ObjectId for admin queries
    if (req.user.role === "admin" && req.query.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
    }

    const meds = await Medication.find({ patientId: targetUserId });
    res.json(meds);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new medication(patients only)
router.post("/", verifyToken, async (req, res) => {
  try {
    // Admin should NOT create medications for patients unless allowed
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot add medications" });
    }
    const med = new Medication({
      ...req.body,
      patientId: req.user.id,
      is_active: true,
    });
    const savedMed = await med.save();
    res.status(201).json(savedMed);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/logs", verifyToken, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const targetUserId = req.user.role === "admin" && req.query.userId
        ? req.query.userId
        : req.user.id;
        
        if (req.user.role === "admin" && req.query.userId) {
          if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
          }
        }

    const meds = await Medication.find({ patientId: targetUserId, is_active: true });
    const logs = [];
    meds.forEach(med => {
      med.logs.filter(log => log.date === today).forEach(log => logs.push({ medication_id: med._id, medication_name: med.name, scheduled_time: `${log.date}T${log.time}:00`, taken_time: log.timestamp, taken: log.status === 'taken', side_effects_noted: [] }));
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST log event (patients only)
router.post("/logs", verifyToken, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot modify logs" });
    }

    const { medication_id, scheduled_time, taken_time, taken } = req.body;
    
    const med = await Medication.findOneAndUpdate(
      { _id: medication_id, patientId: req.user.id },
      { $push: { logs: { time: scheduled_time.split('T')[1].slice(0,5), status: taken ? 'taken' : 'not-taken', date: scheduled_time.split('T')[0], timestamp: taken_time } } },
      { new: true }
    );
    if (!med) return res.status(404).json({ message: "Medication not found" });
    res.status(201).json(med.logs[med.logs.length - 1]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


  // PUT update medication by ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot edit medications" });
    }
    const { id } = req.params;
    
    const updatedMed = await Medication.findOneAndUpdate(
      { _id: id, patientId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedMed) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json(updatedMed);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Error updating medication" });
  }
});

export default router;
