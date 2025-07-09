import axiosInstance from '@/shared/api/axiosInstance';
import type { ChatPreview, ChatMessage } from '../model/chatTypes';

export async function getMyChats(): Promise<ChatPreview[]> {
  const res = await axiosInstance.get('/chats/my');
  return res.data;
}

export async function getChatMessages(chatId: number): Promise<ChatMessage[]> {
  const res = await axiosInstance.get(`/messages/${chatId.toString()}`);
  return res.data;
}
