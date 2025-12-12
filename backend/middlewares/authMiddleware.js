import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id || decoded._id,   // normalize the decoded JWT payload: 
      role: decoded.role,
    };

    if (!req.user.id) {
      return res
        .status(400)
        .json({ message: "Invalid token payload: Missing user ID" });
    }
     if (!req.user.role) {
      return res.status(400).json({
        message: "Invalid token payload: Missing user role",
      });
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};
