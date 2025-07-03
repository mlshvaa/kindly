const ClientRequestsService = require('../services/clientRequestsService');

class ClientRequestsController {
  static async getMyRequests(req, res) {
    try {
      const clientId = res.locals.user.id;
      const requests = await ClientRequestsService.getRequestsByClient(clientId);
      res.json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера при получении заявок' });
    }
  }

  static async sendRequest(req, res) {
    try {
      const clientId = res.locals.user.id;
      const specialistId = +req.params.specialistId;
      const { message } = req.body;

      const newRequest = await ClientRequestsService.createRequest({
        clientId,
        specialistId,
        message,
      });

      res.status(201).json(newRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при отправке заявки' });
    }
  }
}

module.exports = ClientRequestsController;
