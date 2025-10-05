const express = require("express");
const { getCategory, createCategory, updateCategory, deleteCategory, toggleCategoryStatus } = require("../controller/categoryController");
const categoryRouter = express.Router();


categoryRouter.get("/getcategory/:salonId", getCategory);
categoryRouter.post("/createcategory", createCategory);
categoryRouter.put("/updatecategory/:id", updateCategory);
categoryRouter.delete("/deletedcategory/:id",deleteCategory);
categoryRouter.patch("/:id/toggle",toggleCategoryStatus);

module.exports = categoryRouter;