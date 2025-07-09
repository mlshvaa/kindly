import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import { requestSchema } from '../model/requestSchema';
import type { NewRequestType, RequestType } from '../model/requestTypes';

class RequestService {
  constructor(private readonly client: AxiosInstance) {}

  // Получить заявки текущего родителя
  async getMyRequests(): Promise<RequestType[]> {
    const res = await this.client.get('/requests/parent');
    return requestSchema.array().parse(res.data); // Валидация схемой
  }

  // Получить заявки от конкретного родителя к текущему специалисту
  async getRequestsFromParentToMe(parentId: number): Promise<RequestType[]> {
    const res = await this.client.get(`/parents/${parentId.toString()}/full`);
    return res.data.requests; // можно добавить Zod-схему при необходимости
  }

  // Обновить статус заявки
  async updateRequestStatus(id: number, status: 'одобрено' | 'отклонено'): Promise<void> {
    await this.client.patch(`/requests/${id.toString()}/status`, { status });
  }

  // Создать заявку
  async createRequest(data: NewRequestType): Promise<RequestType> {
    const res = await this.client.post('/requests', data);
    return requestSchema.parse(res.data);
  }
}

export default new RequestService(axiosInstance);
