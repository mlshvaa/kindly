const SpecialistService = require('../services/SpecialistService');

class SpecialistController {
  static async getSpecialist(req, res) {
    try {
      const { userId } = req.params;
      const specialist = await SpecialistService.getSpecialistByUserId(userId);
      if (!specialist) return res.status(404).json({ message: 'Педагог не найден' });
      res.status(200).json(specialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const specialists = await SpecialistService.findAllWithUsers();
      res.status(200).json(specialists);
    } catch (error) {
      console.error('Ошибка при получении специалистов:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async editSpecialist(req, res) {
    try {
      const { user } = res.locals;
      const updateData = req.body;
      const updatedSpecialist = await SpecialistService.editSpecialistByUserId(
        user.id,
        updateData,
      );
      res.status(200).json(updatedSpecialist);
    } catch (error) {
      console.error(error);
      if (error.message === 'Педагог не найден') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Обновление одного фото (photo)
  static async uploadPhoto(req, res) {
    try {
      const { user } = res.locals;
      if (!req.file) return res.status(400).json({ message: 'Файл не загружен' });

      const photoPath = req.file.path;
      const updatedSpecialist = await SpecialistService.updateSinglePhoto(
        user.id,
        photoPath,
      );
      res.status(200).json(updatedSpecialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка загрузки фото' });
    }
  }

  // Загрузка нескольких дипломов
  static async uploadDiplomaPhotos(req, res) {
    try {
      const { user } = res.locals;
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Файлы не загружены' });
      }
      const paths = req.files.map((file) => file.path);
      const updatedSpecialist = await SpecialistService.addDiplomaPhotos(user.id, paths);
      res.status(200).json(updatedSpecialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка загрузки дипломов' });
    }
  }

  // Удаление диплома
  static async deleteDiplomaPhoto(req, res) {
    try {
      const { user } = res.locals;
      const { photoPath } = req.body;
      if (!photoPath) return res.status(400).json({ message: 'Путь фото не указан' });

      const updatedSpecialist = await SpecialistService.removeDiplomaPhoto(
        user.id,
        photoPath,
      );
      res.status(200).json(updatedSpecialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка удаления диплома' });
    }
  }
}

module.exports = SpecialistController;
