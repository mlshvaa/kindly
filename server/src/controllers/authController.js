const AuthService = require('../services/AuthService');
const cookieConfig = require('../configs/cookieConfig');
const generateTokens = require('../utils/generateTokens');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class AuthController {
  static async signup(req, res) {
    try {
      const { email, name, password } = req.body;
      // console.log(req.body);
      if (!email || !name || !password)
        return res.status(400).json({ message: 'Не указаны требуемые поля' });

      const [targetUser, created] = await AuthService.createAccount(req.body);

      // console.log({targetUser, getUser: targetUser.get()})
      if (!created) return res.status(400).json({ message: 'Почта уже используется' });
      // метод get используем чтобы убрать все лишнее
      const user = targetUser.get();
      delete user.hashpass;

      const { accessToken, refreshToken } = generateTokens({ user });
      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json({ user, accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      if (!email || !password)
        return res.status(400).json({ message: 'Не указаны требуемые поля' });
      const targetUser = await AuthService.signin({ email, password });
      const user = targetUser.get();
      delete user.hashpass;

      const { accessToken, refreshToken } = generateTokens({ user });
      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json({ user, accessToken });
    } catch (error) {
      const { message } = error;
      if (message.includes('Пользователь не найден'))
        return res.status(401).json({ message: 'Неверный email или пароль' });
      if (message.includes('Неверный пароль'))
        return res.status(401).json({ message: 'Неверный email или пароль' });
      console.log(error);
      return res.status(500).json({ message });
    }
  }

  static async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken: newRefreshToken } = generateTokens({ user });
      res
        .status(200)
        .cookie('refreshToken', newRefreshToken, cookieConfig)
        .json({ user, accessToken });
    } catch (error) {
      const { message } = error;
      if (message.includes('invalid'))
        return res.status(401).json({ message: 'Неверный refresh token' });
      if (message.includes('provided'))
        return res.status(401).json({ message: 'Не передан refresh token' });
      console.log(error);
      return res.status(500).json({ message });
    }
  }

  static async logout(req, res) {
    res.clearCookie('refreshToken', cookieConfig);
    res.sendStatus(200);
  }
}

module.exports = AuthController;
