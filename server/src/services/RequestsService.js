const { Request, User } = require('../../db/models');

class RequestsService {
  static async getRequestsForSpecialist(specialistId) {
    return Request.findAll({
      where: { specialistId },
      include: [{ model: User, as: 'Client', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });
  }

  static async getRequestsByClient(clientId) {
    return Request.findAll({
      where: { clientId },
      include: [{ model: User, as: 'Client', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });
  }

  static async createRequest({ specialistId, clientId, message }) {
    return Request.create({
      specialistId,
      clientId,
      message,
      status: 'pending',
    });
  }

  static async updateStatus(id, status) {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Заявка не найдена');
    return request.update({ status });
  }

  static async deleteRequest(id) {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Заявка не найдена');
    await request.destroy();
  }
}

module.exports = RequestsService;
