const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const SpecialistRequestsController = require('../controllers/specialistRequestsController');

const specialistRequestsRouter = express.Router();

specialistRequestsRouter.use(verifyAccessToken);

// получить все заявки, адресованные специалисту
specialistRequestsRouter.get('/', SpecialistRequestsController.getIncomingRequests);

// одобрить заявку
specialistRequestsRouter.patch('/:id/approve', isIdValid('id'), SpecialistRequestsController.approveRequest);

// отклонить заявку
specialistRequestsRouter.patch('/:id/decline', isIdValid('id'), SpecialistRequestsController.declineRequest);

module.exports = specialistRequestsRouter;
