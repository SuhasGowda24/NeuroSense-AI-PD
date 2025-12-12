import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";
import { createOrUpdateProfile, getMyProfile } from "../controllers/profileController.js";

const router = express.Router();

// CREATE / UPDATE PROFILE (patient only)
router.post("/", verifyToken, createOrUpdateProfile);

// GET LOGGED-IN USER PROFILE
router.get("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // What old getMyProfile did:
    const user = await User.findById(userId).select("-password");
    const profile = await PatientProfile.findOne({ userId });

    return res.json({
      user,
      profile: profile || null
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);
    console.log("DEBUG PROFILE RESPONSE:", {
  user,
  profile
});
console.log("REQ.USER from verifyToken:", req.user);


    return res.status(500).json({ error: err.message });
  }
});


// ADMIN: VIEW ANY USER PROFILE
router.get("/user/:userId", verifyToken, verifyAdmin, async (req, res) => {
  const { userId } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).select("-password");
    const profile = await PatientProfile.findOne({ userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user, profile });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;







// import express from "express";
// import { createOrUpdateProfile, getMyProfile } from "../controllers/profileController.js";
// import { verifyToken } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/", verifyToken, createOrUpdateProfile);
// router.get("/me", verifyToken, getMyProfile);

// export default router;
