const db = require('../../db/models');
const { Message } = db;

function chatSocketHandler(ws, req, user, wss) {
  console.log(`🔌 Пользователь ${user.id} (${user.role}) подключился к WebSocket`);

  ws.on('message', async (data) => {
    try {
      const parsed = JSON.parse(data);

      // Первый шаг — подписка на чат
      if (parsed.type === 'subscribe') {
        ws.chatId = parsed.chatId;
        console.log(`📥 Подписка на чат ${ws.chatId}`);
        return;
      }

      // Отправка сообщения в чат
      if (parsed.type === 'chat/sendMessage') {
        const { chatId, text } = parsed.payload;
        if (!chatId || !text?.trim()) return;

        const newMessage = await Message.create({
          text,
          chatId,
          senderRole: user.role,
          read: false,
        });

        const payload = {
          type: 'chat/newMessage',
          payload: {
            id: newMessage.id,
            chatId: newMessage.chatId,
            text: newMessage.text,
            senderRole: newMessage.senderRole,
            createdAt: newMessage.createdAt,
          },
        };

        // Шлём только участникам нужного чата
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN && client.chatId === chatId) {
            client.send(JSON.stringify(payload));
          }
        });
      }
    } catch (err) {
      console.error('❌ Ошибка в WebSocket:', err);
    }
  });

  ws.on('close', () => {
    console.log(`❎ Пользователь ${user.id} отключился`);
  });

  // Отправляем подтверждение подключения
  ws.send(JSON.stringify({
    type: 'chat/connected',
    payload: { userId: user.id, role: user.role },
  }));
}

module.exports = chatSocketHandler;
