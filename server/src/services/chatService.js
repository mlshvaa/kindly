const { Parent, Specialist, Chat, User, Message } = require('../../db/models');

class ChatService {
  // static async findOrCreateChat({ parentId, specialistId }) {
  //   const specialist = await Specialist.findOne({ where: { userId: specialistId } });
  //   const [chat] = await Chat.findOrCreate({
  //     where: { parentId, specialistId: specialist.id },
  //   });
  //   return chat;
  // }

  static async findOrCreateChat({ parentId, specialistId }) {
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

  static async getByIdWithUsersAndAccessCheck(chatId, userId) {
    const chat = await Chat.findByPk(chatId, {
      include: [
        {
          model: Parent,
          as: 'parent',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'role'],
            },
          ],
        },
        {
          model: Specialist,
          as: 'specialist',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'role'],
            },
          ],
        },
        {
          model: Message,
          as: 'messages',
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['id', 'name', 'role'],
            },
          ],
        },
      ],
      order: [[{ model: Message, as: 'messages' }, 'createdAt', 'ASC']], // сортировка сообщений по времени
    });

    if (!chat) {
      const error = new Error('Чат не найден');
      error.status = 404;
      throw error;
    }

    const parentUserId = chat.parent?.user?.id;
    const specialistUserId = chat.specialist?.user?.id;

    if (userId !== parentUserId && userId !== specialistUserId) {
      const error = new Error('Доступ запрещён');
      error.status = 403;
      throw error;
    }

    return chat;
  }

}

module.exports = ChatService;
