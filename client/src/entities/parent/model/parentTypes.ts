import type { z } from 'zod';
import type { parentSchema, newParentSchema, childSchema } from './parentSchema';

// Один ребёнок
export type ChildType = z.infer<typeof childSchema>;

// Один родитель (с полной информацией)
export type ParentType = z.infer<typeof parentSchema>;

// Новый родитель (без id и прочего)
export type NewParentType = z.infer<typeof newParentSchema>;



// Состояние slice для родителя
export type ParentState = {
  parent: ParentType | null;         // Профиль текущего родителя (self, для личного кабинета)
  currentParent: ParentType | null;  // Профиль другого родителя (например, для просмотра няней)
  loading: boolean;                  // Индикатор загрузки
  error: string | null;              // Сообщение об ошибке
  parents: ParentType[];             // Все родители (например, для админки или общего списка)
};

