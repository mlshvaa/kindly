const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const SpecialistCalendarController = require('../controllers/specialistCalendarController');

const specialistCalendarRouter = express.Router();

specialistCalendarRouter.use(verifyAccessToken);

// получить все слоты конкретного специалиста
specialistCalendarRouter.get('/', SpecialistCalendarController.getCalendarSlots);

// изменить доступность (переключить isAvailable)
specialistCalendarRouter.patch('/:id/toggle', isIdValid('id'), SpecialistCalendarController.toggleAvailability);

// добавить новый слот вручную
specialistCalendarRouter.post('/', SpecialistCalendarController.addSlot);

module.exports = specialistCalendarRouter;
