const RequestsService = require('../services/RequestsService');

class RequestsController {
  static async getRequestsForSpecialist(req, res) {
    try {
      const { specialistId } = req.params;
      const requests = await RequestsService.getRequestsForSpecialist(specialistId);
      res.json(requests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении заявок' });
    }
  }

  static async getMyRequests(req, res) {
    try {
      const clientId = res.locals.user.id;
      const myRequests = await RequestsService.getRequestsByClient(clientId);
      res.json(myRequests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении заявок клиента' });
    }
  }

  static async createRequest(req, res) {
    try {
      const clientId = res.locals.user.id;
      const { specialistId, message } = req.body;
      const newRequest = await RequestsService.createRequest({ specialistId, clientId, message });
      res.status(201).json(newRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании заявки' });
    }
  }

  static async updateRequestStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedRequest = await RequestsService.updateStatus(id, status);
      res.json(updatedRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении статуса' });
    }
  }

  static async deleteRequest(req, res) {
    try {
      const { id } = req.params;
      await RequestsService.deleteRequest(id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при удалении заявки' });
    }
  }
}

module.exports = RequestsController;
