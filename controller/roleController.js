const { Role, Permission } = require("../models");

module.exports = {
  // Create role
// Create role
async createRole(req, res) {
  try {
    console.log("📥 Incoming body:", req.body);

    const { name, salonId, permissionIds } = req.body;

    // Debug values
    console.log("Role Name:", name);
    console.log("Salon ID:", salonId);
    console.log("Permission IDs:", permissionIds);

    const role = await Role.create({ name, salonId });

    if (permissionIds && permissionIds.length > 0) {
      await role.setPermissions(permissionIds);
    }

    return res.status(201).json({ message: "Role created", role });
  } catch (err) {
    console.error("❌ Backend createRole error:", err);
    return res.status(500).json({ error: err.message });
  }
},



  // Get all roles
async getRoles(req, res) {
  try {
    const { salonId } = req.query;
    if (!salonId) {
      return res.status(400).json({ message: "SalonId is required" });
    }

   const roles = await Role.findAll({
  where: { salonId },   // ✅ case match karo
  include: [{ model: Permission, as: "Permissions" }],
});

    res.json(roles);
  } catch (error) {
    console.error("Error in getRoles:", error);
    res.status(500).json({ error: error.message });
  }
}
,
  // Get single role
  async getRole(req, res) {
    try {
      const role = await Role.findByPk(req.params.id, {
        include: [{ model: Permission, as: "Permissions" }],
      });

      if (!role) return res.status(404).json({ message: "Role not found" });

      res.json(role);
    } catch (error) {
      console.error("Error in getRole:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update role
  async updateRole(req, res) {
    try {
      const { name, permissionIds } = req.body;

      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });

      // ✅ Optional: check if new name conflicts with existing role
      if (name && name !== role.name) {
        const nameExists = await Role.findOne({ where: { name } });
        if (nameExists) {
          return res.status(400).json({ message: "Role name already exists" });
        }
      }

      await role.update({ name });

      if (permissionIds) {
        await role.setPermissions(permissionIds);
      }

      res.json({ message: "Role updated successfully", role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete role
  async deleteRole(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });

      await role.destroy();
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
}; 