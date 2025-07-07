import type { z } from 'zod';
import type {
  newServiceSchema,
  serviceSchema,
  serviceSpecialistBySpecialistIdSchema,
} from './serviceSpecialistSchema';

// тип для возвращения всех услуг конкретного специалиста
export type ServiceSpecialistBySpecialistIdType = z.infer<
  typeof serviceSpecialistBySpecialistIdSchema
>;

export type serviceType = z.infer<typeof serviceSchema>;

// схема для вновь созхданной услуги
export type newServiceType = z.infer<typeof newServiceSchema>;

// для состояния данных услуг конкретного специалиста
export type ServiceSpecialistStateType = {
  services: serviceType[];
  myServiceSpecialists: ServiceSpecialistBySpecialistIdType[];
  loading: boolean;
  error: string | null;
};
