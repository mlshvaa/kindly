const ServicesSpecialistsService = require('../services/servicesSpecialistsService');

class ServicesSpecialistsController {
  // Получить все связки специалист-услуга
  static async getAll(req, res) {
    try {
      const data = await ServicesSpecialistsService.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error('Ошибка при получении связок:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Получить связки специалист-услуга конкретного специалиста
  static async getServicesSpecialistsBySpecialistId(req, res) {
    try {
      const { specialistId } = req.params;
      const data = await ServicesSpecialistsService.getServicesSpecialistsBySpecialistId(
        specialistId,
      );
      res.status(200).json(data);
    } catch (error) {
      console.error('Ошибка при получении связок:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // // Назначить услугу конкретному специалисту
  // static async assignServiceToSpecialist(req, res) {
  //   try {
  //     const { specialistId, serviceId } = req.body;
  //     const created = await ServicesSpecialistsService.assignServiceToSpecialist({
  //       specialistId,
  //       serviceId,
  //     });
  //     res.status(201).json(created);
  //   } catch (error) {
  //     console.error('Ошибка при получении связок:', error);
  //     res.status(500).json({ message: 'Ошибка сервера' });
  //   }
  // }

  // Назначить услугу специалисту
  static async assignService(req, res) {
    try {
      const { specialistId, serviceId } = req.body;
      const created = await ServicesSpecialistsService.assignService({
        specialistId,
        serviceId,
      });
      res.status(201).json(created);
    } catch (error) {
      console.error('Ошибка при назначении услуги специалисту:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Удалить связку
  static async removeServiceFromSpecialist(req, res) {
    try {
      const { specialistId, serviceId } = req.query;
      if (!specialistId || !serviceId) {
        return res
          .status(400)
          .json({ message: 'Нужны параметры specialistId и serviceId' });
      }

      await ServicesSpecialistsService.removeServiceFromSpecialist({
        specialistId,
        serviceId,
      });
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка при удалении услуги у специалиста:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ServicesSpecialistsController;
