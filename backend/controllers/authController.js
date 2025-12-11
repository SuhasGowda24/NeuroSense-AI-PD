import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Activity from "../models/Activity.js";


// SIGNUP
export const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role, // "admin" or "patient"
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    //Check if the role matches
    if (user.role !== role) {
      return res.status(403).json({ message: `Role mismatch. Access denied for ${role}` });
    }

    // UPDATE LOGIN METRICS
    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    // UPDATE ONLINE STATUS (GREEN DOT)
    user.onlineStatus = true;
    await user.save();

    // STORE ACTIVITY
  if (user.role === "patient") {
    await Activity.create({
      action: "Patient logged in",
      user: user.username,
      type: "success",
      icon: "Users"
    });

  req.app.get("io").emit("user:status", {
    userId: user._id,
    username: user.username,
    onlineStatus: true
  });
}

    //create jwt
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// LOGOUT
export const logout = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // UPDATE ONLINE STATUS
    user.onlineStatus = false;
    await user.save();

    // LOG ACTIVITY
  if (user.role === "patient") {
    await Activity.create({
      action: "Patient logged out",
      user: user.username,
      type: "warning",
      icon: "Users"
    });

  req.app.get("io").emit("user:status", {
    userId: user._id,
    username: user.username,
    onlineStatus: false
  });
}

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

