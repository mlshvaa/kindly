import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChatMessage } from './chatTypes';

type ChatState = {
  messages: ChatMessage[];
};

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
  },
});

export default chatSlice.reducer;
