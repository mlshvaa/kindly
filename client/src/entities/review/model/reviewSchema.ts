import { z } from 'zod';

// Схема пользователя
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  isApproved: z.boolean().nullable(),
  role: z.string(),
});

// Один ребёнок
export const childSchema = z.object({
  name: z.string(),
  age: z.string(),
});

// Схема родителя (в том числе для страницы специалиста)
export const parentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  phone: z.string().nullable(),
  adress: z.string().nullable(),
  children: z.array(childSchema).default([]),
  user: userSchema.optional(), // 👈 добавлено сюда
});

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
  user: userSchema.optional(),
});

// cxeма для возвращения данных отзыва
export const reviewSchema = z.object({
  id: z.number(),
  specialistId: z.number(),
  parentId: z.number(),
  text: z.string(),
  rating: z.number().min(1).max(5),
  specialist: specialistSchema,
  parent: parentSchema,
});
