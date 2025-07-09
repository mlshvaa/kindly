import { createAsyncThunk } from '@reduxjs/toolkit';
import requestService from '../api/requestService';
import type { NewRequestType, RequestType } from './requestTypes';

// Получить заявки текущего родителя
export const getMyRequests = createAsyncThunk<RequestType[]>(
  'request/getMyRequests',
  async (_, thunkAPI) => {
    try {
      return await requestService.getMyRequests();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? 'Ошибка при загрузке заявок',
      );
    }
  },
);

// Получить заявки от конкретного родителя к текущему специалисту
export const getRequestsFromParentToMe = createAsyncThunk<
  RequestType[],
  number // parentId
>('request/getRequestsFromParentToMe', async (parentId, thunkAPI) => {
  try {
    return await requestService.getRequestsFromParentToMe(parentId);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? 'Ошибка при загрузке заявок родителя',
    );
  }
});

// 🔸 Обновить статус заявки (одобрить / отклонить)
export const updateRequestStatus = createAsyncThunk<
  void,
  { id: number; status: 'одобрено' | 'отклонено' }
>('request/updateRequestStatus', async ({ id, status }, thunkAPI) => {
  try {
    await requestService.updateRequestStatus(id, status);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? 'Ошибка при обновлении статуса заявки',
    );
  }
});

// Создать заявку
export const createRequest = createAsyncThunk(
  'request/create',
  async (data: NewRequestType) => await requestService.createRequest(data),
);
