'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CalendarSlots', [
      {
        specialistId: 1,
        date: '2025-07-12',
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 1,
        date: '2025-07-13',
        isAvailable: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 1,
        date: '2025-07-14',
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2,
        date: '2025-07-12',
        isAvailable: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2,
        date: '2025-07-15',
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CalendarSlots', null, {});
  },
};
