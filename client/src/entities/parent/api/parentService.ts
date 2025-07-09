import type { AxiosInstance } from 'axios';
import axiosInstance from '@/shared/api/axiosInstance';
import type { ChildType, NewParentType, ParentType } from '../model/parentTypes';
import { parentSchema } from '../model/parentSchema';
import type { RequestType } from '@/entities/request/model/requestTypes';

class ParentService {
  constructor(private readonly client: AxiosInstance) {}

  async getMyProfile(): Promise<ParentType> {
    const res = await this.client.get('/parents/me');
    return parentSchema.parse(res.data);
  }

  async getParentById(id: number): Promise<ParentType> {
    const res = await this.client.get(`/parents/${id.toString()}`);
    return parentSchema.parse(res.data);
  }

  async createParent(data: NewParentType): Promise<ParentType> {
    const res = await this.client.post('/parents', data);
    return parentSchema.parse(res.data);
  }

  async updateParent(id: number, data: NewParentType): Promise<ParentType> {
    const res = await this.client.put(`/parents/${id.toString()}`, data);
    return parentSchema.parse(res.data);
  }

  async deleteParent(id: number): Promise<void> {
    await this.client.delete(`/parents/${id.toString()}`);
  }

  async getAllParents(): Promise<ParentType[]> {
    const res = await this.client.get('/parents');
    return parentSchema.array().parse(res.data);
  }

  async addChild(parentId: number, child: ChildType): Promise<ParentType> {
    const res = await this.client.post(`/parents/${parentId.toString()}/children`, child);
    return parentSchema.parse(res.data);
  }

  async updateChild(parentId: number, index: number, child: ChildType): Promise<ParentType> {
    const res = await this.client.put(
      `/parents/${parentId.toString()}/children/${index.toString()}`,
      child,
    );
    return parentSchema.parse(res.data);
  }

  async deleteChild(parentId: number, index: number): Promise<ParentType> {
    const res = await this.client.delete(
      `/parents/${parentId.toString()}/children/${index.toString()}`,
    );
    return parentSchema.parse(res.data);
  }

  async getFullParentById(id: number): Promise<{ parent: ParentType; requests: RequestType[] }> {
    const res = await this.client.get(`/parents/${id.toString()}/full`);
    return res.data;
  }
}

export default new ParentService(axiosInstance);
