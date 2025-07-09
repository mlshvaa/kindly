import type { z } from 'zod';
import type {
  requestSchema,
  calendarSchema,
  specialistSchema,
  newRequestSchema,
} from './requestSchema';

// 🔹 Типы, выведенные из схем
export type SpecialistType = z.infer<typeof specialistSchema>;
export type CalendarType = z.infer<typeof calendarSchema>;
export type RequestType = z.infer<typeof requestSchema>;
// тип для новой заявки
export type NewRequestType = z.infer<typeof newRequestSchema>;

// 🔹 Состояние slice заявок (для личного кабинета родителя)
export type RequestState = {
  myRequests: RequestType[]; // все заявки текущего родителя
  loading: boolean;
  error: string | null;
  requestsFromParent: RequestType[];
  loadingFromParent: boolean;
  errorFromParent: string | null;
};
