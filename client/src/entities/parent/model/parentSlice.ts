import { createSlice } from '@reduxjs/toolkit';
import type { ChildType, ParentState } from './parentTypes';
import {
  getMyParentProfile,
  getParentById,
  getAllParents,
  createParentProfile,
  updateParentProfile,
  deleteParentProfile,
} from './parentThunks';

const initialState: ParentState = {
  parent: null,
  currentParent: null,
  parents: [],
  loading: false,
  error: null,
};

export const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    updateChildrenLocally: (state, action: { payload: ChildType[] }) => {
      if (state.parent) {
        state.parent.children = action.payload;
      }
    },
    updateContactInfoLocally: (state, action: { payload: { phone: string; adress: string } }) => {
      if (state.parent) {
        state.parent.phone = action.payload.phone;
        state.parent.adress = action.payload.adress;
      }
    },
  },
  extraReducers: (builder) => {
    // Получение профиля текущего родителя
    builder.addCase(getMyParentProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMyParentProfile.fulfilled, (state, action) => {
      state.parent = action.payload;
      state.loading = false;
      // state.error = null;
    });
    builder.addCase(getMyParentProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при получении своего профиля';
    });

    // Получение родителя по ID (для нянь)
    builder.addCase(getParentById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getParentById.fulfilled, (state, action) => {
      state.currentParent = action.payload;
      state.loading = false;
    });
    builder.addCase(getParentById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при получении родителя по ID';
    });

    // Получение всех родителей (например, для админа)
    builder.addCase(getAllParents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllParents.fulfilled, (state, action) => {
      state.parents = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllParents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при получении всех родителей';
    });

    // Создание профиля родителя
    builder.addCase(createParentProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createParentProfile.fulfilled, (state, action) => {
      state.parent = action.payload;
      state.loading = false;
    });
    builder.addCase(createParentProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при создании профиля родителя';
    });

    // Обновление профиля
    builder.addCase(updateParentProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateParentProfile.fulfilled, (state, action) => {
      state.loading = false;
      // if (state.parent) {
      //   state.parent.phone = action.payload.phone;
      //   state.parent.adress = action.payload.adress;
      // }
    });
    builder.addCase(updateParentProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при обновлении профиля родителя';
    });

    // Удаление профиля
    builder.addCase(deleteParentProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteParentProfile.fulfilled, (state) => {
      state.parent = null;
      state.loading = false;
    });
    builder.addCase(deleteParentProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при удалении профиля родителя';
    });
  },
});

export const { updateChildrenLocally, updateContactInfoLocally } = parentSlice.actions;

export default parentSlice.reducer;
