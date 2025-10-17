import express from "express";
import Medication from "../models/Medications.js"; // your Medication model
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all medications for logged-in patient
router.get("/", verifyToken, async (req, res) => {
  try {
    const meds = await Medication.find({ patientId: req.user.id, is_active: true });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new medication
router.post("/", verifyToken, async (req, res) => {
  try {
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

export default router;
