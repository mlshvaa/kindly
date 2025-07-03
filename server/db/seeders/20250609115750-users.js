'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Анна',
        email: 'anna@example.com',
        hashpass: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Борис',
        email: 'boris@example.com',
        hashpass: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Виктория',
        email: 'vika@example.com',
        hashpass: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Григорий',
        email: 'grigory@example.com',
        hashpass: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Денис',
        email: 'denis@example.com',
        hashpass: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
