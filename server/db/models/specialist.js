'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialist extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
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
