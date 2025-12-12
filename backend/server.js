import dotenv from "dotenv";
import express from "express";

import http from "http";              // <-- NEW
import { Server } from "socket.io";
import activityRoutes from "./routes/activityRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import connectDB from "./db.js";
import drawingRoutes from "./routes/drawings.js"
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
// Connect to MongoDB
connectDB();


// Create server for socket.io
const server = http.createServer(app);
// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  },
  transports: ["websocket", "polling"]
});
// Make socket.io available inside routes/controllers
app.set("io", io);


// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Single auth route for signup/login
app.use("/api/dashboard", dashboardRoutes); // Protected dashboard routes
app.use("/api/profile", profileRoutes); // Fetches Profile data for Welcome Card
app.use("/api/medications", medicationRoutes); // Medication data  
app.use("/api/symptom-logs", symptomRoutes); // symptomLogs data
app.use("/api/journey", journeyRoutes); // journey data
app.use("/api/drawings", drawingRoutes); // cloudinarystorage data
app.use("/api/predictions", predictionRoutes); // test data
app.use("/api/reports", reportRoutes); // reports data
app.use("/api/activity", activityRoutes); // login & logout of patients
app.use("/api/admin", adminRoutes); // Admin to see all patients data
// Default route for sanity check
app.get("/", (req, res) => {
  res.send("Backend server is running successfully!");
});


// SOCKET.IO EVENTS
io.on("connection", (socket) => {
  // no console logs
  socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
