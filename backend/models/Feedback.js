import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    user_email: String,

    // Ratings (1–5)
    navigation_ease: Number,
    instructions_clarity: Number,
    results_understanding: Number,
    assessment_accuracy: Number,
    health_understanding: Number,
    comfort_level: Number,
    trust_level: Number,
    support_doctors: Number,
    would_recommend: Number,

    additional_feedback: {
      type: String,
      trim: true
    },

    // Context (VERY useful for admin)
    source: {
      type: String,
      enum: ["bug_report", "feature_request", "improvement", "general"],
      default: "general"
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved", "dismissed"],
      default: "pending"
    },

    response: String,
    responded_at: Date
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
