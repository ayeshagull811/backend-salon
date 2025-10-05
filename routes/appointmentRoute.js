const express = require("express");
const { getAppointments, addAppointment, updateAppointment, deleteAppointment } = require("../controller/appointmeinController");
const authProtect = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

const appointmentRouter = express.Router();

// ✅ Get all appointments
appointmentRouter.get("/getappointment/:salonId", authProtect, checkPermission("manage_appointments"),getAppointments);

// ✅ Add appointment
appointmentRouter.post("/postappointment", authProtect, checkPermission("manage_appointments"),addAppointment);

// ✅ Update appointment
appointmentRouter.put("/updateappointment/:salonId", authProtect, checkPermission("manage_appointments"),updateAppointment);

// ✅ Delete appointment
appointmentRouter.delete("/deleteappointment/:salonId", authProtect, checkPermission("manage_appointments"),deleteAppointment);

module.exports = appointmentRouter;
