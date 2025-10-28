import mongoose from "mongoose";

const LogSymptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // store YYYY-MM-DD for easy queries
  tremor_severity: { type: Number, default: 0 },
  stiffness_level: { type: Number, default: 0 },
  mood_rating: { type: Number, default: 0 },
  sleep_quality: { type: Number, default: 0 },
  step_count: { type: Number, default: 0 },
  notes: { type: String, default: '' },
}, { timestamps: true });

LogSymptomSchema.index({ userId: 1, date: 1 }, { unique: true }); // one entry per user per date

export default mongoose.models.LogSymptom || mongoose.model('SymptomLog', LogSymptomSchema);
