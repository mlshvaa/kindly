const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

class ClientSettingsService {
  static async updateEmail(userId, email) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Пользователь не найден');
    return user.update({ email });
  }

  static async updatePassword(userId, password) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Пользователь не найден');

    const hashpass = await bcrypt.hash(password, 10);
    return user.update({ hashpass });
  }
}

module.exports = ClientSettingsService;
