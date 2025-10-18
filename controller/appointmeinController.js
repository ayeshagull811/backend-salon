const db = require("../models");
const { Op } = require("sequelize");

// ✅ Get all appointments (by salon)
exports.getAppointments = async (req, res) => {
  try {
    const salonId = req.params.salonId;

    if (!salonId) return res.status(400).json({ message: "Salon ID required" });

    const appointments = await db.Appointment.findAll({
      where: { salonId },
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add appointment
exports.addAppointment = async (req, res) => {
  try {
    const { customerName, service, date, time, status, phone, price } = req.body;

    await db.Appointment.create({
      salonId: req.user.salonId,
      customerName,
      service,
      date,
      time,
      status,
      phone,
      price,
    });

    res.json({ message: "Appointment added" });
  } catch (err) {
    console.error("Error adding appointment:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, service, date, time } = req.body;

    const [updated] = await db.Appointment.update(
      { status, service, date, time },
      { where: { id, salonId: req.user.salonId } }
    );

    if (!updated)
      return res.status(404).json({ message: "Not found or no permission" });

    res.json({ message: "Appointment updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db.Appointment.destroy({
      where: { id, salonId: req.user.salonId },
    });

    if (!deleted)
      return res.status(404).json({ message: "Not found or no permission" });

    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ NEW: Monthly Appointments Summary (for chart)
exports.getMonthlyAppointments = async (req, res) => {
  try {
    const { salonId } = req.params;
    if (!salonId) return res.status(400).json({ message: "Salon ID required" });

    // Sequelize query for month-wise counts
    const results = await db.Appointment.findAll({
      attributes: [
        [
          db.sequelize.fn("MONTHNAME", db.sequelize.col("date")),
          "month",
        ],
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
      ],
      where: { salonId },
      group: [db.sequelize.fn("MONTH", db.sequelize.col("date"))],
      order: [[db.sequelize.fn("MONTH", db.sequelize.col("date")), "ASC"]],
    });

    const formatted = results.map((r) => ({
      month: r.getDataValue("month"),
      count: r.getDataValue("count"),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error getting monthly appointments:", error);
    res.status(500).json({ message: error.message });
  }
};
