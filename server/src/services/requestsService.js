const { Request, Calendar, Parent, Specialist, User } = require('../../db/models');

class RequestsService {
  // Получить заявки текущего родителя
  static async getByParentId(userId) {
    // 1. Найти Parent по userId
    const parent = await Parent.findOne({ where: { userId } });
    if (!parent) throw new Error('Родитель не найден');
    // 2. Найти все заявки с найденным parentId
    const requests = await Request.findAll({
      where: { parentId: parent.id },
      include: [
        // {
        //   model: Calendar,
        //   as: 'calendar',
        //   include: [{ model: Specialist, as: 'specialist' }],
        // },
        {
          model: Specialist,
          as: 'specialist',
          include: [{ model: User, as: 'user' }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return requests;
  }

  static async getBySpecialistId(userId) {
    // 1. Найти Specialist по userId
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) throw new Error('Специалист не найден');
    // 2. Найти все заявки с найденным specialistId
    const requests = await Request.findAll({
      where: { specialistId: specialist.id },
      include: [
        {
          model: Specialist,
          as: 'specialist',
          include: [{ model: User, as: 'user' }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return requests;
  }

  static async createRequest({ userId, message, specialistId }) {
    // 1. Найти Parent по userId
    const parent = await Parent.findOne({ where: { userId } });
    if (!parent) throw new Error('Родитель не найден');

    // 2. Создать заявку с найденным parentId
    const newRequest = await Request.create({
      parentId: parent.id,
      specialistId,
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

  // Заявки от этого родителя к текущему специалисту
  static async getRequestsFromParentToSpecialist(parentId, specialistId) {
    const requests = await Request.findAll({
      where: { parentId, specialistId },

      order: [['createdAt', 'DESC']],
    });

    return requests;
  }
}

module.exports = RequestsService;
