import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  points: { type: Array },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Drawing", drawingSchema);
