const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const ReviewsController = require('../controllers/reviewsController');

const reviewsRouter = express.Router();

// Все отзывы вообще все
reviewsRouter.get('/', ReviewsController.getAllReviews);

// Все отзывы по специалисту
reviewsRouter.get(
  '/specialist/:specialistId',
  isIdValid('specialistId'),
  ReviewsController.getBySpecialist,
);

// Создать отзыв (только авторизованный родитель)
reviewsRouter.post('/', verifyAccessToken, ReviewsController.createReview);

// Удалить отзыв (если нужно)
reviewsRouter.delete(
  '/:id',
  isIdValid('id'),
  verifyAccessToken,
  ReviewsController.deleteReviewById,
);

module.exports = reviewsRouter;
