'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Specialist, Parent }) {
      this.hasOne(Specialist, { foreignKey: 'userId', as: 'specialist' });
      this.hasOne(Parent, { foreignKey: 'userId', as: 'parent' });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      hashpass: DataTypes.STRING,
      role: DataTypes.ENUM('parent', 'specialist', 'admin'),
      isApproved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  return User;
};
