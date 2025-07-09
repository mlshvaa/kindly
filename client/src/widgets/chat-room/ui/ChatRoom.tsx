import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/shared/lib/hooks';

type Props = {
  chatId: number;
};

export default function ChatRoom({ chatId }: Props): React.JSX.Element {
  const accessToken = useAppSelector((state) => state.user.user?.accessToken);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const socket = new WebSocket(`ws://localhost:3001?token=${accessToken}`);
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'subscribe', chatId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.text) {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => socket.close();
  }, [accessToken, chatId]);

  const handleSend = () => {
    if (socketRef.current && text.trim()) {
      socketRef.current.send(JSON.stringify({ chatId, text }));
      setText('');
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 8 }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.senderRole}:</strong> {msg.text}</p>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Введите сообщение..." />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
}
