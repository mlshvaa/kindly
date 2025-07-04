const { User, Specialist, Parent } = require('../../db/models');
const bcrypt = require('bcrypt');

class AuthService {
  static async createAccount({ email, name, password, role }) {
    const hashpass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass, role },
    });

    if (created && role === 'specialist') {
      await Specialist.create({
        userId: user.id,
        // можно добавить другие поля по умолчанию
        fullName: name,
        role,
        isApproved: false,
      });
    }

    if (created && role === 'parent') {
      await Parent.create({
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
    const user = await User.findOne({ where: { email }, include: ['specialist'] });
    if (!user) throw new Error('Пользователь не найден');

    const isPasswordValid = await bcrypt.compare(password, user.hashpass);
    if (!isPasswordValid) throw new Error('Неверный пароль');
    return user;
  }
}
module.exports = AuthService;
