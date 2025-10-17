import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  dose: { type: String },
  frequency: { type: String },
  time: { type: String },
  notes: { type: String },
  is_active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Medication", medicationSchema);
