import { z } from 'zod';

// cxeма для возвращения юзера
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

// схема для регистрации
export const signupSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(3),
  confirmPassword: z.string(),
  role: z.enum(['parent', 'specialist']),
});

// схема для входа (прописываем true и убираем все лишнее)
export const signinSchema = signupSchema.omit({ name: true, confirmPassword: true, role: true });

// для проверки авторизации напишем схему (то что нам возвращается)
export const authApiResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});
