const express = require("express");
const { createSchedule, getStaffSchedule } = require("../controller/scheduleController");


const scheduleRouter = express.Router();

scheduleRouter.post("/staffschedule" , createSchedule)
scheduleRouter.get("/getstaff/:userId" , getStaffSchedule)


module.exports = scheduleRouter;