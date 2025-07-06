const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const CalendarsController = require('../controllers/calendarsController');

const calendarsRouter = express.Router();

calendarsRouter.get('/', CalendarsController.getAllCalendars); // все записи (возможно — для админа)

calendarsRouter.get('/specialist/:specialistId', isIdValid('specialistId'), CalendarsController.getBySpecialistId); // по специалисту

calendarsRouter.post('/', verifyAccessToken, CalendarsController.createCalendar); // добавить слот

calendarsRouter.delete('/:id', isIdValid('id'), verifyAccessToken, CalendarsController.deleteCalendar); // удалить слот

module.exports = calendarsRouter;
