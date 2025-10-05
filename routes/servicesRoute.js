const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createService, getServices, updateService, deleteService } = require("../controller/servicesController");


// Multer setup (same as before)
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    cb(null, Date.now() + "_" + Math.random().toString(36).slice(2) + ext);
  },
});

const upload = multer({
  storage,
limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Images only"));
    cb(null, true);
  },
});

// Routes
route.post("/services", upload.single("image"), createService);
route.get("/services/:SalonId", getServices);
// route.get("/getservices/:SalonId", getServiceById);
route.put("/services/:SalonId", upload.single("image"), updateService);
route.delete("/services/:SalonId", deleteService);

module.exports = route;
