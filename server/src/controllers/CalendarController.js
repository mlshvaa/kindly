const CalendarService = require('../services/CalendarService');

class CalendarController {
  static async getSlotsBySpecialist(req, res) {
    try {
      const { specialistId } = req.params;
      const slots = await CalendarService.getSlotsBySpecialist(specialistId);
      res.json(slots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении слотов' });
    }
  }

  static async createSlot(req, res) {
    try {
      const { date, isAvailable } = req.body;
      const specialistId = res.locals.user.id;
      const newSlot = await CalendarService.createSlot({ specialistId, date, isAvailable });
      res.status(201).json(newSlot);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании слота' });
    }
  }

  static async updateSlot(req, res) {
    try {
      const { id } = req.params;
      const { isAvailable } = req.body;
      const updatedSlot = await CalendarService.updateSlot(id, isAvailable);
      res.json(updatedSlot);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении слота' });
    }
  }

  static async deleteSlot(req, res) {
    try {
      const { id } = req.params;
      await CalendarService.deleteSlot(id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при удалении слота' });
    }
  }
}

module.exports = CalendarController;
