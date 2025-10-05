const db = require("../models");

exports.getAppointments = async (req, res) => {
  try {
    const salonId = req.params.salonId; // route se salonId lo

    if (!salonId) {
      return res.status(400).json({ message: "Salon ID required" });
    }

    const appointments = await db.Appointment.findAll({
      where: { salonId }   // yahan direct params use hoga
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


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
      price
    });
    res.json({ message: "Appointment added" });
  }catch (err) {
  console.error("Error adding appointment:", err);
  console.error("Response:", err.response?.data);
  console.error("Status:", err.response?.status);
}
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, service, date, time } = req.body;

    const [updated] = await db.Appointment.update(
      { status, service, date, time },
      { where: { id, salonId: req.user.salonId } }
    );

    if (!updated) return res.status(404).json({ message: "Not found or no permission" });
    res.json({ message: "Appointment updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Appointment.destroy({
      where: { id, salon_id: req.user.salon_id }
    });

    if (!deleted) return res.status(404).json({ message: "Not found or no permission" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
