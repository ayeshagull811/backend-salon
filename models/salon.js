"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Salon.belongsToMany(models.User, {
        through: models.UserSalons,
        foreignKey: "salonId",
        otherKey: "userId",
        as: "Users", // 👈 alias add kiya
      });

      // ✅ Salon → Role (many-to-many)
      Salon.belongsToMany(models.Role, {
        through: models.UserSalons,
        foreignKey: "salonId",
        otherKey: "roleId",
        as: "Roles",
      });

      // ✅ Salon → UserSalons (direct relation)
      Salon.hasMany(models.UserSalons, {
        foreignKey: "salonId",
        as: "userLinks",
      });

      // ✅ Salon → Service
      Salon.hasMany(models.Service, { foreignKey: "SalonId", as: "services" });
    }
  }
  Salon.init(
    {
      salon_name: DataTypes.STRING,
      salon_email: DataTypes.STRING,
      contact_number: DataTypes.STRING,
      // country: DataTypes.STRING,
      type: DataTypes.STRING,
      // location: DataTypes.STRING,
      // role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Salon",
    }
  );
  return Salon;
};