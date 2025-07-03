const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const SpecialistServiceController = require('../controllers/SpecialistServiceController');

const specialistServiceRouter = express.Router();

// 🔹 Получить все услуги конкретного специалиста
specialistServiceRouter.get('/:specialistId', isIdValid('specialistId'), SpecialistServiceController.getServicesBySpecialistId);

// 🔹 Добавить услугу специалисту
specialistServiceRouter.post('/', verifyAccessToken, SpecialistServiceController.addServiceToSpecialist);

// 🔹 Удалить услугу у специалиста
specialistServiceRouter.delete('/:specialistId/:serviceId', isIdValid('specialistId'), isIdValid('serviceId'), verifyAccessToken, SpecialistServiceController.removeServiceFromSpecialist);

module.exports = specialistServiceRouter;
