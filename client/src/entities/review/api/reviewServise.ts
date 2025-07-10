import axiosInstance from '@/shared/api/axiosInstance';
import type { AxiosInstance } from 'axios';
import { reviewSchema } from '../model/reviewSchema';
import type { reviewType } from '../model/reviewType';

class ReviewService {
  constructor(private readonly client: AxiosInstance) {}

  // Все отзывы вообще все
  async getAllReviews(): Promise<reviewType[]> {
    const res = await axiosInstance.get('/reviews');
    return reviewSchema.array().parse(res.data);
  }
}

export default new ReviewService(axiosInstance);
