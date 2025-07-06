const SpecialistService = require('../services/SpecialistService');

class SpecialistController {
  // Получить данные педагога текущего пользователя
  static async getSpecialist(req, res) {
    try {
      // const { user } = res.locals;
      const { userId } = req.params;
      const specialist = await SpecialistService.getSpecialistByUserId(userId);
      if (!specialist) {
        return res.status(404).json({ message: 'Педагог не найден' });
      }

      console.log(res, '++++++++++++++');
      console.log(specialist, '****************');
      res.status(200).json(specialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить данные педагога текущего пользователя
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

  // Загрузка одного файла с полем 'photo' или 'diplomaPhoto'
  static async uploadPhoto(req, res) {
    try {
      const { user } = res.locals;
      const { field } = req.body; // 'photo' или 'diplomaPhoto'

      if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
      }
      if (!['photo', 'diplomaPhoto'].includes(field)) {
        return res.status(400).json({ message: 'Неверное поле для фото' });
      }
      const photoPath = req.file.path;

      // !!! ВАЖНО: передаём field !!!
      const updatedSpecialist = await SpecialistService.updatePhoto(
        user.id,
        field,
        photoPath,
      );

      res.status(200).json(updatedSpecialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка загрузки фото' });
    }
  }

  // Создать данные педагога для текущего пользователя
  static async createSpecialist(req, res) {
    try {
      const { user } = res.locals;
      const data = { ...req.body, userId: user.id };
      const specialist = await SpecialistService.createSpecialist(data);
      res.status(201).json(specialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Удалить данные педагога текущего пользователя
  static async deleteSpecialist(req, res) {
    try {
      const { user } = res.locals;
      await SpecialistService.deleteSpecialistByUserId(user.id);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      if (error.message === 'Педагог не найден') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = SpecialistController;
