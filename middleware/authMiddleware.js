// middleware/authProtect.js
const jwt = require("jsonwebtoken");

const authProtect = (req, res, next) => {
  let token;

  // 1️⃣ Check Authorization header first
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // "Bearer <token>"
  }

  // 2️⃣ Fallback to cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  // 3️⃣ If token not found
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // 4️⃣ Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "yourSecretKey");
    req.user = decoded; // attach user info to req object
    next(); // allow access
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

module.exports = authProtect;
