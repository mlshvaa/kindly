import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/entities/user/model/userSlice';
import parentReducer from '@/entities/parent/model/parentSlice';
import requestReducer from '@/entities/request/model/requestSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    parent: parentReducer,
    request: requestReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
