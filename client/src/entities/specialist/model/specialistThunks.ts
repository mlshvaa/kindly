// для работы с ассинхонными
// нужен для удобной работы с асинхронными запросами в Redux Toolkit. Он автоматически создаёт экшены для разных стадий запроса и позволяет легко управлять состоянием загрузки и ошибок. (pending, fulfilled, rejected )

import { createAsyncThunk } from '@reduxjs/toolkit';
import specialistService from '../api/specialistService';
import type { UpdateSpecialistPayload } from './specialistType';


// получение данных педагога по id для родителей
export const getSpecialistById = createAsyncThunk(
  'specialist/getById',
  async (id: number) => await specialistService.getSpecialistById(id),

// Получить данные всех педагогов
export const getAllSpecialists = createAsyncThunk(
  'specialist/getAllSpecialists',
  async () => await specialistService.getAllSpecialists(),
);

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
// Загрузка нескольких дипломов
export const updateSpecialistDiplomas = createAsyncThunk(
  'specialist/updateSpecialistDiplomas',
  async ({ userId, data }: UpdateSpecialistPayload) =>
    await specialistService.updateSpecialistDiplomas(userId, data),
);
// Удаление диплома
export const deleteSpecialistDiploma = createAsyncThunk(
  'specialist/deleteSpecialistDiploma',
  async ({ userId, photoPath }: { userId: number; photoPath: string }) =>
    await specialistService.deleteSpecialistDiploma(userId, photoPath),
);
