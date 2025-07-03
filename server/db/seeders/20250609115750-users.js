'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('123', 10);

    await queryInterface.bulkInsert('Users', [
      // Родители
      {
        name: 'Мама Анна',
        email: 'anna_mama@example.com',
        hashpass: password,
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Папа Иван',
        email: 'ivan_papa@example.com',
        hashpass: password,
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Мама Светлана',
        email: 'sveta_mama@example.com',
        hashpass: password,
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Специалисты
      {
        name: 'Няня Мария',
        email: 'maria_nyanya@example.com',
        hashpass: password,
        role: 'specialist',
        isApproved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Педагог Ольга',
        email: 'olga_teacher@example.com',
        hashpass: password,
        role: 'specialist',
        isApproved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Админ Ирина',
        email: 'admin_irina@example.com',
        hashpass: password,
        role: 'admin',
        isApproved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
