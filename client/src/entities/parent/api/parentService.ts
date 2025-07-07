import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import type { ChildType, NewParentType, ParentType } from '../model/parentTypes';
import { parentSchema } from '../model/parentSchema';
import { RequestType } from '@/entities/request/model/requestTypes';

class ParentService {
  constructor(private readonly client: AxiosInstance) {}

  async getMyProfile(): Promise<ParentType> {
    const res = await this.client.get('/parents/me');
    return parentSchema.parse(res.data);
  }

  async getParentById(id: number): Promise<ParentType> {
    const res = await this.client.get(`/parents/${id}`);
    return parentSchema.parse(res.data);
  }

  async createParent(data: NewParentType): Promise<ParentType> {
    const res = await this.client.post('/parents', data);
    return parentSchema.parse(res.data);
  }

  async updateParent(id: number, data: NewParentType): Promise<ParentType> {
    const res = await this.client.put(`/parents/${id}`, data);
    return parentSchema.parse(res.data);
  }

  async deleteParent(id: number): Promise<void> {
    await this.client.delete(`/parents/${id}`);
  }

  async getAllParents(): Promise<ParentType[]> {
    const res = await this.client.get('/parents');
    return parentSchema.array().parse(res.data);
  }

  async addChild(parentId: number, child: ChildType): Promise<ParentType> {
    const res = await this.client.post(`/parents/${parentId}/children`, child);
    return parentSchema.parse(res.data);
  }

  async updateChild(parentId: number, index: number, child: ChildType): Promise<ParentType> {
    const res = await this.client.put(`/parents/${parentId}/children/${index}`, child);
    return parentSchema.parse(res.data);
  }

  async deleteChild(parentId: number, index: number): Promise<ParentType> {
    const res = await this.client.delete(`/parents/${parentId}/children/${index}`);
    return parentSchema.parse(res.data);
  }

  async getFullParentById(id: number): Promise<{ parent: ParentType; requests: RequestType[] }> {
    const res = await this.client.get(`/parents/${id}/full`);
    return res.data;
  }
}

export default new ParentService(axiosInstance);
