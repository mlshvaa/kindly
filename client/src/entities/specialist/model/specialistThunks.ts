// для работы с ассинхонными
// нужен для удобной работы с асинхронными запросами в Redux Toolkit. Он автоматически создаёт экшены для разных стадий запроса и позволяет легко управлять состоянием загрузки и ошибок. (pending, fulfilled, rejected )

import { createAsyncThunk } from '@reduxjs/toolkit';
import specialistService from '../api/specialistService';
import type { UpdateSpecialistPayload } from './specialistType';

// Получить данные педагога текущего пользователя
export const getAllSpecialistUser = createAsyncThunk(
  'specialist/getAllSpecialistUser',
  async (id: number) => await specialistService.getAllSpecialistUser(id),
);

// Обновить данные педагога текущего пользователя
export const updateSpecialistUser = createAsyncThunk(
  'specialist/updateSpecialistUser',
  async ({ userId, data }: UpdateSpecialistPayload) =>
    await specialistService.updateSpecialistUser(userId, data),
);

// Загрузка одного файла с полем 'photo'
export const updateSpecialistPhoto = createAsyncThunk(
  'specialist/updateSpecialistPhoto',
  async ({ userId, data }: UpdateSpecialistPayload) =>
    await specialistService.updateSpecialistPhoto(userId, data),
);
