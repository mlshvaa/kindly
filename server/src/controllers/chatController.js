const ChatService = require('../services/chatService');
const { Specialist } = require('../../db/models');

class ChatController {
  // static async getOrCreate(req, res) {
  //   try {
  //     const specialistId = res.locals.user?.id;
  //     const { parentId } = req.body;
  //     if (!parentId || !specialistId)
  //       return res.status(400).json({ error: 'specialistId and parentId are required' });
  //     const chat = await ChatService.findOrCreateChat({ parentId, specialistId });

  //     res.status(200).json(chat);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: error.message ?? 'Ошибка сервера' });
  //   }
  // }

  static async getOrCreate(req, res) {
    try {
      const userId = res.locals.user?.id;
      const { parentId } = req.body;

      const specialist = await Specialist.findOne({ where: { userId } });
      const specialistId = specialist?.id;

      console.log('Создание чата:', { userId, parentId, specialistId });

      if (!parentId || !specialistId)
        return res.status(400).json({ error: 'parentId и specialistId обязательны' });

      const chat = await ChatService.findOrCreateChat({ parentId, specialistId });
      res.status(200).json(chat);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message ?? 'Ошибка сервера' });
    }
  }

  static async getMyChats(req, res) {
    const { user } = res.locals;
    const chats = await ChatService.getChatsForUser(user);
    res.json(chats);
  }

  static async getById(req, res) {
    try {
      const chatId = Number(req.params.chatId);
      const userId = res.locals.user.id;

      const chat = await ChatService.getByIdWithUsersAndAccessCheck(chatId, userId);

      res.json(chat);
    } catch (error) {
      console.error('Ошибка в ChatController:', error);

      if (error.status === 403) {
        return res.status(403).json({ message: 'Доступ запрещён' });
      }
      if (error.status === 404) {
        return res.status(404).json({ message: 'Чат не найден' });
      }

      res.status(500).json({ message: 'Ошибка при получении чата' });
    }
  }
}

module.exports = ChatController;
