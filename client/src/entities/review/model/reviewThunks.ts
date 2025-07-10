import { createAsyncThunk } from '@reduxjs/toolkit';
import reviewService from '../api/reviewServise';

// Все отзывы вообще все
export const getAllReviews = createAsyncThunk(
  'review/getAll',
  async () => await reviewService.getAllReviews(),
);
