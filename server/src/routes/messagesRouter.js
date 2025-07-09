const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const messagesController = require('../controllers/messagesController');

const messagesRouter = express.Router();

messagesRouter.get('/:chatId', verifyAccessToken, isIdValid('chatId'), messagesController.getByChatId)

module.exports = messagesRouter;

