const { User } = require('../../db/models');
const bcrypt = require('bcrypt');

class AuthService {
  static async createAccount({ email, name, password }) {
    const hashpass = await bcrypt.hash(password, 10);
    const user = User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        hashpass,
      },
    });
    return user;
  }

  static async signin({ email, password }) {
    // console.log(email, '****************************');
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('Пользователь не найден');
    // метод compare сравнивает введенный пароль (преобразуя в хэш с захешированным паролем из базы)
    const isPasswordValid = await bcrypt.compare(password, user.hashpass);
    if (!isPasswordValid) throw new Error('Неверный пароль');
    return user;
  }
}
module.exports = AuthService;
