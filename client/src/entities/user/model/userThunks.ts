import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../api/userService';
import type { signinType, signupType } from './userType';

// для работы с ассинхонными
// нужен для удобной работы с асинхронными запросами в Redux Toolkit. Он автоматически создаёт экшены для разных стадий запроса и позволяет легко управлять состоянием загрузки и ошибок. (pending, fulfilled, rejected )
//   регистрация
export const signup = createAsyncThunk(
  'user/signup',
  async (data: signupType) => await userService.signup(data),
);
// вход
export const signin = createAsyncThunk(
  'user/signin',
  async (data: signinType) => await userService.signin(data),
);

// refresh
export const refresh = createAsyncThunk('user/refresh', async () => await userService.refresh());

// выход
export const logout = createAsyncThunk('user/logout', async () => await userService.logout());
