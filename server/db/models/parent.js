'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    static associate({ User, Review, Request, Chat }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Review, { foreignKey: 'parentId', as: 'reviews' });
      this.hasMany(Request, { foreignKey: 'parentId', as: 'requests' });
      this.hasMany(Chat, { foreignKey: 'parentId', as: 'chats' });
    }
  }

  // Parent.init(
  //   {
  //     userId: {
  //       type: DataTypes.INTEGER,
  //       allowNull: false,
  //     },
  //     phone: DataTypes.STRING,
  //     adress: DataTypes.STRING,
  //     child: DataTypes.STRING,
  //     childAge: DataTypes.STRING,
  //   },
  //   {
  //     sequelize,
  //     modelName: 'Parent',
  //   },
  // );

  // Денис исправил модель для того, чтобы в личном кабинете дети были массивом и можно было отобразить их списком
  Parent.init(
    {
      userId: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      adress: DataTypes.STRING,
      children: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'Parent',
    },
  );

  return Parent;
};
