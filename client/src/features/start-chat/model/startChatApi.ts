import axiosInstance from '@/shared/api/axiosInstance';

export const startChat = async (parentId: number, specialistId: number) => {
  const res = await axiosInstance.post('/chats', { parentId, specialistId });
  return res.data; // возвращает созданный или найденный чат
};
