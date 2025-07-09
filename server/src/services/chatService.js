const { Parent, Specialist, Chat } = require('../../db/models');

class ChatService {
  static async findOrCreateChat({ parentId, specialistId }) {
    const specialist = await Specialist.findOne({ where: { userId: specialistId } });
    const [chat] = await Chat.findOrCreate({
      where: { parentId, specialistId: specialist.id },
    });
    return chat;
  }

  static async getChatsForUser(user) {
    if (user.role === 'parent') {
      const parent = await Parent.findOne({ where: { userId: user.id } });
      return parent
        ? Chat.findAll({
            where: { parentId: parent.id },
            include: [
              {
                association: 'specialist',
                include: [{ association: 'user', attributes: ['id', 'name'] }],
              },
              { association: 'messages', separate: true, order: [['createdAt', 'ASC']] },
            ],
          })
        : [];
    }

    if (user.role === 'specialist') {
      const specialist = await Specialist.findOne({ where: { userId: user.id } });
      return specialist
        ? Chat.findAll({
            where: { specialistId: specialist.id },
            include: [
              {
                association: 'parent',
                include: [{ association: 'user', attributes: ['id', 'name'] }],
              },
              { association: 'messages', separate: true, order: [['createdAt', 'ASC']] },
            ],
          })
        : [];
    }

    return [];
  }
}

module.exports = ChatService;
