import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "admin"], default: "patient" },

  avatar: { type: String },
  lastLogin: { type: Date, default: null },
  loginCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
