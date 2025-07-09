'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate({ Calendar, Parent }) {
      this.belongsTo(Calendar, { foreignKey: 'calendarId', as: 'calendar' });
      this.belongsTo(Parent, { foreignKey: 'parentId', as: 'parent' });
    }
  }

  Request.init(
    {
      calendarId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: DataTypes.TEXT,
      status: DataTypes.ENUM('ожидание', 'одобрено', 'отклонено'),
    },
    {
      sequelize,
      modelName: 'Request',
    },
  );

  return Request;
};
