const { ServiceSpecialist, Specialist, Service } = require('../../db/models');

class ServicesSpecialistsService {
  static async getAll() {
    const links = await ServiceSpecialist.findAll({
      include: [
        { model: Specialist, as: 'specialist' },
        { model: Service, as: 'service' },
      ],
      order: [['createdAt', 'DESC']],
    });
    return links;
  }

  static async assignService({ specialistId, serviceId }) {
    const existing = await ServiceSpecialist.findOne({
      where: { specialistId, serviceId },
    });

    if (existing) {
      throw new Error('Такая связка уже существует');
    }

    const newLink = await ServiceSpecialist.create({ specialistId, serviceId });
    return newLink;
  }

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
