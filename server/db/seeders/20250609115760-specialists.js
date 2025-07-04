'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Specialists', [
      {
        userId: 4, // id 'Няня Мария'
        age: '28',
        photo: 'maria_photo.jpg',
        diplomaPhoto: 'diploma_maria.jpg',
        clescription: 'Опыт работы с детьми 5 лет',
        education: 'Педагогический колледж',
        position: 'Няня',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5, // id 'Педагог Ольга'
        age: '35',
        photo: 'olga_photo.jpg',
        diplomaPhoto: 'diploma_olga.jpg',
        clescription: 'Учитель начальных классов',
        education: 'Педагогический университет',
        position: 'Педагог',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Specialists', null, {});
  },
};
