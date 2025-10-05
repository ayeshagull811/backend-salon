const db = require("../models");
const { Op } = require('sequelize');

const User = db.User;
const Salon = db.Salon;
const Schedule = db.Schedule;

const createSchedule = async (req, res) => {
  try {
    const { userId, salonId, date, start_time, end_time } = req.body;

    if (!userId || !salonId || !date || !start_time || !end_time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // validate times: start < end (simple check)
    if (start_time >= end_time) {
      return res.status(400).json({ message: "start_time must be before end_time. For overnight shifts use start/end datetimes or special handling." });
    }

    // check overlapping for same user on same date
    const existing = await Schedule.findOne({
      where: {
        userId,
        date,
        [Op.or]: [
          { start_time: { [Op.between]: [start_time, end_time] } },
          { end_time: { [Op.between]: [start_time, end_time] } },
          {
            [Op.and]: [
              { start_time: { [Op.lte]: start_time } },
              { end_time: { [Op.gte]: end_time } },
            ],
          },
          {
            [Op.and]: [
              { start_time: { [Op.gte]: start_time } },
              { end_time: { [Op.lte]: end_time } },
            ],
          },
        ],
      },
    });

    if (existing) {
      return res.status(409).json({ message: "Shift overlaps existing shift" });
    }

    const schedule = await Schedule.create({
      userId,
      salonId,
      date,
      start_time,
      end_time,
    });

    return res.status(201).json(schedule);
  } catch (err) {
    console.error("createSchedule error:", err);
    return res.status(500).json({ error: err.message });
  }
};

const getStaffSchedule = async (req, res) => {
  try {
    console.log("Query params:", req.query);   // start_time & end_time
    console.log("UserId param:", req.params.userId); 
    const { userId } = req.params;
    // I recommend using start_time / end_time as query names to avoid confusion with times
  const { start_time, end_time } = req.query;


    const where = { userId };

    if (start_time && end_time) {
      where.date = { [Op.between]: [start_time, end_time] };
    }
    const schedules = await Schedule.findAll({
      where: {
        userId: userId,
        date: {
          [Op.between]: [start_date, end_date]
        }
      },
      include: ["User", "Salon"] // agar relations chahiye
    });

    console.log("GET /schedule/getstaff called for userId:", userId, "range:", start_time, end_time);
    return res.json(schedules);
  } catch (err) {
    console.error("getStaffSchedule error:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createSchedule, getStaffSchedule };
