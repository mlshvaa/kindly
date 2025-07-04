const { Calendar, Specialist } = require('../../db/models');

class CalendarsService {
  static async getAllCalendars() {
    const calendars = await Calendar.findAll({
      include: {
        model: Specialist,
        as: 'specialist',
      },
      order: [['startDate', 'ASC']],
    });
    return calendars;
  }

  static async getBySpecialistId(specialistId) {
    const calendars = await Calendar.findAll({
      where: { specialistId },
      order: [['startDate', 'ASC']],
    });
    return calendars;
  }

  static async createCalendar({ specialistId, startDate, endDate }) {
    const newSlot = await Calendar.create({ specialistId, startDate, endDate });
    return newSlot;
  }

  static async deleteCalendar(id) {
    const slot = await Calendar.findByPk(id);
    if (!slot) throw new Error('Слот не найден');
    await slot.destroy();
  }
}

module.exports = CalendarsService;
