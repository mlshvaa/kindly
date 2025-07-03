const { Specialist, User, Service } = require('../../db/models');

class SpecialistsService {
  static async getAllSpecialists() {
    const specialists = await Specialist.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Service,
          through: { attributes: [] }, // убираем связку из ответа
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return specialists;
  }

  static async getSpecialistById(id) {
    const specialist = await Specialist.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Service,
          through: { attributes: [] },
        },
      ],
    });
    if (!specialist) {
      throw new Error('Специалист не найден');
    }
    return specialist;
  }

  static async updateSpecialistById(id, data) {
    const specialist = await Specialist.findByPk(id);
    if (!specialist) {
      throw new Error('Специалист не найден');
    }
    const updated = await specialist.update(data);
    return updated;
  }

  static async deleteSpecialistById(id) {
    const specialist = await Specialist.findByPk(id);
    if (!specialist) {
      throw new Error('Специалист не найден');
    }
    await specialist.destroy();
  }
}

module.exports = SpecialistsService;
