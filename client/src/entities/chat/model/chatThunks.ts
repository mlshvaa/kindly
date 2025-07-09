import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/shared/api/axiosInstance';
import type { ChatPreview } from './chatTypes';

export const startChatThunk = createAsyncThunk<
  ChatPreview,
  { parentId: number }
>('chat/startChat', async ({ parentId }, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/chats', { parentId });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Не удалось создать чат');
  }
});

export const getMyChats = createAsyncThunk<ChatPreview[]>('chat/getMyChats', async () => {
  const res = await axiosInstance.get('/chats/my');
  return res.data;
});