const { Specialist, Service } = require('../../db/models');

class SpecialistServiceService {
  static async getServicesBySpecialistId(specialistId) {
    const specialist = await Specialist.findByPk(specialistId, {
      include: [Service],
    });
    if (!specialist) throw new Error('Специалист не найден');
    return specialist.Services;
  }

  static async addServiceToSpecialist(specialistId, serviceId) {
    const specialist = await Specialist.findByPk(specialistId);
    const service = await Service.findByPk(serviceId);

    if (!specialist || !service) {
      throw new Error('Специалист или услуга не найдены');
    }

    await specialist.addService(service);
    return { message: 'Услуга добавлена' };
  }

  static async removeServiceFromSpecialist(specialistId, serviceId) {
    const specialist = await Specialist.findByPk(specialistId);
    const service = await Service.findByPk(serviceId);

    if (!specialist || !service) {
      throw new Error('Специалист или услуга не найдены');
    }

    await specialist.removeService(service);
  }
}

module.exports = SpecialistServiceService;
