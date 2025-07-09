'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ Chat, User }) {
      this.belongsTo(Chat, { foreignKey: 'chatId', as: 'chat' });
      this.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
    }
  }

  Message.init(
    {
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderRole: {
        type: DataTypes.ENUM('parent', 'specialist'),
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );

  return Message;
};
