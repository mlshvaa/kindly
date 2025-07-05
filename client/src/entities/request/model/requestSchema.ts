import { z } from 'zod';

// 🔹 Специалист, у которого забронирован слот
export const specialistSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
});

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
  calendarId: z.number(),
  parentId: z.number(),
  message: z.string().nullable(),
  status: z.enum(['ожидание', 'одобрено', 'отклонено']),
  createdAt: z.string(),
  updatedAt: z.string(),
  calendar: calendarSchema,
});


