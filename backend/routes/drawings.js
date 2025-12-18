import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Drawing from "../models/Drawing.js";
import axios from "axios";
import { verifyToken } from "../middlewares/authMiddleware.js";

dotenv.config();
const router = express.Router();

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "drawings",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});


const upload = multer({ storage });

// 📤 POST route — upload drawing image + points
router.post("/save-drawing", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { points, taskType } = req.body;
    console.log("BACKEND RECEIVED TASK:", taskType);

    const parsedPoints = points ? JSON.parse(points) : [];

    // 1️⃣ Save image + points to MongoDB
    const drawing = new Drawing({
      userId: req.user.id,
      imageUrl: req.file.path,
      points: parsedPoints,
      task_type: taskType || "spiral",
    });

    await drawing.save();

     // 2️⃣ Call HuggingFace Flask API for analysis{Backend calls it}
    const mlRes = await axios.post(
      "https://suhassgowda-pd-classification-ml.hf.space/analyse",
      {
        strokes: parsedPoints,
        task_type: taskType || "spiral",
      }
    );

    const mlData = mlRes.data;

    // 3️⃣ Save prediction into same document
    drawing.prediction = mlData.prediction;
    drawing.confidence = mlData.confidence;
    drawing.message = mlData.message;
    await drawing.save();

     // 4️⃣ Send response back to frontend
    return res.json({
      success: true,
      imageUrl: drawing.imageUrl,
      task_type: drawing.task_type,
      prediction: drawing.prediction,
      confidence: drawing.confidence,
      message: drawing.message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving drawing" });
  }
});

// 🧾 Optional: Fetch all drawings
router.get("/", async (req, res) => {
  try {
    const drawings = await Drawing.find().sort({ createdAt: -1 });
    res.json(drawings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drawings" });
  }
});

router.get("/user/:userId", verifyToken, async (req, res) => {
  if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const { userId } = req.params;

    const drawings = await Drawing
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json(drawings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drawings" });
  }
});


export default router;
