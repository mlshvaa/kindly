const { CalendarSlot } = require('../../db/models');

class CalendarService {
  static async getSlotsBySpecialist(specialistId) {
    return CalendarSlot.findAll({
      where: { specialistId },
      order: [['date', 'ASC']],
    });
  }

  static async createSlot({ specialistId, date, isAvailable }) {
    return CalendarSlot.create({ specialistId, date, isAvailable });
  }

  static async updateSlot(id, isAvailable) {
    const slot = await CalendarSlot.findByPk(id);
    if (!slot) throw new Error('Слот не найден');
    return slot.update({ isAvailable });
  }

  static async deleteSlot(id) {
    const slot = await CalendarSlot.findByPk(id);
    if (!slot) throw new Error('Слот не найден');
    await slot.destroy();
  }
}

module.exports = CalendarService;
