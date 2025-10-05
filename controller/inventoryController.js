const { Inventory } = require("../models");

// ✅ Create item
exports.createInventory = async (req, res) => {
  try {
    const { name, quantity, price, salonId } = req.body;
    const item = await Inventory.create({ name, quantity, price, salonId });
    res.status(201).json(item);
  } catch (err) {
    console.error("❌ createInventory error:", err);
    res.status(500).json({ error: "Failed to create inventory item" });
  }
};

// ✅ Get all items of a salon
exports.getInventory = async (req, res) => {
  try {
    const { salonId } = req.params;
    const items = await Inventory.findAll({ where: { salonId } });
    res.json(items);
  } catch (err) {
    console.error("❌ getInventory error:", err);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
};

// ✅ Update item
exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const item = await Inventory.findByPk(id);

    if (!item) return res.status(404).json({ error: "Item not found" });

    await item.update({ name, quantity, price });
    res.json(item);
  } catch (err) {
    console.error("❌ updateInventory error:", err);
    res.status(500).json({ error: "Failed to update item" });
  }
};

// ✅ Delete item
exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Inventory.findByPk(id);

    if (!item) return res.status(404).json({ error: "Item not found" });

    await item.destroy();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("❌ deleteInventory error:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
