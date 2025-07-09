import React, { createContext, useContext, useRef } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import type { ChatContextT } from './chatTypes';
import { addMessage } from './chatSlice';
import { ChatMessage } from './chatTypes';

const ChatContext = createContext<ChatContextT | null>(null);

export function ChatProvider({ children }: { children: React.JSX.Element }): React.JSX.Element {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  const connect = (chatId: number): void => {
    // const token = localStorage.getItem('accessToken'); // или получи из redux
    // if (!token) {
    //   console.error('Нет токена для WebSocket-подключения');
    //   return;
    // }
    // ws.current = new WebSocket(`ws://localhost:3000?token=${token}`);
    ws.current = new WebSocket('ws://localhost:3000');

    ws.current.onopen = () => {
      console.log('Подключено к WebSocket');
      ws.current?.send(JSON.stringify({ type: 'subscribe', chatId }));
    };
    

    ws.current.onmessage = (e: MessageEvent<string>) => {
      // dispatch(JSON.parse(e.data));
      const message = JSON.parse(e.data) as {type: string; payload: ChatMessage};
      console.log('Пришло сообщение по WebSocket:', message);

      if (message.type === 'chat/newMessage') {
        dispatch(addMessage(message.payload));
      }
    };
  };

  const sendMessage = (payload: { chatId: number; text: string }): void => {
    if (!ws.current) return;
    ws.current.send(JSON.stringify({ type: 'chat/sendMessage', payload }));
  };

  return <ChatContext value={{ connect, sendMessage }}>{children}</ChatContext>;
}

export function useChat(): ChatContextT {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
}
