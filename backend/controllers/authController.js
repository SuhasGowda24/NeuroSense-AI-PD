import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    //create jwt
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
