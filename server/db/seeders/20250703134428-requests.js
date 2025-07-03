'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Requests', [
      {
        specialistId: 1,
        clientId: 3,
        message: 'Здравствуйте! Хотел бы записать ребёнка на подготовку к школе.',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 1,
        clientId: 4,
        message: 'Подскажите, пожалуйста, когда вы свободны на занятие по логике?',
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2,
        clientId: 3,
        message: 'Интересует гончарное мастерство для сына на выходных.',
        status: 'declined',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Requests', null, {});
  }
};
