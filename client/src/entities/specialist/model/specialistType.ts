import type { z } from 'zod';
import type { specialistSchema } from './specialistSchema';

export type SpecialistType = z.infer<typeof specialistSchema>;

export type CreateUpdateSpecialistType = Partial<Omit<SpecialistType, 'id' | 'userId'>>;

// тип для состояния данных педагога
export type SpecialistStateType = {
  specialist: SpecialistType | null;
  loading: boolean;
  error: string | null;
};

export type UpdateSpecialistData = Record<string, string | null | string[] | FormData>;

export type UpdateSpecialistPayload = {
  userId: number;
  data: UpdateSpecialistData | FormData;
};
