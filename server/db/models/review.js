'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Отзыв написан клиентом, направлен специалисту
      Review.belongsTo(models.User, { foreignKey: 'clientId', as: 'Client' });
      Review.belongsTo(models.Specialist, { foreignKey: 'specialistId' });
    }
  }

  Review.init(
    {
      specialistId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: 'Review',
    },
  );

  return Review;
};
