'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ Specialist, Parent }) {
      this.belongsTo(Specialist, { foreignKey: 'specialistId', as: 'specialist' });
      this.belongsTo(Parent, { foreignKey: 'parentId', as: 'parent' });
    }
  }

  Review.init(
    {
      specialistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    },
  );

  return Review;
};
