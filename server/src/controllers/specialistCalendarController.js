const SpecialistCalendarService = require('../services/specialistCalendarService');

class SpecialistCalendarController {
  static async getCalendarSlots(req, res) {
    try {
      const specialistId = res.locals.user.id;
      const slots = await SpecialistCalendarService.getSlots(specialistId);
      res.status(200).json(slots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении календаря' });
    }
  }

  static async toggleAvailability(req, res) {
    try {
      const { id } = req.params;
      const updatedSlot = await SpecialistCalendarService.toggleAvailability(id);
      res.status(200).json(updatedSlot);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении доступности' });
    }
  }

  static async addSlot(req, res) {
    try {
      const specialistId = res.locals.user.id;
      const { date, isAvailable } = req.body;
      const newSlot = await SpecialistCalendarService.addSlot({ specialistId, date, isAvailable });
      res.status(201).json(newSlot);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при добавлении слота' });
    }
  }
}

module.exports = SpecialistCalendarController;
