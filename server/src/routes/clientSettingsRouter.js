const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const ClientSettingsController = require('../controllers/clientSettingsController');

const clientSettingsRouter = express.Router();

clientSettingsRouter.use(verifyAccessToken);

// обновить email
clientSettingsRouter.patch('/email', ClientSettingsController.updateEmail);

// обновить пароль
clientSettingsRouter.patch('/password', ClientSettingsController.updatePassword);

module.exports = clientSettingsRouter;
