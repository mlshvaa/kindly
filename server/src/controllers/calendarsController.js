const CalendarsService = require('../services/calendarsService');

class CalendarsController {
  static async getAllCalendars(req, res) {
    try {
      const calendars = await CalendarsService.getAllCalendars();
      res.status(200).json(calendars);
    } catch (error) {
      console.error('Ошибка при получении всех слотов:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async getBySpecialistId(req, res) {
    try {
      const { specialistId } = req.params;
      const slots = await CalendarsService.getBySpecialistId(specialistId);
      res.status(200).json(slots);
    } catch (error) {
      console.error('Ошибка при получении слотов по специалисту:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createCalendar(req, res) {
    try {
      const { startDate, endDate, specialistId } = req.body;
      // const specialistId = res.locals.user.id; // авторизованный специалист
      const newSlot = await CalendarsService.createCalendar({ specialistId, startDate, endDate });
      res.status(201).json(newSlot);
    } catch (error) {
      console.error('Ошибка при создании слота:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteCalendar(req, res) {
    try {
      const { id } = req.params;
      await CalendarsService.deleteCalendar(id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка при удалении слота:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CalendarsController;
