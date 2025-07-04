const ServicesService = require('../services/servicesService');

class ServicesController {
  static async getAllServices(req, res) {
    try {
      const services = await ServicesService.getAllServices();
      res.status(200).json(services);
    } catch (error) {
      console.error('Ошибка при получении услуг:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async createService(req, res) {
    try {
      const { name, price } = req.body;
      const newService = await ServicesService.createService({ name, price });
      res.status(201).json(newService);
    } catch (error) {
      console.error('Ошибка при создании услуги:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteServiceById(req, res) {
    try {
      const { id } = req.params;
      await ServicesService.deleteServiceById(id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка при удалении услуги:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ServicesController;
