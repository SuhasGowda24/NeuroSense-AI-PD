import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
  prediction: String,
//   probability: Number,
  overlay_url: String,
  heatmap_url: String,
  input_image_url: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Prediction", PredictionSchema);
