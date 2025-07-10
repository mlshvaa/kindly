import type { z } from 'zod';
import type { reviewSchema } from './reviewSchema';

// cxeма для возвращения данных отзыва
export type reviewType = z.infer<typeof reviewSchema>;

// состояние списка отзывов
export type reviewStateType = {
  reviews: reviewType[];
  loading: boolean;
  error: string | null;
};
