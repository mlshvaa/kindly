import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/entities/user/model/userSlice';
import specialistReducer from '@/entities/specialist/model/specialistSlice';
import parentReducer from '@/entities/parent/model/parentSlice';
import requestReducer from '@/entities/request/model/requestSlice';
import serviceSpecialistReducer from '@/entities/service-specialist/model/serviceSpecialistSlice';
import chatReducer from '@/entities/chat/model/chatSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    specialist: specialistReducer,
    parent: parentReducer,
    request: requestReducer,
    serviceSpecialist: serviceSpecialistReducer,
    chat: chatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
