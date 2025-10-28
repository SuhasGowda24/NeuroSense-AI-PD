import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventType: { type: String, required: true },
  significantLevel: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const JourneyEvent = mongoose.model("JourneyEvent", journeySchema);
export default JourneyEvent;
