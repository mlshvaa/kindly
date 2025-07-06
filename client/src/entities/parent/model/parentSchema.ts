import { z } from 'zod';

export const childSchema = z.object({
  name: z.string(),
  age: z.string(),
});

export const parentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  phone: z.string().nullable(),
  adress: z.string().nullable(),
  children: z.array(childSchema).default([]),
});

export const newParentSchema = parentSchema.omit({ id: true, userId: true });
