import { z } from 'zod';

// Один ребёнок
export const childSchema = z.object({
  name: z.string(),
  age: z.string(),
});

// Короткая схема пользователя (id, name, email)
export const userShortSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// Схема родителя (в том числе для страницы специалиста)
export const parentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  phone: z.string().nullable(),
  adress: z.string().nullable(),
  children: z.array(childSchema).default([]),
  user: userShortSchema.optional(), // 👈 добавлено сюда
});

export const newParentSchema = parentSchema.omit({ id: true, userId: true });
