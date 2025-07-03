'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalendarSlot extends Model {
    static associate(models) {
      // Один слот принадлежит одному специалисту
      CalendarSlot.belongsTo(models.Specialist, {
        foreignKey: 'specialistId'
      });
    }
  }

  CalendarSlot.init({
    specialistId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CalendarSlot',
  });

  return CalendarSlot;
};
