const SpecialistRequestsService = require('../services/specialistRequestsService');

class SpecialistRequestsController {
  static async getIncomingRequests(req, res) {
    try {
      const specialistId = res.locals.user.id;
      const requests = await SpecialistRequestsService.getRequestsBySpecialist(specialistId);
      res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении заявок' });
    }
  }

  static async approveRequest(req, res) {
    try {
      const { id } = req.params;
      const updated = await SpecialistRequestsService.changeRequestStatus(id, 'approved');
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при одобрении заявки' });
    }
  }

  static async declineRequest(req, res) {
    try {
      const { id } = req.params;
      const updated = await SpecialistRequestsService.changeRequestStatus(id, 'declined');
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при отклонении заявки' });
    }
  }
}

module.exports = SpecialistRequestsController;
