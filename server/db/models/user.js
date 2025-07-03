'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {
      // this.hasMany(News, { foreignKey: 'userId', as: 'Author' });
      // this.belongsToMany(News, { through: Like, foreignKey: 'userId', as: 'LikedNews' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      hashpass: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
