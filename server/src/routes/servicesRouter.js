const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const ServicesController = require('../controllers/servicesController');

const servicesRouter = express.Router();

servicesRouter.get('/', ServicesController.getAllServices); // список всех услуг

servicesRouter.post('/', verifyAccessToken, ServicesController.createService); // добавить новую услугу

servicesRouter.delete(
  '/:id',
  isIdValid('id'),
  verifyAccessToken,
  ServicesController.deleteServiceById,
); // удалить услугу

module.exports = servicesRouter;
