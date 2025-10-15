import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stage: { type: String, enum: ["newly_diagnosed", "mid_stage", "advanced", "caregiver"] },
  diagnosis_date: { type: String },
  age: { type: Number },
  location: { type: String },
  primary_symptoms: [String],
  language_preference: { type: String, default: "english" },
  completed_modules: [String],
}, { timestamps: true });

export default mongoose.model("PatientProfile", patientProfileSchema);
