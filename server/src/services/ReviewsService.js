const { Review, User } = require('../../db/models');

class ReviewsService {
  static async getAllReviews() {
    return Review.findAll({
      include: [{ model: User, as: 'Client', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });
  }

  static async getReviewsBySpecialist(specialistId) {
    return Review.findAll({
      where: { specialistId },
      include: [{ model: User, as: 'Client', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });
  }

  static async createReview({ specialistId, clientId, text, rating }) {
    return Review.create({ specialistId, clientId, text, rating });
  }

  static async deleteReview(id, userId) {
    const review = await Review.findByPk(id);
    if (!review) throw new Error('Отзыв не найден');
    if (review.clientId !== userId) throw new Error('Нет доступа для удаления');
    await review.destroy();
  }
}

module.exports = ReviewsService;
