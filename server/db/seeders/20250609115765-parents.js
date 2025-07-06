'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Parents', [
      {
        userId: 1, // Мама Анна
        phone: '+79991112233',
        adress: 'г. Москва, ул. Ленина, д. 1',
        children: JSON.stringify([{ name: 'Маша', age: '6' }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Папа Иван
        phone: '+79992223344',
        adress: 'г. Санкт-Петербург, ул. Пушкина, д. 2',
        children: JSON.stringify([{ name: 'Ваня', age: '8' }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3, // Мама Светлана
        phone: '+79993334455',
        adress: 'г. Екатеринбург, ул. Мира, д. 3',
        children: JSON.stringify([{ name: 'Светик', age: '5' }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Parents', null, {});
  },
};
