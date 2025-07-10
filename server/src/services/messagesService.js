const { Message, User, Chat } = require('../../db/models');

class MessagesService {
  static async getByChatId(chatId) {
    // Проверяем, существует ли чат с таким id
    const chat = await Chat.findByPk(chatId);
    if (!chat) {
      const error = new Error('Чат не найден');
      error.status = 404;
      throw error;
    }

    // Если чат есть, получаем сообщения
    const messages = await Message.findAll({
      where: { chatId },
      include: [{ model: User, as: 'sender', attributes: ['id', 'name', 'role'] }],
      order: [['createdAt', 'ASC']],
    });

    return messages;
  }
}

module.exports = MessagesService;
