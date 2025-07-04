'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      specialistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Specialists',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Parents',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  },
};
