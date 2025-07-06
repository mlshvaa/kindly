import { z } from 'zod';

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
