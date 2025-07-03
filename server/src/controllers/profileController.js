const ProfileService = require('../services/profileService');

class ProfileController {
  static async getMyProfile(req, res) {
    try {
      const userId = res.locals.user.id;
      const profile = await ProfileService.findByUserId(userId);
      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Анкета не найдена' });
    }
  }

  static async updateMyProfile(req, res) {
    try {
      const userId = res.locals.user.id;
      const newData = req.body;
      const updated = await ProfileService.updateProfile(userId, newData);
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при обновлении анкеты' });
    }
  }

  static async deleteMyProfile(req, res) {
    try {
      const userId = res.locals.user.id;
      await ProfileService.deleteProfile(userId);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при удалении анкеты' });
    }
  }
}

module.exports = ProfileController;
