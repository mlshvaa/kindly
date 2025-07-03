const { Request, User } = require('../../db/models');

class SpecialistRequestsService {
  static async getRequestsBySpecialist(specialistId) {
    return Request.findAll({
      where: { specialistId },
      include: {
        model: User,
        as: 'Client', // alias из ассоциации
        attributes: ['id', 'name', 'email'],
      },
      order: [['createdAt', 'DESC']],
    });
  }

  static async changeRequestStatus(id, newStatus) {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Заявка не найдена');
    return request.update({ status: newStatus });
  }
}

module.exports = SpecialistRequestsService;
