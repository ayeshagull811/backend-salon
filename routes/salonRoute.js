const express = require("express");
const {
  getAllSalons,
  createSalon,
  addSalonById,
  getSalonById,
  updateSalon,
  deleteSalon,
  getSalonDetails,
} = require("../controller/salonController");
const authProtect = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

const routes = express.Router();
routes.get(
  "/getsalon",
  authProtect,
  checkPermission("view_salon"),
  getAllSalons
);

routes.get(
  "/getsalonbyid/:userId",
  authProtect,
 
  getSalonById
);

routes.get(
  "/getsalondetails/:salonId",
  authProtect,
  checkPermission("view_salon"),
  getSalonDetails
);

routes.post(
  "/create",
  authProtect,

  createSalon
);

routes.put(
  "/update/:salonId",
  authProtect,
  checkPermission("update_salon"),
  updateSalon
);

routes.delete(
  "/delete/:salonId",
  authProtect,
  checkPermission("delete_salon"),
  deleteSalon
);

routes.post(
  "/:salonId/addUser",
  authProtect,
  checkPermission("assign_roles"),
  addSalonById
);


module.exports = routes;
