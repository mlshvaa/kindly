'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    static associate({ User, Review, Request }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Review, { foreignKey: 'parentId', as: 'reviews' });
      this.hasMany(Request, { foreignKey: 'parentId', as: 'requests' });

    }
  }

  Parent.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone: DataTypes.STRING,
      adress: DataTypes.STRING,
      child: DataTypes.STRING,
      childAge: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Parent',
    },
  );

  return Parent;
};
