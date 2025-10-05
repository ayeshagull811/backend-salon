const { Permission } = require("../models");

module.exports = {
  // Create Permission
  async createPermission(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Permission name is required" });
      }

      const permission = await Permission.create({ name });

      res.status(201).json({ message: "Permission created successfully", permission });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all Permissions
  async getPermissions(req, res) {
    try {
      const permissions = await Permission.findAll();
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get single Permission
  async getPermission(req, res) {
    try {
      const permission = await Permission.findByPk(req.params.id);

      if (!permission) {
        return res.status(404).json({ message: "Permission not found" });
      }

      res.json(permission);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update Permission
  async updatePermission(req, res) {
    try {
      const { name } = req.body;

      const permission = await Permission.findByPk(req.params.id);
      if (!permission) return res.status(404).json({ message: "Permission not found" });

      await permission.update({ name });

      res.json({ message: "Permission updated successfully", permission });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete Permission
  async deletePermission(req, res) {
    try {
      const permission = await Permission.findByPk(req.params.id);
      if (!permission) return res.status(404).json({ message: "Permission not found" });

      await permission.destroy();
      res.json({ message: "Permission deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
