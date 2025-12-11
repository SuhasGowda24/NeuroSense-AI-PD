import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  action: { type: String, required: true },      // e.g. "Patient logged in"
  user: { type: String, required: true },        // username
  type: { type: String, default: "info" },       // success/warning/info
  icon: { type: String, default: "Users" },      // icon name
  timestamp: { type: Date, default: Date.now }   // auto timestamp
});

export default mongoose.model("Activity", activitySchema);
