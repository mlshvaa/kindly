import { createSlice } from '@reduxjs/toolkit';
import {
  getAllSpecialistUser,
  updateSpecialistUser,
  updateSpecialistPhoto,
  updateSpecialistDiplomas,
  deleteSpecialistDiploma,
  getSpecialistById,
} from './specialistThunks';
import type { SpecialistStateType } from './specialistType';

// Define the initial state using that type
const initialState: SpecialistStateType = {
  specialist: null,
  specialistWithLinks: null,
  loading: false,
  error: null,
};

export const specialistSlice = createSlice({
  name: 'specialist',
  initialState,
  reducers: {},
  // Экстроредьюсер прописываем дополнительный редуктор (передаем конструктор)
  extraReducers: (builder) => {
    // получение данных педагога по id для родителей
    builder
      .addCase(getSpecialistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecialistById.fulfilled, (state, action) => {
        state.loading = false;
        state.specialistWithLinks = action.payload;
      })
      .addCase(getSpecialistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки специалиста';
      });
    // Получить данные педагога текущего пользователя
    //  загрузка pending
    builder
      .addCase(getAllSpecialistUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(getAllSpecialistUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавление
      .addCase(getAllSpecialistUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.specialist = action.payload;
      });

    // Обновить данные педагога текущего пользователя
    builder
      .addCase(updateSpecialistUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSpecialistUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при обновлении педагога';
        console.log(action.error.message);
      })
      .addCase(updateSpecialistUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Обновляем данные специалиста в сторе
        state.specialist = action.payload;
      });

    // Загрузка одного файла с полем 'photo'
    builder
      .addCase(updateSpecialistPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSpecialistPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки фото';
      })
      .addCase(updateSpecialistPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.specialist = action.payload;
      });

    // Загрузка нескольких дипломов
    builder
      .addCase(updateSpecialistDiplomas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSpecialistDiplomas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки дипломов';
      })
      .addCase(updateSpecialistDiplomas.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.specialist = action.payload;
      });

    // Удаление диплома
    builder
      .addCase(deleteSpecialistDiploma.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSpecialistDiploma.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка удаления диплома';
      })
      .addCase(deleteSpecialistDiploma.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.specialist = action.payload;
      });
  },
});

export default specialistSlice.reducer;
