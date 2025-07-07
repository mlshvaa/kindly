import { createSlice } from '@reduxjs/toolkit';
import {
  addService,
  assignService,
  getAllServiceSpecialists,
  getServiceSpecialistsBySpecialistId,
  removeService,
  removeServiceSpecialist,
} from './serviceSpecialistThunks';
import type { ServiceSpecialistStateType } from './serviceSpecialistType';

const initialState: ServiceSpecialistStateType = {
  services: [],
  myServiceSpecialists: [],
  loading: false,
  error: null,
};

export const serviceSpecialistSlice = createSlice({
  name: 'serviceSpecialist',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Получить связки специалист-услуга конкретного специалиста
    //  загрузка pending
    builder
      .addCase(getServiceSpecialistsBySpecialistId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(getServiceSpecialistsBySpecialistId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавление
      .addCase(getServiceSpecialistsBySpecialistId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.myServiceSpecialists = action.payload;
      });

    // Получить все  услуги
    builder
      .addCase(getAllServiceSpecialists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(getAllServiceSpecialists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавление
      .addCase(getAllServiceSpecialists.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.services = action.payload;
      });
    // Назначение услуги специалисту
    builder
      .addCase(assignService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(assignService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавление
      .addCase(assignService.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.myServiceSpecialists.push(action.payload);
      });
    // Удалить услугу полностью
    builder
      .addCase(removeService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(removeService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled
      .addCase(removeService.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.services = state.services.filter((item) => item.id !== action.payload);
      });
    // Удалить услугу у специалиста
    //  загрузка pending
    builder
      .addCase(removeServiceSpecialist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeServiceSpecialist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.myServiceSpecialists = state.myServiceSpecialists.filter(
          (item) => item.serviceId !== action.payload,
        );
      })
      .addCase(removeServiceSpecialist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      });
    // добавить новую услугу
    builder
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавление
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.services.push(action.payload);
      });
  },
});

export default serviceSpecialistSlice.reducer;
