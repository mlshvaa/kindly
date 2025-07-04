'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Services', [
      {
        name: 'Няня на час',
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Репетитор начальных классов',
        price: 700,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Подготовка к школе',
        price: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Гончарное мастерство',
        price: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
