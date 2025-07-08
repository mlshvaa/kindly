const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

module.exports = function authenticateSocket(req, done) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');

  if (!token) return done(new Error('Нет токена'));

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    done(null, decoded.user); // прокидываем `user` в `wss.on('connection')`
  } catch (err) {
    done(err);
  }
};
