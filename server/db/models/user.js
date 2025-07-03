'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Profile }) {
      this.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
      // this.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
      // this.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
      // this.hasMany(Booking, { foreignKey: 'parentId', as: 'bookings' });
      // this.hasMany(Review, { foreignKey: 'parentId' });
      // this.hasMany(Favorite, { foreignKey: 'userId' });
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
