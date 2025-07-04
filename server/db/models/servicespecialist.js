'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ServiceSpecialist extends Model {
    static associate({ Specialist, Service }) {
      this.belongsTo(Specialist, { foreignKey: 'specialistId', as: 'specialist' });
      this.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
    }
  }

  ServiceSpecialist.init(
    {
      specialistId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ServiceSpecialist',
    },
  );

  return ServiceSpecialist;
};
