import { z } from 'zod';

// cxeма для возвращения данных специалиста
export const specialistSchema = z.object({
  id: z.number(),
  userId: z.number(),
  age: z.string().nullable(),
  photo: z.string().nullable(),
  diplomaPhoto: z.string().nullable(),
  clescription: z.string().nullable(),
  education: z.string().nullable(),
  position: z.string().nullable(),
});
