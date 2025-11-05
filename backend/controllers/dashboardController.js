import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";

export const getDashboardData = async (req, res) => {
  try {
    const { role } = req.user;

    if (role === "admin") {
      const users = await User.find({});

      // Normalize roles if needed (e.g., map 'patient' → 'user')
      const formattedUsers = users.map((user) => ({
        ...user.toObject(),
        role: user.role === "patient" ? "user" : user.role,
      }));

      return res.json({
        message: "Admin Dashboard Data",
        totalUsers: users.length,
        users: users.map(user => ({ ...user.toObject(), role: user.role === 'patient' ? 'user' : user.role }))
      });
    }

    // this now runs only for non-admin users (like patients)
    return res.json({
      message: "Patient Dashboard Data",
      profile: req.user,
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
