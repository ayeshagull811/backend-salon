"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    User.belongsToMany(models.Role, {
  through: models.UserSalons,
  foreignKey: "userId",
  otherKey: "roleId",
  as: "Roles",   // ✅ Correct alias
});


      // ✅ User → Salon (indirectly through UserSalons)
      User.belongsToMany(models.Salon, {
        through: models.UserSalons,
        foreignKey: "userId",
        otherKey: "salonId",
          as: "Salons", 
      });

      // ✅ User → Schedule
      User.hasMany(models.Schedule, { foreignKey: "staff_id" ,as: "Schedules" });
  
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      email: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      confirmpassword: DataTypes.STRING,

      address: DataTypes.STRING,
      position: DataTypes.STRING,
      department: DataTypes.STRING,
      salary: DataTypes.FLOAT,
      startDate: DataTypes.DATE,
      experience: DataTypes.INTEGER,
      specialization: DataTypes.STRING,
      certifications: DataTypes.STRING,
      notes: DataTypes.TEXT,
      gender: DataTypes.STRING,
      mustChangePassword: {
        // ✅ Ab sahi jagah par (fields ke andar hi)
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};