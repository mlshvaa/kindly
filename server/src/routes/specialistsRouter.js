const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const SpecialistsController = require('../controllers/SpecialistsController');

const specialistsRouter = express.Router();

// Получить всех специалистов
specialistsRouter.get('/', SpecialistsController.getAllSpecialists);

// Получить одного специалиста по id
specialistsRouter.get('/:id', isIdValid('id'), SpecialistsController.getSpecialistById);

// Обновить профиль специалиста
specialistsRouter.put('/:id', verifyAccessToken, isIdValid('id'), SpecialistsController.updateSpecialistById);

// Удалить профиль специалиста
specialistsRouter.delete('/:id', verifyAccessToken, isIdValid('id'), SpecialistsController.deleteSpecialistById);

module.exports = specialistsRouter;
