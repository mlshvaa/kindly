'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Many-to-many: Service <-> Specialist
      Service.belongsToMany(models.Specialist, {
        through: 'SpecialistServices',
        foreignKey: 'serviceId',
        otherKey: 'specialistId',
      });
    }
  }

  Service.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Service',
    },
  );

  return Service;
};
