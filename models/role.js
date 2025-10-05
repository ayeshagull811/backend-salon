'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: models.UserSalons,
        foreignKey: "roleId",
        otherKey: "userId",
        as: "Users",
      });

      Role.belongsToMany(models.Salon, {
        through: models.UserSalons,
        foreignKey: "roleId",
        otherKey: "salonId",
        as: "Salons",
      });

      Role.belongsToMany(models.Permission, {
        through: models.RolePermissions,
        foreignKey: "roleId",
        otherKey: "permissionId",
        as: "Permissions",
      });

      Role.belongsTo(models.Salon, { foreignKey: "salonId", as: "Salon" });
    }
  }

  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // ❌ unique: true hatao
    },
    salonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles',
    indexes: [
      {
        unique: true,
        fields: ['name', 'salonId'],  // ✅ per salon unique
      }
    ]
  });

  return Role;
};
