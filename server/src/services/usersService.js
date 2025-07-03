const { User } = require('../../db/models');

class UsersService {
  static async findUserById(id) {
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'role'],
    });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user;
  }

  static async deleteUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    await user.destroy();
  }
}

module.exports = UsersService;
