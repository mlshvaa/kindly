'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'User' });
    }
  }
  Profile.init(
    {
      userId: DataTypes.INTEGER,
      bio: DataTypes.TEXT,
      photo: DataTypes.STRING,
      specialization: DataTypes.ARRAY(DataTypes.STRING),
      experience: DataTypes.INTEGER,
      pricePerHour: DataTypes.INTEGER,
      ageRange: DataTypes.STRING,
      availableSlots: DataTypes.ARRAY(DataTypes.STRING),
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );
  return Profile;
};
