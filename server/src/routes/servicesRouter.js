const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const ServicesController = require('../controllers/ServicesController');

const servicesRouter = express.Router();

// Получить все услуги
servicesRouter.get('/', ServicesController.getAllServices);

// Получить услугу по id
servicesRouter.get('/:id', isIdValid('id'), ServicesController.getServiceById);

// Создать новую услугу (например, админка)
servicesRouter.post('/', verifyAccessToken, ServicesController.createService);

// Обновить услугу
servicesRouter.put('/:id', verifyAccessToken, isIdValid('id'), ServicesController.updateService);

// Удалить услугу
servicesRouter.delete('/:id', verifyAccessToken, isIdValid('id'), ServicesController.deleteService);

module.exports = servicesRouter;
