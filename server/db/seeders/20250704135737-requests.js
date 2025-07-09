'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Requests', [
      {
        calendarId: 1, // Няня Мария, 5 июля 10:00–12:00
        parentId: 1, // Мама Анна
        specialistId: 1, // Няня Мария,
        message: 'Хотим попробовать услугу "Няня на час" на пробу.',
        status: 'ожидание',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        calendarId: 2, // Педагог Ольга, 6 июля 14:00–16:00
        parentId: 2, // Папа Иван
        specialistId: 2, // Педагог Ольга,
        message: 'Нужны занятия по подготовке к школе для сына.',
        status: 'одобрено',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        calendarId: 2, // Педагог Ольга
        parentId: 3, // Мама Светлана
        specialistId: 2, // Педагог Ольга,
        message: 'Хочу записать дочку на пробное занятие.',
        status: 'отклонено',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Requests', null, {});
  },
};
