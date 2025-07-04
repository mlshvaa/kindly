'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate({ Specialist, ServiceSpecialist }) {
      this.belongsToMany(Specialist, {
        through: ServiceSpecialist,
        foreignKey: 'serviceId',
        otherKey: 'specialistId',
        as: 'specialists',
      });
    }
  }

  Service.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Service',
    },
  );

  return Service;
};
