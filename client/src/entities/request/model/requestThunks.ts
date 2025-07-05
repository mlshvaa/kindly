import { createAsyncThunk } from '@reduxjs/toolkit';
import requestService from '../api/requestService';
import type { RequestType } from './requestTypes';

// Получить заявки текущего родителя (личный кабинет)
export const getMyRequests = createAsyncThunk<RequestType[]>(
  'request/getMyRequests',
  async (_, thunkAPI) => {
    try {
      return await requestService.getMyRequests();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? 'Ошибка при загрузке заявок');
    }
  }
);
