const { Request, Calendar, Parent, Specialist } = require('../../db/models');

class RequestsService {
  static async getByParentId(parentId) {
    const requests = await Request.findAll({
      where: { parentId },
      include: [
        {
          model: Calendar,
          as: 'calendar',
          include: [{ model: Specialist, as: 'specialist' }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return requests;
  }

  static async getBySpecialistId(specialistId) {
    const requests = await Request.findAll({
      include: [
        {
          model: Calendar,
          as: 'calendar',
          where: { specialistId },
        },
        {
          model: Parent,
          as: 'parent',
          include: ['user'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return requests;
  }

  static async createRequest({ calendarId, parentId, message }) {
    const newRequest = await Request.create({
      calendarId,
      parentId,
      message,
      status: 'ожидание',
    });
    return newRequest;
  }

  static async updateStatus(id, status) {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Заявка не найдена');

    const updated = await request.update({ status });
    return updated;
  }

  static async deleteRequestById(id) {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Заявка не найдена');
    await request.destroy();
  }
}

module.exports = RequestsService;
