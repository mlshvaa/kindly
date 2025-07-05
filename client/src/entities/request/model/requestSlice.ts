import { createSlice } from '@reduxjs/toolkit';
import type { RequestState } from './requestTypes';
import { getMyRequests } from './requestThunks';

const initialState: RequestState = {
  myRequests: [],
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyRequests.fulfilled, (state, action) => {
        state.myRequests = action.payload;
        state.loading = false;
      })
      .addCase(getMyRequests.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Ошибка при получении заявок';
      });
  },
});

export default requestSlice.reducer;
