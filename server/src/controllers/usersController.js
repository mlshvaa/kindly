const UsersService = require('../services/usersService');

class UsersController {
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UsersService.findUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Пользователь не найден' });
    }
  }

  static async deleteUserById(req, res) {
    try {
      const { id } = req.params;
      await UsersService.deleteUserById(id);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при удалении пользователя' });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const user = res.locals.user;
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Пользователь не авторизован' });
    }
  }
}

module.exports = UsersController;
