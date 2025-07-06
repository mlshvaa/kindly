'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    static associate({ Specialist, Request }) {
      this.belongsTo(Specialist, { foreignKey: 'specialistId', as: 'specialist' });
      this.hasMany(Request, { foreignKey: 'calendarId', as: 'requests' });
    }
  }

  Calendar.init(
    {
      specialistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Calendar',
    },
  );

  return Calendar;
};
