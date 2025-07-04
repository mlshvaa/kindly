'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialist extends Model {
    static associate({ User, Calendar, Service, ServiceSpecialist, Review  }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Calendar, { foreignKey: 'specialistId', as: 'calendar' });
      this.belongsToMany(Service, {
        through: ServiceSpecialist,
        foreignKey: 'specialistId',
        otherKey: 'serviceId',
        as: 'services',
      });
      this.hasMany(Review, { foreignKey: 'specialistId', as: 'reviews' });

    }
  }

  Specialist.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: DataTypes.STRING,
      photo: DataTypes.STRING,
      diplomaPhoto: DataTypes.TEXT,
      clescription: DataTypes.STRING,
      education: DataTypes.STRING,
      position: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Specialist',
    },
  );

  return Specialist;
};
