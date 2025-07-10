const ChatService = require('../services/chatService');

class ChatController {
  static async getOrCreate(req, res) {
    try {
      const specialistId = res.locals.user?.id;
      const { parentId } = req.body;
      if (!parentId || !specialistId)
        return res.status(400).json({ error: 'specialistId and parentId are required' });
      const chat = await ChatService.findOrCreateChat({ parentId, specialistId });

      res.status(200).json(chat);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message ?? 'Ошибка сервера' });
    }
  }

  static async getMyChats(req, res) {
    const  user  = res.locals.user;
    const chats = await ChatService.getChatsForUser(user);
    res.json(chats);
  }
}

module.exports = ChatController;
