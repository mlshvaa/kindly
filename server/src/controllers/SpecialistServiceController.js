const SpecialistServiceService = require('../services/SpecialistServiceService');

class SpecialistServiceController {
  static async getServicesBySpecialistId(req, res) {
    try {
      const { specialistId } = req.params;
      const services = await SpecialistServiceService.getServicesBySpecialistId(specialistId);
      res.json(services);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении услуг' });
    }
  }

  static async addServiceToSpecialist(req, res) {
    try {
      const { specialistId, serviceId } = req.body;
      const result = await SpecialistServiceService.addServiceToSpecialist(specialistId, serviceId);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при добавлении услуги' });
    }
  }

  static async removeServiceFromSpecialist(req, res) {
    try {
      const { specialistId, serviceId } = req.params;
      await SpecialistServiceService.removeServiceFromSpecialist(specialistId, serviceId);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при удалении услуги' });
    }
  }
}

module.exports = SpecialistServiceController;
