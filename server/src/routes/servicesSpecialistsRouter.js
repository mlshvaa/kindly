const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const ServicesSpecialistsController = require('../controllers/servicesSpecialistsController');

const servicesSpecialistsRouter = express.Router();

// Получить все связки специалист-услуга
servicesSpecialistsRouter.get('/', ServicesSpecialistsController.getAll);

// Назначить услугу специалисту
servicesSpecialistsRouter.post('/', verifyAccessToken, ServicesSpecialistsController.assignService);

// Удалить связку
servicesSpecialistsRouter.delete(
  '/',
  verifyAccessToken,
  ServicesSpecialistsController.removeServiceFromSpecialist
);

module.exports = servicesSpecialistsRouter;
