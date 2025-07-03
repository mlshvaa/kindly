'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      specialization: {
        type: Sequelize.ARRAY(Sequelize.STRING), // няня, педагог, логопед
        allowNull: false,
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pricePerHour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ageRange: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      availableSlots: {
        type: Sequelize.ARRAY(Sequelize.STRING), // можно ISO-строки или ["Пн 10-12"]
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Profiles');
  },
};
