import { createAsyncThunk } from '@reduxjs/toolkit';
import serviceSpecialistService from '../api/serviceSpecialistService';
import type { newServiceType } from './serviceSpecialistType';

// Получить связки специалист-услуга конкретного специалиста
export const getServiceSpecialistsBySpecialistId = createAsyncThunk(
  'serviceSpecialist/getServiceSpecialistsBySpecialistId',
  async (id: number) => await serviceSpecialistService.getServicesSpecialistsBySpecialistId(id),
);

// Получить все  услуги
export const getAllServiceSpecialists = createAsyncThunk(
  'service/getAll',
  async () => await serviceSpecialistService.getAll(),
);

// Назначить услугу специалисту
export const assignService = createAsyncThunk(
  'serviceSpecialist/assignService',
  async ({ specialistId, serviceId }: { specialistId: number; serviceId: number }) =>
    await serviceSpecialistService.assignService(specialistId, serviceId),
);

// Удалить услугу вообще
export const removeService = createAsyncThunk(
  'service/removeService',
  async (serviceId: number) => {
    await serviceSpecialistService.removeService(serviceId);
    return serviceId;
  },
);

// Удалить услугу у специалиста
export const removeServiceSpecialist = createAsyncThunk(
  'serviceSpecialist/removeService',
  async ({ specialistId, serviceId }: { specialistId: number; serviceId: number }) => {
    await serviceSpecialistService.removeServiceSpecialist(specialistId, serviceId);
    return serviceId;
  },
);

// добавить новую услугу
export const addService = createAsyncThunk(
  'service/addService',
  async (service: newServiceType) => await serviceSpecialistService.addService(service),
);
