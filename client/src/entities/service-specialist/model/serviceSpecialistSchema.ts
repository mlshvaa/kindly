import { z } from 'zod';

// схема для возвращения всех услуг конкретного специалиста
export const serviceSpecialistBySpecialistIdSchema = z.object({
  specialistId: z.number(),
  serviceId: z.number(),
  service: z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
  }),
});

// схема для возвращения всех услуг
export const serviceSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
});

// схема для вновь созхданной услуги
export const newServiceSchema = serviceSchema.omit({ id: true });
