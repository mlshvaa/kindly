const SpecialistsService = require('../services/SpecialistsService');

class SpecialistsController {
  static async getAllSpecialists(req, res) {
    try {
      const specialists = await SpecialistsService.getAllSpecialists();
      res.json(specialists);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении специалистов' });
    }
  }

  static async getSpecialistById(req, res) {
    try {
      const { id } = req.params;
      const specialist = await SpecialistsService.getSpecialistById(id);
      res.json(specialist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении специалиста' });
    }
  }

  static async updateSpecialistById(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updated = await SpecialistsService.updateSpecialistById(id, updatedData);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении профиля' });
    }
  }

  static async deleteSpecialistById(req, res) {
    try {
      const { id } = req.params;
      await SpecialistsService.deleteSpecialistById(id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при удалении специалиста' });
    }
  }
}

module.exports = SpecialistsController;
