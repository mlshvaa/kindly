import { z } from 'zod';

const serviceSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// cxeма для возвращения данных специалиста
export const specialistSchema = z.object({
  id: z.number(),
  userId: z.number(),
  age: z.string().nullable(),
  photo: z.string().nullable(),
  diplomaPhoto: z.array(z.string()).nullable().default([]), // <--- Ключевое изменение: массив строк
  clescription: z.string().nullable(),
  education: z.string().nullable(),
  position: z.string().nullable(),
});

// cxeма для возвращения данных специалиста с его услугами
export const specialistWithLinksSchema = z.object({
  data: specialistSchema,
  links: z.array(serviceSchema),
});
