const { Specialist } = require('../../db/models');

class SpecialistService {
  // Найти все данные педагога по userId (обычно один специалист на пользователя, но если несколько — вернёт массив)
  static async getSpecialistByUserId(userId) {
    const specialist = await Specialist.findOne({
      where: { userId },
    });
    return specialist;
  }

  // Обновить данные педагога по userId
  static async editSpecialistByUserId(userId, updateData) {
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) {
      throw new Error('Педагог не найден');
    }
    const updatedSpecialist = await specialist.update(updateData);
    return updatedSpecialist;
  }

  // Загрузка одного файла с полем 'photo'
  static async updatePhoto(userId, field, photoPath) {
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) {
      throw new Error('Педагог не найден');
    }
    specialist[field] = photoPath;
    await specialist.save();
    return specialist;
  }

  // Создать новую фичу педагога, привязанную к userId
  static async createSpecialist(data) {
    // data должен содержать userId и остальные поля
    const specialist = await Specialist.create(data);
    return specialist;
  }

  // Удалить педагога по userId
  static async deleteSpecialistByUserId(userId) {
    const specialist = await Specialist.findOne({ where: { userId } });
    if (!specialist) {
      throw new Error('Педагог не найден');
    }
    await specialist.destroy();
  }
}

module.exports = SpecialistService;
