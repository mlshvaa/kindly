const ClientSettingsService = require('../services/clientSettingsService');

class ClientSettingsController {
  static async updateEmail(req, res) {
    try {
      const userId = res.locals.user.id;
      const { email } = req.body;
      const updatedUser = await ClientSettingsService.updateEmail(userId, email);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при обновлении email' });
    }
  }

  static async updatePassword(req, res) {
    try {
      const userId = res.locals.user.id;
      const { password } = req.body;
      const updatedUser = await ClientSettingsService.updatePassword(userId, password);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при обновлении пароля' });
    }
  }
}

module.exports = ClientSettingsController;
