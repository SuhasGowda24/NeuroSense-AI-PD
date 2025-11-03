import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Drawing from "../models/Drawing.js";
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
router.post("/save-drawing", upload.single("image"), async (req, res) => {
  try {
    const { points } = req.body;
    const parsedPoints = points ? JSON.parse(points) : [];

    const drawing = new Drawing({
      imageUrl: req.file.path,
      points: parsedPoints,
    });

    await drawing.save();
    res.json({ success: true, imageUrl: req.file.path });
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

export default router;
