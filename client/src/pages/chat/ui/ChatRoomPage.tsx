import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getChatById } from '@/entities/chat/api/chatApi';
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks';
import { addMessage, clearMessages } from '@/entities/chat/model/chatSlice';
import { useChat } from '@/entities/chat/model/chatContext';
import styles from './ChatRoomPage.module.css';

export default function ChatRoomPage(): React.JSX.Element {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const { connect, sendMessage } = useChat();
  const messages = useAppSelector((state) => state.chat.messages);
  const user = useAppSelector((state) => state.user.user);

  const [inputText, setInputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId || !user) return;

    const numericChatId = Number(chatId);
    if (Number.isNaN(numericChatId)) {
      setError('Некорректный ID чата');
      return;
    }

    setLoading(true);
    dispatch(clearMessages());

    getChatById(numericChatId)
      .then((chat) => {
        const isAllowed = user.id === chat.parent?.userId || user.id === chat.specialist?.userId;

        if (!isAllowed) {
          setError('У вас нет доступа к этому чату');
          setLoading(false);
          return;
        }

        connect(numericChatId);
        if (chat.messages) {
          chat.messages.forEach((msg) => dispatch(addMessage(msg)));
        }

        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error('Ошибка при загрузке чата:', err);
        setError('Чат не найден или доступ запрещён');
        setLoading(false);
      });
  }, [chatId, user]);

  const handleSend = (): void => {
    if (!chatId || !inputText.trim()) return;
    sendMessage({ chatId: Number(chatId), text: inputText });
    setInputText('');
  };

  if (loading) return <p>Загрузка чата...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.chatContainer}>
      <h2>Чат №{chatId}</h2>

      <div className={styles.messagesBox}>
        {messages.map((msg) => {
          const isCurrentUser = msg.sender.id === user?.id;
          const positionClass = isCurrentUser ? styles.right : styles.left;

          return (
            <div
              key={msg.id}
              className={`${styles.messageWrapper} ${positionClass} ${styles.centered}`}
            >
              <div className={styles.bubble}>
                <div className={styles.senderName}>
                  {msg.sender.role === 'parent' ? '👪 Родитель' : '👩‍🏫 Специалист'} —{' '}
                  {msg.sender.name}
                </div>
                <div>{msg.text}</div>
                <div className={styles.timestamp}>{new Date(msg.createdAt).toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.inputSection}>
        <input
          type="text"
          className={styles.inputField}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button onClick={handleSend} className={styles.sendButton}>
          Отправить
        </button>
      </div>
    </div>
  );
}
