import { createSlice } from '@reduxjs/toolkit';
import { getAllReviews } from './reviewThunks';
import type { reviewStateType } from './reviewType';

const initialState: reviewStateType = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // получение всех
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при получении отзывов';
      });
  },
});
export default reviewSlice.reducer;
