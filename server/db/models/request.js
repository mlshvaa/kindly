'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      // Заявка отправлена от клиента → специалисту
      Request.belongsTo(models.User, { foreignKey: 'clientId', as: 'Client' });
      Request.belongsTo(models.Specialist, { foreignKey: 'specialistId' });
    }
  }

  Request.init(
    {
      specialistId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      status: DataTypes.ENUM('pending', 'approved', 'declined'),
    },
    {
      sequelize,
      modelName: 'Request',
    },
  );

  return Request;
};
