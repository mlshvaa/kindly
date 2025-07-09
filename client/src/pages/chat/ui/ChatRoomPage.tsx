import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getChatMessages } from '@/entities/chat/api/chatApi';
import type { ChatMessage } from '@/entities/chat/model/chatTypes';
import { useChat } from '@/entities/chat/model/chatContext';
import { useAppSelector } from '@/shared/lib/hooks';
import styles from './ChatRoomPage.module.css'; // если используешь CSS-модули

export default function ChatRoomPage(): React.JSX.Element {
  const { chatId } = useParams<{ chatId: string }>();
  const user = useAppSelector((state) => state.user.user);
  const { connect, sendMessage } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!chatId || !user) return;

    connect(Number(chatId));
    getChatMessages(Number(chatId)).then(setMessages);
  }, [chatId, user]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    sendMessage({ chatId: Number(chatId), text: newMessage.trim() });
    setNewMessage('');
  };

  return (
    <div className={styles.container}>
      <h2>Чат #{chatId}</h2>

      <div className={styles.chatBox}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.senderRole === user?.role ? styles.ownMessage : styles.foreignMessage
            }`}
          >
            <div className={styles.meta}>
              <span className={styles.sender}>
                {msg.senderRole === user?.role
                  ? 'Вы'
                  : msg.senderRole === 'parent'
                  ? 'Родитель'
                  : 'Специалист'}
              </span>
              <span className={styles.time}>
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div className={styles.text}>{msg.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className={styles.form}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
