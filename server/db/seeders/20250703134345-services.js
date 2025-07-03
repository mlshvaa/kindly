'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Services', [
      {
        title: 'Няня на час',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Репетитор начальных классов',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Подготовка к школе',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Гончарное мастерство',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Развитие речи и логики',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
