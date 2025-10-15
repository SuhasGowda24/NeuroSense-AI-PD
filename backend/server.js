import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes); // Single auth route for signup/login
app.use("/api/dashboard", dashboardRoutes); // Protected dashboard routes
app.use("/api/profile", profileRoutes); // Fetches Profile data for Welcome Card

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
