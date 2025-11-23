import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  task_type: { type: String}, //spiral,l,le chars, etc...
  points: { type: Array },
  prediction: { type: Number },   // 0 or 1
  confidence: { type: Number },   // 0–1
  message: { type: String },      // "Positive for PD" / "Negative for PD"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Drawing", drawingSchema);
