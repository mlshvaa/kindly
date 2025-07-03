const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const RequestsController = require('../controllers/RequestsController');

const requestsRouter = express.Router();

// 🔹 Получить все заявки, полученные конкретным специалистом
requestsRouter.get('/specialist/:specialistId', isIdValid('specialistId'), verifyAccessToken, RequestsController.getRequestsForSpecialist);

// 🔹 Получить все заявки, отправленные авторизованным клиентом
requestsRouter.get('/my', verifyAccessToken, RequestsController.getMyRequests);

// 🔹 Отправить новую заявку
requestsRouter.post('/', verifyAccessToken, RequestsController.createRequest);

// 🔹 Обновить статус заявки (подтвердить / отклонить)
requestsRouter.patch('/:id/status', isIdValid('id'), verifyAccessToken, RequestsController.updateRequestStatus);

// 🔹 Удалить заявку
requestsRouter.delete('/:id', isIdValid('id'), verifyAccessToken, RequestsController.deleteRequest);

module.exports = requestsRouter;
