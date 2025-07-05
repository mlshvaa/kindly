import { createAsyncThunk } from '@reduxjs/toolkit';
import parentService from '../api/parentService';
import type { NewParentType } from './parentTypes';

// Получить текущий профиль родителя
export const getMyParentProfile = createAsyncThunk('parent/getMyProfile', () =>
  parentService.getMyProfile(),
);

// Получить родителя по ID (для отображения на публичной странице)
export const getParentById = createAsyncThunk('parent/getById', (id: number) =>
  parentService.getParentById(id),
);

// Создать профиль родителя
export const createParentProfile = createAsyncThunk('parent/create', (data: NewParentType) =>
  parentService.createParent(data),
);

// Обновить профиль родителя
export const updateParentProfile = createAsyncThunk(
  'parent/update',
  async ({ id, data }: { id: number; data: NewParentType }) => {
    const updated = await parentService.updateParent(id, data);
    return updated;
  },
);

// Удалить профиль родителя
export const deleteParentProfile = createAsyncThunk('parent/delete', async (id: number) => {
  await parentService.deleteParent(id);
  return id;
});

// Получить всех родителей (например, для админа)
export const getAllParents = createAsyncThunk(
  'parent/getAll',
  () => parentService.getAllParents(),
);
