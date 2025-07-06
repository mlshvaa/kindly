'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ServiceSpecialists', [
      {
        specialistId: 1, // Няня Мария
        serviceId: 1, // Няня на час
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 1, // Няня Мария
        serviceId: 3, // Подготовка к школе
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2, // Педагог Ольга
        serviceId: 2, // Репетитор начальных классов
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2, // Педагог Ольга
        serviceId: 3, // Подготовка к школе
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ServiceSpecialists', null, {});
  },
};
