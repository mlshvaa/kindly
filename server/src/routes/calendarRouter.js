const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const CalendarController = require('../controllers/CalendarController');

const calendarRouter = express.Router();

// Получить все слоты конкретного специалиста
calendarRouter.get('/specialist/:specialistId', isIdValid('specialistId'), CalendarController.getSlotsBySpecialist);

// Создать новый слот (авторизованный специалист)
calendarRouter.post('/', verifyAccessToken, CalendarController.createSlot);

// Обновить слот (например, изменить доступность)
calendarRouter.patch('/:id', verifyAccessToken, isIdValid('id'), CalendarController.updateSlot);

// Удалить слот
calendarRouter.delete('/:id', verifyAccessToken, isIdValid('id'), CalendarController.deleteSlot);

module.exports = calendarRouter;
