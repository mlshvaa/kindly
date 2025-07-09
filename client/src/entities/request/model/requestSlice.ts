import { createSlice } from '@reduxjs/toolkit';
import type { RequestState } from './requestTypes';
import {
  createRequest,
  getMyRequests,
  getRequestsFromParentToMe,
  updateRequestStatus,
} from './requestThunks';

const initialState: RequestState = {
  myRequests: [],
  requestsFromParent: [],
  loading: false,
  error: null,
  loadingFromParent: false,
  errorFromParent: null,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyRequests.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMyRequests.fulfilled, (state, action) => {
      state.myRequests = action.payload;
      state.loading = false;
    });
    builder.addCase(getMyRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 👀 Заявки от конкретного родителя
    builder.addCase(getRequestsFromParentToMe.pending, (state) => {
      state.loadingFromParent = true;
      state.errorFromParent = null;
    });
    builder.addCase(getRequestsFromParentToMe.fulfilled, (state, action) => {
      state.requestsFromParent = action.payload;
      state.loadingFromParent = false;
    });
    builder.addCase(getRequestsFromParentToMe.rejected, (state, action) => {
      state.loadingFromParent = false;
      state.errorFromParent = action.payload as string;
    });

    // ✍ Обновление статуса заявки
    builder.addCase(updateRequestStatus.fulfilled, (state, action) => {
      // можно дополнительно обновить статус заявки в массиве
      // пока опустим — обновим после нового запроса
    });

    // Создать заявку
    builder
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.myRequests.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      });
  },
});

export default requestSlice.reducer;
