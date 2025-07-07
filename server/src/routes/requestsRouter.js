const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const RequestsController = require('../controllers/requestsController');

const requestsRouter = express.Router();

// Все заявки по родителю (личный кабинет)
requestsRouter.get('/parent', verifyAccessToken, RequestsController.getByParent);

// Все заявки по специалисту (для календаря)
requestsRouter.get('/specialist/:specialistId', isIdValid('specialistId'), RequestsController.getBySpecialist);

// Все заявки по текущему специалисту (личный кабинет специалиста)
requestsRouter.get('/specialist', verifyAccessToken, RequestsController.getForCurrentSpecialist);

// Создать заявку
requestsRouter.post('/', verifyAccessToken, RequestsController.createRequest);

// Обновить статус заявки
requestsRouter.patch('/:id/status', isIdValid('id'), verifyAccessToken, RequestsController.updateStatus);

// Удалить заявку
requestsRouter.delete('/:id', isIdValid('id'), verifyAccessToken, RequestsController.deleteRequestById);

module.exports = requestsRouter;
