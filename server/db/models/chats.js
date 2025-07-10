'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ Parent, Specialist, Message }) {
      this.belongsTo(Parent, { foreignKey: 'parentId', as: 'parent' });
      this.belongsTo(Specialist, { foreignKey: 'specialistId', as: 'specialist' });
      this.hasMany(Message, { foreignKey: 'chatId', as: 'messages' });
    }
  }

  Chat.init(
    {
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specialistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Chat',
    },
  );

  return Chat;
};
