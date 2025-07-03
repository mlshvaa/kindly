const express = require('express');
const isIdValid = require('../middlewares/isIdValid');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const UsersController = require('../controllers/usersController');

const usersRouter = express.Router();

// Получить пользователя по ID
usersRouter.get('/:id', isIdValid('id'), UsersController.getUserById);

// Удалить пользователя (по его ID, админ или сам)
usersRouter.delete('/:id', isIdValid('id'), verifyAccessToken, UsersController.deleteUserById);

// Получить данные текущего авторизованного пользователя
usersRouter.get('/me', verifyAccessToken, UsersController.getCurrentUser);

module.exports = usersRouter;
