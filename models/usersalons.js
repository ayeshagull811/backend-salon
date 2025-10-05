'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSalons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSalons.belongsTo(models.User, { foreignKey: "userId" });
  UserSalons.belongsTo(models.Salon, { foreignKey: "salonId" });
   UserSalons.belongsTo(models.Role, { foreignKey: "roleId" });
    }
  }
  UserSalons.init(  {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // table name
          key: "id",
        },
        onDelete: "CASCADE",
      },
      salonId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Salons", // table name
          key: "id",
        },
        onDelete: "CASCADE",
      },
       roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Roles", key: "id" }, // ✅ link to Role
        onDelete: "CASCADE",
      },
    }, {
    sequelize,
    modelName: 'UserSalons',
  });
  return UserSalons;
};