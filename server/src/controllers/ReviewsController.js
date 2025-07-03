const ReviewsService = require('../services/ReviewsService');

class ReviewsController {
  static async getAllReviews(req, res) {
    try {
      const reviews = await ReviewsService.getAllReviews();
      res.json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении отзывов' });
    }
  }

  static async getReviewsBySpecialist(req, res) {
    try {
      const { specialistId } = req.params;
      const reviews = await ReviewsService.getReviewsBySpecialist(specialistId);
      res.json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении отзывов специалиста' });
    }
  }

  static async createReview(req, res) {
    try {
      const { specialistId, text, rating } = req.body;
      const clientId = res.locals.user.id;
      const newReview = await ReviewsService.createReview({ specialistId, clientId, text, rating });
      res.status(201).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании отзыва' });
    }
  }

  static async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;
      await ReviewsService.deleteReview(id, userId);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при удалении отзыва' });
    }
  }
}

module.exports = ReviewsController;
