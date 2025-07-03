const { User, Profile } = require('../../db/models');
const bcrypt = require('bcrypt');

class AuthService {
  static async createAccount({ email, name, password, role }) {
    const hashpass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass, role },
    });

    if (created && role === 'specialist') {
      await Profile.create({
        userId: user.id,
        // можно добавить другие поля по умолчанию
        fullName: name,
        role,
        isApproved: false,
      });
    }

    return [user, created];
  }

  static async signin({ email, password }) {
    const user = await User.findOne({ where: { email }, include: ['profile'] });
    if (!user) throw new Error('Пользователь не найден');

    const isPasswordValid = await bcrypt.compare(password, user.hashpass);
    if (!isPasswordValid) throw new Error('Неверный пароль');
    return user;
  }
}
module.exports = AuthService;
