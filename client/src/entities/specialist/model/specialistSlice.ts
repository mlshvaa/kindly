import { createSlice } from '@reduxjs/toolkit';
import {
  getAllSpecialistUser,
  updateSpecialistPhoto,
  updateSpecialistUser,
} from './specialistThunks';
import type { SpecialistStateType } from './specialistType';

// Define the initial state using that type
const initialState: SpecialistStateType = {
  specialist: null,
  loading: false,
  error: null,
};

export const specialistSlice = createSlice({
  name: 'specialist',
  initialState,
  reducers: {},
  // Экстроредьюсер прописываем дополнительный редуктор (передаем конструктор)
  extraReducers: (builder) => {
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

    // Загрузка и обновление фото педагога
    builder
      .addCase(updateSpecialistPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSpecialistPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке фото';
      })
      .addCase(updateSpecialistPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.specialist = action.payload;
      });
  },
});

export default specialistSlice.reducer;
