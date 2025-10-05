'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Schedule.belongsTo(models.User, { foreignKey: 'userId' });

      Schedule.belongsTo(models.Salon, { foreignKey: 'salonId' });
    }
  }
  Schedule.init({
    
    date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
     userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
         salonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};