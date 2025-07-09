import { createContext, useContext, useRef } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import type { ChatContextT} from './chatTypes';


const ChatContext = createContext<ChatContextT | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  const connect = (chatId: number) => {
    const token = localStorage.getItem('accessToken'); // или получи из redux
    ws.current = new WebSocket(`ws://localhost:3000?token=${token}`);

    ws.current.onopen = () => {
      console.log('🔌 Подключено к WebSocket');
      ws.current?.send(JSON.stringify({ type: 'subscribe', chatId }));
    };

    ws.current.onmessage = (e) => {
      const action = JSON.parse(e.data);
      dispatch(action);
    };
  };

  const sendMessage = (payload: { chatId: number; text: string }) => {
    if (!ws.current) return;
    ws.current.send(JSON.stringify({ type: 'chat/sendMessage', payload }));
  };

  return (
    <ChatContext.Provider value={{ connect, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}


export function useChat(): ChatContextT {
  const context = useContext(ChatContext);
  if (!context) throw new Error('❗ useChat must be used within a ChatProvider');
  return context;
}
