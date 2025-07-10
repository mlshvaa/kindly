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
