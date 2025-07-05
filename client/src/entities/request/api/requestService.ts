import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import { requestSchema } from '../model/requestSchema';
import type { RequestType } from '../model/requestTypes';

class RequestService {
  constructor(private readonly client: AxiosInstance) {}

  // Получить заявки текущего родителя
  async getMyRequests(): Promise<RequestType[]> {
    const res = await this.client.get('/requests/parent');
    return requestSchema.array().parse(res.data); // Валидация схемой
  }
}

export default new RequestService(axiosInstance);
