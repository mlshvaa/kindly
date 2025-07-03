const { Service } = require('../../db/models');

class ServicesService {
  static async getAllServices() {
    return Service.findAll({ order: [['title', 'ASC']] });
  }

  static async getServiceById(id) {
    const service = await Service.findByPk(id);
    if (!service) throw new Error('Услуга не найдена');
    return service;
  }

  static async createService(data) {
    return Service.create(data);
  }

  static async updateService(id, data) {
    const service = await Service.findByPk(id);
    if (!service) throw new Error('Услуга не найдена');
    return service.update(data);
  }

  static async deleteService(id) {
    const service = await Service.findByPk(id);
    if (!service) throw new Error('Услуга не найдена');
    await service.destroy();
  }
}

module.exports = ServicesService;
