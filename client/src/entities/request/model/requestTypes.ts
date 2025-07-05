import type { z } from 'zod';
import {
  requestSchema,
  calendarSchema,
  specialistSchema,
} from './requestSchema';

// 🔹 Типы, выведенные из схем
export type SpecialistType = z.infer<typeof specialistSchema>;
export type CalendarType = z.infer<typeof calendarSchema>;
export type RequestType = z.infer<typeof requestSchema>;

// 🔹 Состояние slice заявок (для личного кабинета родителя)
export type RequestState = {
  myRequests: RequestType[];   // все заявки текущего родителя
  loading: boolean;
  error: string | null;
};
