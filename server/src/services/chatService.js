const { Parent, Specialist, Chat } = require('../../db/models');

class ChatService {
  static async findOrCreateChat(parentId, specialistId) {
    const [chat] = await Chat.findOrCreate({
      where: { parentId, specialistId },
    });
    return chat;
  }

  static async getChatsForUser(user) {
    if (user.role === 'parent') {
      const parent = await Parent.findOne({ where: { userId: user.id } });
      return parent
        ? Chat.findAll({
            where: { parentId: parent.id },
            include: ['specialist', 'messages'],
          })
        : [];
    }

    if (user.role === 'specialist') {
      const specialist = await Specialist.findOne({ where: { userId: user.id } });
      return specialist
        ? Chat.findAll({
            where: { specialistId: specialist.id },
            include: ['parent', 'messages'],
          })
        : [];
    }

    return [];
  }
}

module.exports = ChatService;
