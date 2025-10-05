// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // Dummy database
// const users = [];

// // Signup API
// app.post("/api/signup", (req, res) => {
//   const { email, password } = req.body;
//   const exists = users.find(u => u.email === email);
//   if (exists) return res.status(400).json({ message: "User already exists" });
//   users.push({ email, password });
//   res.status(201).json({ message: "Signup successful" });
// });

// // Login API
// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(u => u.email === email && u.password === password);
//   if (!user) return res.status(400).json({ message: "Invalid credentials" });
//   res.status(200).json({ message: "Login successful" });
// });

// // Serve React build
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// // Catch-all: React frontend routing
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
