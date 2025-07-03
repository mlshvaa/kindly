const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const ProfileController = require('../controllers/profileController');

const profileRouter = express.Router();

// Получить анкету текущего специалиста
profileRouter.get('/', verifyAccessToken, ProfileController.getMyProfile);

// Обновить анкету текущего специалиста
profileRouter.put('/', verifyAccessToken, ProfileController.updateMyProfile);

// Удалить анкету специалиста (опционально)
profileRouter.delete('/', verifyAccessToken, ProfileController.deleteMyProfile);

module.exports = profileRouter;
