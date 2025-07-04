const { Service } = require('../../db/models');

class ServicesService {
  static async getAllServices() {
    const services = await Service.findAll({
      order: [['createdAt', 'DESC']],
    });
    return services;
  }

  static async createService({ name, price }) {
    const newService = await Service.create({ name, price });
    return newService;
  }

  static async deleteServiceById(id) {
    const service = await Service.findByPk(id);
    if (!service) throw new Error('Услуга не найдена');
    await service.destroy();
  }
}

module.exports = ServicesService;
