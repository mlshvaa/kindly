const express = require('express');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const isIdValid = require('../middlewares/isIdValid');
const ReviewsController = require('../controllers/ReviewsController');

const reviewsRouter = express.Router();

// Получить все отзывы
reviewsRouter.get('/', ReviewsController.getAllReviews);

// Получить отзывы конкретного специалиста
reviewsRouter.get('/specialist/:specialistId', isIdValid('specialistId'), ReviewsController.getReviewsBySpecialist);

// Создать отзыв (только авторизованный клиент)
reviewsRouter.post('/', verifyAccessToken, ReviewsController.createReview);

// Удалить отзыв по id (например, админ или сам клиент)
reviewsRouter.delete('/:id', verifyAccessToken, isIdValid('id'), ReviewsController.deleteReview);

module.exports = reviewsRouter;
