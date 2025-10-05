const db = require("../models");
const Salon = db.Salon;
const Category = db.Category;

const getCategory = async (req, res) => {
  try {
     const { salonId } = req.params;
    const categories = await Category.findAll({
      where: { SalonId: salonId }
    });
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name, description, color, icon ,salonId } = req.body;
       if (!salonId) {
      return res.status(400).json({ success: false, message: "salonId is required" });
    }
    const newCategory = await Category.create({
      name,
      description,
      color,
      icon,
      serviceCount: 0,
      isActive: true,
      salonId
    });
    res.status(201).json({ success: true, data: newCategory });
  } catch (err) {
      console.error("❌ Error creating category:", err);
    res.status(400).json({ error: err.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { name, description, color, icon, isActive } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }
    await category.update({ name, description, color, icon, isActive });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
const toggleCategoryStatus = async (req, res) =>{
      try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.isActive = !category.isActive;
    await category.save();
    res.json({ message: "Status updated", category });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle status" });
  }
}

module.exports={getCategory,createCategory,updateCategory,deleteCategory,toggleCategoryStatus}