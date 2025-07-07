const { ServiceSpecialist, Specialist, Service } = require('../../db/models');

class ServicesSpecialistsService {
  // Получить все связки специалист-услуга
  static async getAll() {
    const links = await ServiceSpecialist.findAll({
      include: [
        // { model: Specialist, as: 'specialist' },
        { model: Service, as: 'service' },
      ],
      order: [['createdAt', 'DESC']],
    });
    return links;
  }

  // Получить связки специалист-услуга конкретного специалиста
  static async getServicesSpecialistsBySpecialistId(specialistId) {
    const links = await ServiceSpecialist.findAll({
      where: { specialistId },
      include: { model: Service, as: 'service' },
      order: [['createdAt', 'DESC']],
    });
    return links;
  }

  // Назначить услугу конкретному специалисту
  // static async assignServiceToSpecialist({ specialistId, serviceId }) {
  //   // создаём связь
  //   const newLink = await ServiceSpecialist.create({ specialistId, serviceId });

  //   // находим эту связь с include
  //   const linkWithService = await ServiceSpecialist.findOne({
  //     where: { specialistId, serviceId },
  //     include: { model: Service, as: 'service' },
  //   });
  //   return linkWithService;
  // }

  // Назначить услугу специалисту
  static async assignService({ specialistId, serviceId }) {
    const existing = await ServiceSpecialist.findOne({
      where: { specialistId, serviceId },
    });

    if (existing) {
      throw new Error('Такая связка уже существует');
    }

    // создаём связь
    const newLink = await ServiceSpecialist.create({ specialistId, serviceId });

    // находим эту связь с include
    const linkWithService = await ServiceSpecialist.findOne({
      where: { specialistId, serviceId },
      include: { model: Service, as: 'service' },
    });
    return linkWithService;
  }

  // Удалить связку
  static async removeServiceFromSpecialist({ specialistId, serviceId }) {
    const link = await ServiceSpecialist.findOne({
      where: { specialistId, serviceId },
    });

    if (!link) {
      throw new Error('Связка не найдена');
    }

    await link.destroy();
  }
}

module.exports = ServicesSpecialistsService;
