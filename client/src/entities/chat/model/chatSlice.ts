import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChatMessage, ChatPreview, ChatState } from './chatTypes';
import { getMyChats, startChatThunk } from './chatThunks';

const initialState: ChatState = {
  messages: [],
  activeChat: null,
  myChats: [], // список всех чатов пользователя
  error: null,
  loading: false,
};


const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Добавляем новое сообщение (из WebSocket)
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
     // Сброс сообщений (например, при смене чата)
    clearMessages(state) {
      state.messages = [];
    },
    // Установка активного чата вручную
    setActiveChat(state, action: PayloadAction<ChatPreview>) {
      state.activeChat = action.payload;
      state.messages = action.payload.messages ?? [];
    },
  },
  extraReducers: (builder) => {
    builder
    // старт нового чата
      .addCase(startChatThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startChatThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.activeChat = action.payload;
      })
      .addCase(startChatThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Не удалось создать чат';
      })
      // получение всех чатов
    .addCase(getMyChats.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getMyChats.fulfilled, (state, action) => {
      state.loading = false;
      state.myChats = action.payload;
    })
    .addCase(getMyChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Не удалось получить чаты';
    });
  },
});

export const { addMessage, clearMessages, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;