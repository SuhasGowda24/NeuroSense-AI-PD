// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Serve React build
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// // Example API route
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from Express!" });
// });

// // Catch-all: React frontend routing
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
