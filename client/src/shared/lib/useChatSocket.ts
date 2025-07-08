import { useEffect, useRef } from 'react';

export function useChatSocket(accessToken: string, onMessage: (msg: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const socket = new WebSocket(`ws://localhost:3000?token=${accessToken}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('🟢 WS соединение установлено');
      // можно сразу подписаться на чат:
      // socket.send(JSON.stringify({ type: 'subscribe', chatId: 1 }));
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      onMessage(msg);
    };

    socket.onerror = (error) => {
      console.error('❌ WS ошибка:', error);
    };

    socket.onclose = () => {
      console.log('🔴 WS соединение закрыто');
    };

    return () => {
      socket.close();
    };
  }, [accessToken, onMessage]);

  return socketRef;
}
