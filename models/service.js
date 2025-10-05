"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Service.belongsTo(models.Salon, { foreignKey: "SalonId" });
        
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      currency: DataTypes.STRING,
      discount: DataTypes.DECIMAL,
      duration: DataTypes.STRING,
      employee: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      tags: DataTypes.STRING,
      image: DataTypes.STRING,
      features: DataTypes.JSON,
      imagePreview: DataTypes.STRING,
      // migration file me add karo
       SalonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
