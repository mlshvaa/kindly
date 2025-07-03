'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        specialistId: 1,
        clientId: 3,
        text: 'Анна — замечательный педагог! Очень внимательная и профессиональная.',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2,
        clientId: 4,
        text: 'Ольга интересно провела занятие по гончарному мастерству, но хотелось бы больше практики.',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
