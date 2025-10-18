const express = require("express");
const {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getMonthlyAppointments,
} = require("../controller/appointmeinController");
const authProtect = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

const appointmentRouter = express.Router();

// ✅ Get all appointments
appointmentRouter.get(
  "/getappointment/:salonId",
  authProtect,
  checkPermission("manage_appointments"),
  getAppointments
);

// ✅ Add appointment
appointmentRouter.post(
  "/postappointment",
  authProtect,
  checkPermission("manage_appointments"),
  addAppointment
);

// ✅ Update appointment
appointmentRouter.put(
  "/updateappointment/:id",
  authProtect,
  checkPermission("manage_appointments"),
  updateAppointment
);

// ✅ Delete appointment
appointmentRouter.delete(
  "/deleteappointment/:id",
  authProtect,
  checkPermission("manage_appointments"),
  deleteAppointment
);

// ✅ New monthly chart route
appointmentRouter.get(
  "/monthly/:salonId",
  authProtect,
  checkPermission("manage_appointments"),
  getMonthlyAppointments
);

module.exports = appointmentRouter;
