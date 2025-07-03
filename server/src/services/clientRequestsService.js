const { Request, Specialist, User } = require('../../db/models');

class ClientRequestsService {
  static async getRequestsByClient(clientId) {
    return Request.findAll({
      where: { clientId },
      include: [
        {
          model: Specialist,
          include: [{ model: User, attributes: ['name', 'email'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  static async createRequest({ clientId, specialistId, message }) {
    return Request.create({
      clientId,
      specialistId,
      message,
      status: 'pending',
    });
  }
}

module.exports = ClientRequestsService;
