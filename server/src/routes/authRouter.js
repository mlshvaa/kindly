const AuthController = require('../controllers/authController');

const authRouter = require('express').Router();

authRouter.post('/signup', AuthController.signup);
authRouter.post('/signin', AuthController.signin);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/refresh', AuthController.refresh);


module.exports = authRouter;
