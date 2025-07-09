const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const app = require('./app');
const authenticate = require('../src/middlewares/authenticateSocket');
const chatSocketHandler = require('../src/ws/chatSocketHandler');

function onSocketError(err) {
  console.log(err)
}

const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });



// Подключение клиента
wss.on('connection', (ws, req, user) => {
  chatSocketHandler(ws, req, user, wss); // Логика общения
});

// Подключение WS с авторизацией
server.on('upgrade', (req, socket, head) => {
  socket.on('error', onSocketError)
  authenticate(req, (err, user) => {
    if (err || !user) {
      console.log(err)
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    socket.removeListener('error', onSocketError)
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req, user);
    });
  });
});

// Запуск сервера
server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
