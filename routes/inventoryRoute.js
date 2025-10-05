const express = require("express");
const inventoryRouter = express.Router();
const { createInventory, getInventory, updateInventory, deleteInventory } = require("../controller/inventoryController");
const authProtect = require("../middleware/authMiddleware");

// ✅ CRUD Routes
inventoryRouter.post("/postinventory", authProtect, createInventory);
inventoryRouter.get("/getinventory/:salonId", authProtect, getInventory);
inventoryRouter.put("/updateinventory/:id", authProtect, updateInventory);
inventoryRouter.delete("/deleteinventory/:id", authProtect, deleteInventory);

module.exports = inventoryRouter;
