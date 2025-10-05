// models/permission.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: models.RolePermissions,
        foreignKey: "permissionId",
        otherKey: "roleId",
        as: "Roles",
      });
    }
  }
  Permission.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "Permissions",
    }
  );
  return Permission;
};
