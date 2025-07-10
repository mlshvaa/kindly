const ReviewsService = require('../services/reviewsService');

class ReviewsController {
  // Все отзывы вообще все
  static async getAllReviews(req, res) {
    try {
      const reviews = await ReviewsService.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getBySpecialist(req, res) {
    try {
      const { specialistId } = req.params;
      const reviews = await ReviewsService.getBySpecialist(specialistId);
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createReview(req, res) {
    try {
      const parentId = res.locals.user.id; // авторизованный родитель
      const { specialistId, text, rating } = req.body;

      const newReview = await ReviewsService.createReview({
        specialistId,
        parentId,
        text,
        rating,
      });
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Ошибка при создании отзыва:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteReviewById(req, res) {
    try {
      const { id } = req.params;
      await ReviewsService.deleteReviewById(id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка при удалении отзыва:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReviewsController;
