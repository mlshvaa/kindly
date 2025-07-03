import { createSlice } from '@reduxjs/toolkit';
import { logout, refresh, signin, signup } from './userThunks';
import type { userStateType } from './userType';

// Define the initial state using that type
const initialState: userStateType = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // Экстроредьюсер прописываем дополнительный редуктор (передаем конструктор)
  extraReducers: (builder) => {
    // для регистрации
    //  загрузка pending
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавление
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      });
    // для входа
    //  загрузка pending
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавление
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      });

    // для refresh
    //  загрузка pending
    builder
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавлени
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      });
    // выход
    //  загрузка pending
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //  rejected ошибка
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'В слайсе произошла ошибка';
        console.log(action.error.message);
      })
      // fulfilled добавлени
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
