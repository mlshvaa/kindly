import type { z } from 'zod';
import type { specialistSchema, specialistWithLinksSchema } from './specialistSchema';

export type SpecialistType = z.infer<typeof specialistSchema>;

export type CreateUpdateSpecialistType = Partial<Omit<SpecialistType, 'id' | 'userId'>>;

// тип для состояния данных педагога
export type SpecialistStateType = {

  specialist: SpecialistType | null;
  specialistWithLinks: SpecialistWithLinksType | null;
  specialists: SpecialistType[];
  loading: boolean;
  error: string | null;
};

export type UpdateSpecialistData = Record<string, string | null | string[] | FormData>;

export type UpdateSpecialistPayload = {
  userId: number;
  data: UpdateSpecialistData | FormData;
};

// тип для возвращения данных специалиста с его услугами
export type SpecialistWithLinksType = z.infer<typeof specialistWithLinksSchema>;
