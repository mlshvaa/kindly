const { Review, Specialist, Parent } = require('../../db/models');

class ReviewsService {
  // Все отзывы вообще все
  static async getAllReviews() {
    const reviews = await Review.findAll({
      include: [
        {
          model: Specialist,
          as: 'specialist',
          include: ['user'], // чтобы получить имя специалиста
        },
        {
          model: Parent,
          as: 'parent',
          include: ['user'], // чтобы получить имя родителя
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return reviews;
  }

  static async getBySpecialist(specialistId) {
    const reviews = await Review.findAll({
      where: { specialistId },
      include: [
        {
          model: Parent,
          as: 'parent',
          include: ['user'], // чтобы получить имя родителя
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return reviews;
  }

  static async createReview({ specialistId, parentId, text, rating }) {
    const review = await Review.create({ specialistId, parentId, text, rating });
    return review;
  }

  static async deleteReviewById(id) {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('Отзыв не найден');
    }
    await review.destroy();
  }
}

module.exports = ReviewsService;
