import type { z } from 'zod';
import type { signinSchema, signupSchema, userSchema } from './userSchema';

// cxeма для возвращения юзера
export type userType = z.infer<typeof userSchema>;
// схема для регистрации
export type signupType = z.infer<typeof signupSchema>;
// схема для входа (прописываем true и убираем все лишнее)
export type signinType = z.infer<typeof signinSchema>;
// пропишем состояние юзера
export type userStateType = {
  user: userType | null;
  loading: boolean;
  error: string | null;
};
