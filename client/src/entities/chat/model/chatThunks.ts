import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/shared/api/axiosInstance';
import type { ChatPreview } from './chatTypes';

export const startChat = createAsyncThunk<
  ChatPreview,
  { parentId: number; specialistId: number }
>('chat/startChat', async ({ parentId, specialistId }) => {
  const response = await axiosInstance.post('/chats', { parentId, specialistId });
  return response.data;
});
