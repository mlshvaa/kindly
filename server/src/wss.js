const { WebSocketServer } = require('ws');
const { Message } = require('../db/models');

function setupWebSocket() {
  const wss = new WebSocketServer({ noServer: true });

  // Карта: chatId -> Set of clients (WebSocket connections)
  const chatRooms = new Map();

  wss.on('connection', (ws, req, user) => {
    console.log(`Пользователь ${user.id} подключился`);

    ws.on('message', async (data) => {
      try {
        const parsed = JSON.parse(data);

        // Подключение к определённому чату
        if (parsed.type === 'subscribe') {
          const {chatId} = parsed.chatId;
          if (!chatRooms.has(chatId)) {
            chatRooms.set(chatId, new Set());
          }
          chatRooms.get(chatId).add(ws);
          ws.chatId = chatId;
          return;
        }

        // Отправка сообщения в чат
        if (parsed.type === 'chat/sendMessage') {
          const { chatId, text } = parsed.payload;
          if (!chatId || !text?.trim()) return;

          // Сохраняем сообщение в БД
          const newMessage = await Message.create({
            chatId,
            text,
            senderRole: user.role,
            read: false,
          });

          const response = {
            type: 'chat/newMessage',
            payload: {
              id: newMessage.id,
              chatId,
              text: newMessage.text,
              senderRole: newMessage.senderRole,
              createdAt: newMessage.createdAt,
            },
          };

          // Рассылаем сообщение только участникам этого чата
          const recipients = chatRooms.get(chatId) || [];
          recipients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(JSON.stringify(response));
            }
          });
        }
      } catch (err) {
        console.error('Ошибка WebSocket:', err);
      }
    });

    ws.on('close', () => {
      const chatId = ws.chatId;
      if (chatId && chatRooms.has(chatId)) {
        chatRooms.get(chatId).delete(ws);
        if (chatRooms.get(chatId).size === 0) {
          chatRooms.delete(chatId);
        }
      }
      console.log(`❌ Пользователь ${user.id} отключился`);
    });

    // Подтверждение подключения
    ws.send(JSON.stringify({
      type: 'chat/connected',
      payload: { userId: user.id, role: user.role },
    }));
  });

  return wss;
}

module.exports = { setupWebSocket };
