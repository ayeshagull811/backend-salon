'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Salon, { foreignKey: "salonId" });
    }
  }
  Category.init({
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(20),
      defaultValue: "#8B5CF6"
    },
    icon: {
      type: DataTypes.STRING(50),
      defaultValue: "Scissors"
    },
    serviceCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "service_count"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active"
    },
    salonId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  field: "salonId"   // DB column ka naam underscore ke sath ho sakta hai
},
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};