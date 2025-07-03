'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpecialistServices', [
      {
        specialistId: 1, // Анна Иванова
        serviceId: 1, // Няня на час
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 1,
        serviceId: 3, // Подготовка к школе
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 1,
        serviceId: 5, // Развитие речи и логики
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2, // Ольга Смирнова
        serviceId: 2, // Репетитор начальных классов
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2,
        serviceId: 4, // Гончарное мастерство
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpecialistServices', null, {});
  },
};
