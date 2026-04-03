import User from "../models/User.js";
import mongoose from "mongoose";
import PatientProfile from "../models/PatientProfile.js";
import Prediction from "../models/Prediction.js";
// import Report from "../models/Report.js";
import Symptom from "../models/LogSymptom.js";
import Medication from "../models/Medications.js";
import Journey from "../models/JourneyEvent.js";


export const getDashboardData = async (req, res) => {
  try {
    const { role, id } = req.user;

    if (role === "admin") {

      // Fetch all users
      const users = await User.find({});

      // Fetch logged-in admin's own info
      const admin = await User.findById(req.user.id).select("-password");

      // Normalize roles if needed (e.g., map 'patient' → 'user')
      const formattedUsers = users.map((user) => ({
        ...user.toObject(),
        role: user.role === "patient" ? "user" : user.role,
      }));

      return res.json({
        message: "Admin Dashboard Data",
         admin: {
          username: admin.username,
          email: admin.email,
          avatar: admin.avatar || admin.username[0].toUpperCase(),
          role: admin.role,
          lastLogin: admin.lastLogin,
          loginCount: admin.loginCount,
          createdAt: admin.createdAt
        },
        totalUsers: users.length,
        users: formattedUsers,
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(id);

    const predictions = await Prediction.find({ userId: userObjectId });
    const symptoms = await Symptom.find({ userId: userObjectId });
    const medications = await Medication.find({ userId: userObjectId });
    const journey = await Journey.find({ userId: userObjectId });
   console.log("JWT ID:", id);
console.log("ObjectId:", userObjectId);
    
    // this now runs only for non-admin users (like patients)
    return res.json({
      message: "Patient Dashboard Data",
      profile: req.user,
      predictions,
      // reports,
      symptoms,
      medications,
      journey
    });
  } catch (err) {

    console.error("Error in getDashboardData:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('username email role createdAt');
 
    const formattedUsers = await Promise.all(
      users.map(async (user) => {
        const profile = await PatientProfile.findOne({ userId: user._id }).select("diagnosis_date");
        return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role === 'patient' ? 'user' : user.role,
      createdAt: user.createdAt || null,
      diagnosis_date: profile?.diagnosis_date || null
    };
  })
);
    res.json({ users: formattedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};








// import User from "../models/User.js";

// export const getDashboardData = async (req, res) => {
//   try {
//     const { role } = req.user;

//     if (role === "admin") {
//       const users = await User.find({ role: "patient" });
//       return res.json({
//         message: "Admin Dashboard Data",
//         totalPatients: users.length,
//         patients: users,
//       });
//     }

//     // For patient
//     res.json({
//       message: "Patient Dashboard Data",
//       profile: req.user,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
