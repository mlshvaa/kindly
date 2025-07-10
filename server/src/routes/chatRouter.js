const express = require('express');
const ChatController = require('../controllers/chatController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');

const router = express.Router();

router.use(verifyAccessToken);

router.post('/', ChatController.getOrCreate);
router.get('/my', ChatController.getMyChats);
router.get('/:chatId', isIdValid('chatId'), ChatController.getById);

module.exports = router;
