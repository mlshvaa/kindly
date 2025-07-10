const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const ParentsController = require('../controllers/parentsController');

const parentsRouter = express.Router();

// Получить всех родителей только для админа
parentsRouter.get('/', ParentsController.getAllParents);

// Получить профиль текущего родителя, только авторизованный родитель
parentsRouter.get('/me', verifyAccessToken, ParentsController.getMyParentProfile);

// Возвращать информацию о конкретном родителе по его id, чтобы няньки могли посмотреть
parentsRouter.get('/:id', verifyAccessToken, ParentsController.getParentById);

// Получить заявки от этого родителя к текущему специалисту
parentsRouter.get(
  '/:id/full',
  verifyAccessToken,
  isIdValid('id'),
  ParentsController.getFullParentById,
);

// Создать профиль родителя, только родитель
parentsRouter.post('/', verifyAccessToken, ParentsController.createParentProfile);

// Обновить профиль родителя, только владелец
parentsRouter.put(
  '/:id',
  isIdValid('id'),
  verifyAccessToken,
  ParentsController.updateParentProfile,
);

// Удалить профиль родителя, только владелец
parentsRouter.delete(
  '/:id',
  isIdValid('id'),
  verifyAccessToken,
  ParentsController.deleteParentProfile,
);

// ➕ Добавить ребёнка (доступно только владельцу профиля)
parentsRouter.post(
  '/:id/children',
  isIdValid('id'),
  verifyAccessToken,
  ParentsController.addChild,
);

// 🖊 Обновить ребёнка по индексу (доступно только владельцу профиля)
parentsRouter.put(
  '/:id/children/:index',
  isIdValid('id'),
  verifyAccessToken,
  ParentsController.updateChild,
);

// ❌ Удалить ребёнка по индексу (доступно только владельцу профиля)
parentsRouter.delete(
  '/:id/children/:index',
  isIdValid('id'),
  verifyAccessToken,
  ParentsController.deleteChild,
);

module.exports = parentsRouter;
