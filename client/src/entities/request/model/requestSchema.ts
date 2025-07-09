import { z } from 'zod';

// 🔹 Специалист, у которого забронирован слот
export const specialistSchema = z.object({
  user: z.object({
    name: z.string(),
  }),
});

//

// 🔹 Календарный слот (например, время, дата, специалист)
export const calendarSchema = z.object({
  id: z.number(),
  date: z.string(), // формат ISO
  time: z.string(), // строка вида "14:00–16:00"
  specialist: specialistSchema,
});

// 🔹 Заявка (request)
export const requestSchema = z.object({
  id: z.number(),
  // calendarId: z.number(),
  specialistId: z.number(),
  parentId: z.number(),
  message: z.string().nullable(),
  status: z.enum(['ожидание', 'одобрено', 'отклонено']),
  createdAt: z.string(),
  updatedAt: z.string(),
  specialist: specialistSchema,
  // calendar: calendarSchema,
});

// схема для новой заявки
export const newRequestSchema = z.object({
  specialistId: z.number(),
  message: z.string().nullable(),
  status: z.enum(['ожидание', 'одобрено', 'отклонено']),
});
