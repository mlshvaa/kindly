const { CalendarSlot } = require('../../db/models');

class SpecialistCalendarService {
  static async getSlots(specialistId) {
    return CalendarSlot.findAll({
      where: { specialistId },
      order: [['date', 'ASC']],
    });
  }

  static async toggleAvailability(id) {
    const slot = await CalendarSlot.findByPk(id);
    if (!slot) throw new Error('Слот не найден');
    return slot.update({ isAvailable: !slot.isAvailable });
  }

  static async addSlot({ specialistId, date, isAvailable }) {
    return CalendarSlot.create({ specialistId, date, isAvailable });
  }
}

module.exports = SpecialistCalendarService;
