const ChatService = require('../services/chatService');

class ChatController {
  static async getOrCreate(req, res) {
    const { parentId, specialistId } = req.body;
    const chat = await ChatService.findOrCreateChat(parentId, specialistId);
    res.json(chat);
  }

  static async getMyChats(req, res) {
    const user = res.locals.user;
    const chats = await ChatService.getChatsForUser(user);
    res.json(chats);
  }
}

module.exports = ChatController;
