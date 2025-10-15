import User from "../models/User.js";

export const getDashboardData = async (req, res) => {
  try {
    const { role } = req.user;

    if (role === "admin") {
      const users = await User.find({ role: "patient" });
      return res.json({
        message: "Admin Dashboard Data",
        totalPatients: users.length,
        patients: users,
      });
    }

    // For patient
    res.json({
      message: "Patient Dashboard Data",
      profile: req.user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
