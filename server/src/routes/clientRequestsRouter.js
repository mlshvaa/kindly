const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const ClientRequestsController = require('../controllers/clientRequestsController');

const clientRequestsRouter = express.Router();

clientRequestsRouter.use(verifyAccessToken);

// получить все заявки текущего клиента
clientRequestsRouter.get('/', ClientRequestsController.getMyRequests);

// отправить новую заявку конкретному специалисту
clientRequestsRouter.post('/:specialistId', isIdValid('specialistId'), ClientRequestsController.sendRequest);

module.exports = clientRequestsRouter;
