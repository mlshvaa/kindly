const messagesService = require('../services/messagesService');

class MessagesController {
  static async getByChatId(req, res) {
    try {
      const { chatId } = req.params;
      const messages = await messagesService.getByChatId(Number(chatId));
      res.json(messages);
    } catch (error) {
      console.error('Ошибка в MessageController:', error);

      if (error.status === 404) {
        return res.status(404).json({ message: error.message });
      }

      res.status(500).json({ message: 'Ошибка при получении сообщений' });
    }
  }
}

module.exports = MessagesController;
