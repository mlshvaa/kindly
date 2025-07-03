const ServicesService = require('../services/ServicesService');

class ServicesController {
  static async getAllServices(req, res) {
    try {
      const services = await ServicesService.getAllServices();
      res.json(services);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении списка услуг' });
    }
  }

  static async getServiceById(req, res) {
    try {
      const { id } = req.params;
      const service = await ServicesService.getServiceById(id);
      res.json(service);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении услуги' });
    }
  }

  static async createService(req, res) {
    try {
      const { title } = req.body;
      const newService = await ServicesService.createService({ title });
      res.status(201).json(newService);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании услуги' });
    }
  }

  static async updateService(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const updated = await ServicesService.updateService(id, { title });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении услуги' });
    }
  }

  static async deleteService(req, res) {
    try {
      const { id } = req.params;
      await ServicesService.deleteService(id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при удалении услуги' });
    }
  }
}

module.exports = ServicesController;
