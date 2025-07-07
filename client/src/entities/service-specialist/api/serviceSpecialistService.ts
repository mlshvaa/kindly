import axiosInstance from '@/shared/api/axiosInstance';
import type {
  newServiceType,
  ServiceSpecialistBySpecialistIdType,
  serviceType,
} from '../model/serviceSpecialistType';
import type { AxiosInstance } from 'axios';
import {
  serviceSchema,
  serviceSpecialistBySpecialistIdSchema,
} from '../model/serviceSpecialistSchema';

class ServiceSpecialistService {
  constructor(private readonly client: AxiosInstance) {}

  // Получить связки специалист-услуга конкретного специалиста
  async getServicesSpecialistsBySpecialistId(
    specialistId: number,
  ): Promise<ServiceSpecialistBySpecialistIdType[]> {
    const response = await this.client.get(
      `/services-specialists/specialist/${specialistId.toString()}`,
    );
    return serviceSpecialistBySpecialistIdSchema.array().parse(response.data);
  }

  // Получить все услуги
  async getAll(): Promise<serviceType[]> {
    const response = await this.client.get('/services');
    return serviceSchema.array().parse(response.data);
  }

  // Назначить услугу специалисту
  async assignService(
    specialistId: number,
    serviceId: number,
  ): Promise<ServiceSpecialistBySpecialistIdType> {
    const response = await this.client.post('/services-specialists', { specialistId, serviceId });
    return serviceSpecialistBySpecialistIdSchema.parse(response.data);
  }

  // Удалить услугу вообще
  async removeService(serviceId: number): Promise<void> {
    await this.client.delete(`/services/${serviceId.toString()}`);
  }

  // Удалить услугу у специалиста
  async removeServiceSpecialist(specialistId: number, serviceId: number): Promise<void> {
    await this.client.delete('/services-specialists', {
      params: { specialistId, serviceId },
    });
  }

  // добавить новую услугу
  async addService(service: newServiceType): Promise<serviceType> {
    const response = await this.client.post('/services', service);
    return serviceSchema.parse(response.data);
  }
}
export default new ServiceSpecialistService(axiosInstance);
