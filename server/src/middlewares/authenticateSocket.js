const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');
require('dotenv').config();

function authenticate(req, next) {
  cookieParser()(req, null, async () => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) next(new Error('Unauthorized', null));
      const { user: tokenUser } = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      // Получаем имя из БД
      const dbUser = await User.findByPk(tokenUser.id)
      if (!dbUser) return next(new Error('User not found'));

      const fullUser = {
        id: dbUser.id,
        name: dbUser.name, // теперь будет доступно имя
        role: dbUser.role,
      };
      next(null, fullUser);
    } catch (error) {
      next(error, null);
    }
  });
}

module.exports = authenticate;
