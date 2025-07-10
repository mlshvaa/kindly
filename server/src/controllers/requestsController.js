const RequestsService = require('../services/requestsService');

class RequestsController {
  // Получить заявки текущего родителя
  static async getByParent(req, res) {
    try {
      const userId = res.locals.user.id;
      const requests = await RequestsService.getByParentId(userId);
      res.status(200).json(requests);
    } catch (error) {
      console.error('Ошибка при получении заявок родителя:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getBySpecialist(req, res) {
    try {
      const { specialistId } = req.params;
      const requests = await RequestsService.getBySpecialistId(specialistId);
      res.status(200).json(requests);
    } catch (error) {
      console.error('Ошибка при получении заявок специалиста:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getForCurrentSpecialist(req, res) {
    try {
      const userId = res.locals.user.id;
      const requests = await RequestsService.getBySpecialistId(userId);
      console.log(requests, 'requests');
      res.status(200).json(requests);
    } catch (error) {
      console.error('Ошибка при получении заявок специалиста:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createRequest(req, res) {
    try {
      const userId = res.locals.user.id;
      const { message, specialistId } = req.body;
      const newRequest = await RequestsService.createRequest({
        userId,
        message,
        specialistId,
      });
      res.status(201).json(newRequest);
    } catch (error) {
      console.error('Ошибка при создании заявки:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await RequestsService.updateStatus(id, status);
      res.status(200).json(updated);
    } catch (error) {
      console.error('Ошибка при обновлении статуса заявки:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteRequestById(req, res) {
    try {
      const { id } = req.params;
      await RequestsService.deleteRequestById(id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка при удалении заявки:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RequestsController;
