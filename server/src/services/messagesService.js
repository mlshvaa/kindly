const { Message, User } = require('../../db/models');

class MessagesService {
  static async getByChatId(chatId) {
     const messages = await Message.findAll({
      where: { chatId },
      include: [{ model: User, as: 'sender', attributes: ['id', 'name', 'role'] }],
      order: [['createdAt', 'ASC']],
    });
    return messages
  }
}

module.exports = MessagesService;
