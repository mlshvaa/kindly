const { Parent, User } = require('../../db/models');

class ParentsService {
  // Получить всех родителей (для админа)
  static async findAllParents() {
    const parents = await Parent.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
      order: [['createdAt', 'DESC']],
    });
    return parents;
  }

  // Получить родителя по userId (для текущего авторизованного пользователя)
  static async findParentByUserId(userId) {
    const parent = await Parent.findOne({
      where: { userId },
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
    });
    if (!parent) throw new Error('Профиль родителя не найден');
    return parent;
  }

  // Получить родителя по id (для отображения няне)
  static async findParentById(id) {
    const parent = await Parent.findByPk(id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
    });
    if (!parent) throw new Error('Родитель не найден');
    return parent;
  }

  // Создать профиль родителя
  static async createParent(data) {
    const existing = await Parent.findOne({ where: { userId: data.userId } });
    if (existing) throw new Error('Профиль уже существует');
    const newParent = await Parent.create(data);
    return newParent;
  }

  // Обновить профиль родителя
  static async updateParent(id, userId, data) {
    const parent = await Parent.findByPk(id);
    if (!parent) throw new Error('Профиль не найден');
    if (parent.userId !== userId) throw new Error('Нет доступа к редактированию');
    const updatedParent = await parent.update(data);
    return updatedParent;
  }

  // Удалить профиль родителя
  static async deleteParent(id, userId) {
    const parent = await Parent.findByPk(id);
    if (!parent) throw new Error('Профиль не найден');
    if (parent.userId !== userId) throw new Error('Нет доступа к удалению');
    await parent.destroy();
  }

  // ➕ Добавить нового ребёнка
  static async addChild(parentId, userId, childData) {
    const parent = await Parent.findByPk(parentId);
    if (!parent) throw new Error('Профиль не найден');
    if (parent.userId !== userId) throw new Error('Нет доступа');

    const updatedChildren = [...parent.children, childData];
    const updatedParent = await parent.update({ children: updatedChildren });
    return updatedParent;
  }

  // 🖊 Обновить одного ребёнка по индексу
  static async updateChild(parentId, userId, index, childData) {
    const parent = await Parent.findByPk(parentId);
    if (!parent) throw new Error('Профиль не найден');
    if (parent.userId !== userId) throw new Error('Нет доступа');

    const children = [...parent.children];
    if (!children[index]) throw new Error('Ребёнок не найден по индексу');

    children[index] = childData;
    const updatedParent = await parent.update({ children });
    return updatedParent;
  }

  // ❌ Удалить ребёнка по индексу
  static async deleteChild(parentId, userId, index) {
    const parent = await Parent.findByPk(parentId);
    if (!parent) throw new Error('Профиль не найден');
    if (parent.userId !== userId) throw new Error('Нет доступа');

    const children = [...parent.children];
    if (!children[index]) throw new Error('Ребёнок не найден');

    children.splice(index, 1); // удаляем
    const updatedParent = await parent.update({ children });
    return updatedParent;
  }

  static async getParentWithUserById(parentId) {
    const parent = await Parent.findByPk(parentId, {
      include: ['user'], // или include: { model: User, as: 'user' }
    });
    if (!parent) throw new Error('Родитель не найден');
    return parent;
  }
}

module.exports = ParentsService;
