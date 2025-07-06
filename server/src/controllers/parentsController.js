const ParentsService = require('../services/parentsService');

class ParentsController {
  // Получить всех родителей (например, для админа)
  static async getAllParents(req, res) {
    try {
      const parents = await ParentsService.findAllParents();
      res.status(200).json(parents);
    } catch (error) {
      console.error('Ошибка при получении всех родителей:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Получить текущий профиль родителя (авторизованного)
  static async getMyParentProfile(req, res) {
    try {
      const userId = res.locals.user.id;
      const parentProfile = await ParentsService.findParentByUserId(userId);
      res.status(200).json(parentProfile);
    } catch (error) {
      console.error('Ошибка при получении профиля родителя:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Получить родителя по ID (для нянь)
  static async getParentById(req, res) {
    try {
      const { id } = req.params;
      const parent = await ParentsService.findParentById(id);
      res.status(200).json(parent);
    } catch (error) {
      console.error('Ошибка при получении родителя по ID:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Создать профиль родителя
  static async createParentProfile(req, res) {
    try {
      const userId = res.locals.user.id;
      const data = req.body;
      const newParent = await ParentsService.createParent({ ...data, userId });
      res.status(201).json(newParent);
    } catch (error) {
      console.error('Ошибка при создании профиля родителя:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Обновить профиль родителя
  static async updateParentProfile(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const userId = res.locals.user.id;
      const updated = await ParentsService.updateParent(id, userId, data);
      res.status(200).json(updated);
    } catch (error) {
      console.error('Ошибка при обновлении профиля родителя:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Удалить профиль родителя
  static async deleteParentProfile(req, res) {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;
      await ParentsService.deleteParent(id, userId);
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка при удалении профиля родителя:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

   // ➕ Добавить ребёнка
  static async addChild(req, res) {
    try {
      const userId = res.locals.user.id;
      const parentId = req.params.id;
      const childData = req.body; // { name: '', age: '' }

      const updated = await ParentsService.addChild(parentId, userId, childData);
      res.status(200).json(updated);
    } catch (error) {
      console.error('Ошибка при добавлении ребёнка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // 🖊 Обновить ребёнка по индексу
  static async updateChild(req, res) {
    try {
      const userId = res.locals.user.id;
      const parentId = req.params.id;
      const index = parseInt(req.params.index, 10);
      const childData = req.body;

      const updated = await ParentsService.updateChild(parentId, userId, index, childData);
      res.status(200).json(updated);
    } catch (error) {
      console.error('Ошибка при обновлении ребёнка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // ❌ Удалить ребёнка по индексу
  static async deleteChild(req, res) {
    try {
      const userId = res.locals.user.id;
      const parentId = req.params.id;
      const index = parseInt(req.params.index, 10);

      const updated = await ParentsService.deleteChild(parentId, userId, index);
      res.status(200).json(updated);
    } catch (error) {
      console.error('Ошибка при удалении ребёнка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = ParentsController;
