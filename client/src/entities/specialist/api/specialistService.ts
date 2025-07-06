import axiosInstance from '@/shared/api/axiosInstance';
import type { AxiosInstance } from 'axios';
import type { SpecialistType, UpdateSpecialistData } from '../model/specialistType';
import { specialistSchema } from '../model/specialistSchema';

class SpecialistService {
  constructor(private readonly client: AxiosInstance) {}

  // Получить данные педагога текущего пользователя
  async getAllSpecialistUser(id: number): Promise<SpecialistType> {
    const response = await this.client.get(`/specialist/${id.toString()}`);
    return specialistSchema.parse(response.data);
  }

  // Обновить данные педагога текущего пользователя
  async updateSpecialistUser(id: number, data: UpdateSpecialistData): Promise<SpecialistType> {
    const response = await this.client.put(`/specialist/${id.toString()}`, data);
    return specialistSchema.parse(response.data);
  }

  // Загрузка одного файла с полем 'photo'
  async updateSpecialistPhoto(id: number, data: FormData): Promise<SpecialistType> {
    const response = await this.client.put(`/specialist/photo/${id.toString()}`, data);
    return specialistSchema.parse(response.data);
  }

  // Загрузка нескольких дипломов
  async updateSpecialistDiplomas(id: number, data: FormData): Promise<SpecialistType> {
    const response = await this.client.put(`/specialist/diplomaPhotos/${id.toString()}`, data);
    return specialistSchema.parse(response.data);
  }

  // Удаление диплома
  async deleteSpecialistDiploma(id: number, photoPath: string): Promise<SpecialistType> {
    const response = await this.client.delete(`/specialist/diplomaPhoto/${id.toString()}`, {
      data: { photoPath },
    });
    return specialistSchema.parse(response.data);
  }
}

export default new SpecialistService(axiosInstance);
