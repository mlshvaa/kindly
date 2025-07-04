'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Calendars', [
      {
        specialistId: 1, // Няня Мария
        startDate: new Date('2025-07-05T10:00:00'),
        endDate: new Date('2025-07-05T12:00:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2, // Педагог Ольга
        startDate: new Date('2025-07-06T14:00:00'),
        endDate: new Date('2025-07-06T16:00:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Calendars', null, {});
  },
};
