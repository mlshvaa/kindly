'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', [
      {
        userId: 4, // Григорий
        bio: 'Опытный педагог по подготовке к школе',
        photo: 'https://example.com/photo1.jpg',
        specialization: ['педагог', 'няня'],
        experience: 5,
        pricePerHour: 800,
        ageRange: '3-7',
        availableSlots: ['Пн 10:00-12:00', 'Ср 14:00-16:00'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5, // Денис
        bio: 'Заботливая няня с медицинским образованием',
        photo: 'https://example.com/photo2.jpg',
        specialization: ['няня'],
        experience: 3,
        pricePerHour: 600,
        ageRange: '1-4',
        availableSlots: ['Вт 09:00-11:00', 'Чт 15:00-18:00'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6, // Новый специалист
        bio: 'Педагог по логопедии и развитию речи',
        photo: 'https://example.com/photo3.jpg',
        specialization: ['логопед'],
        experience: 7,
        pricePerHour: 1000,
        ageRange: '4-8',
        availableSlots: ['Пт 12:00-14:00', 'Сб 10:00-12:00'],
        isActive: false, // пока не активен
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
