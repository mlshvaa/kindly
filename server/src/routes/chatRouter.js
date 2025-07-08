const express = require('express');
const ChatController = require('../controllers/chatController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const router = express.Router();

router.use(verifyAccessToken);

router.post('/', ChatController.getOrCreate);
router.get('/my', ChatController.getMyChats);

module.exports = router;
