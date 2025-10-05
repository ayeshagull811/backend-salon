const db = require("../models");

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      // 🛑 Step 1: Ensure user exists in token
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized: No user in request" });
      }

      // 🛑 Step 2: Find user with roles & permissions
      const user = await db.User.findByPk(req.user.id, {
        include: [
          {
            model: db.Role,
            as: "Roles", // ✅ must match User.associate
            include: [
              {
                model: db.Permission,
                as: "Permissions", // ✅ must match Role.associate
                attributes: ["id", "name"], // only needed fields
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(403).json({ message: "Forbidden: User not found" });
      }

      // 🛑 Step 3: Collect all user permissions
      const userPermissions = [
        ...new Set(
          user.Roles?.flatMap((role) =>
            role.Permissions?.map((perm) =>
              perm.name.trim().toLowerCase()
            )
          ) || []
        ),
      ];

      // Debug log
      console.log("🔑 User Permissions:", userPermissions);

      // Attach permissions for later use
      req.user.permissions = userPermissions;

      // 🛑 Step 4: Check if required permission exists
      if (!userPermissions.includes(permissionName.toLowerCase())) {
        return res
          .status(403)
          .json({ message: `Forbidden: Missing ${permissionName}` });
      }

      // ✅ Step 5: Permission allowed
      next();
    } catch (error) {
      console.error("checkPermission error:", error);
      res.status(500).json({ message: "Server error in permission check" });
    }
  };
};

module.exports = checkPermission;
