'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Appointment.belongsTo(models.Salon, { foreignKey: "salonId" });
    }
  }
  Appointment.init({
    salonId: DataTypes.INTEGER,
    customerName: DataTypes.STRING,
    service: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    status: DataTypes.STRING,
    phone: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};