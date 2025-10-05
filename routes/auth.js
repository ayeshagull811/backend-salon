const express = require("express")
const {RegisterUser,LoginUser,getStaffById, RegisterStaff} = require("../controller/authController");

const router = express.Router();

router.post("/registeruser" , RegisterUser)
router.post("/loginuser" , LoginUser)
router.post("/registerstaff" , RegisterStaff)
router.get("/getstaff/:SalonId" , getStaffById)

module.exports = router;