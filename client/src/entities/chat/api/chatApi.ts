import axiosInstance from '@/shared/api/axiosInstance';
import type { ChatPreview, ChatMessage } from '../model/chatTypes';

export async function getMyChats(): Promise<ChatPreview[]> {
  const res = await axiosInstance.get<ChatPreview[]>('/chats/my');
  return res.data;
}

export async function getChatMessages(chatId: number): Promise<ChatMessage[]> {
  const res = await axiosInstance.get<ChatMessage[]>(`/messages/${chatId.toString()}`);
  return res.data;
}


export async function getChatById(chatId: number): Promise<ChatPreview> {
  const res = await axiosInstance.get<ChatPreview>(`/chats/${chatId.toString()}`);
  return res.data;
}

