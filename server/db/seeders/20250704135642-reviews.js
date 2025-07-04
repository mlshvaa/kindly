'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        specialistId: 1, // Няня Мария
        parentId: 1,     // Мама Анна
        text: 'Очень добрая и внимательная няня. Ребёнок в восторге!',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2, // Педагог Ольга
        parentId: 2,     // Папа Иван
        text: 'Грамотный подход и отличная методика обучения. Спасибо!',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specialistId: 2, // Педагог Ольга
        parentId: 3,     // Мама Светлана
        text: 'Занятия прошли продуктивно. Обязательно обратимся снова.',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
