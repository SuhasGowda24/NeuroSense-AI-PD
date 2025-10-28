import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    dosage: { type: String, trim: true },           // e.g. "5 mg"
    frequency: { type: String, trim: true },        // e.g. "Once daily"
    times: [{ type: String, trim: true }],          // array of times, e.g. ["08:00", "20:00"]
    with_food: { type: Boolean, default: false },
    purpose: { type: String, trim: true },
    side_effects: [{ type: String, trim: true }],
    started_date: { type: Date },
    end_date: { type: Date },
    notes: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    logs: [{
  time: { type: String, required: true }, // e.g., "08:00"
  status: { type: String, enum: ['taken', 'not-taken'], required: true },
  date: { type: String, required: true }, // YYYY-MM-DD format
  timestamp: { type: Date, default: Date.now } // Optional for sorting
}],

  },
  { timestamps: true }
);

export default mongoose.models.Medication || mongoose.model("Medication", medicationSchema);