import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getMyChats } from '@/entities/chat/model/chatThunks';
import { useNavigate } from 'react-router';
import styles from './MyChatsPage.module.css';

export default function MyChatsPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { myChats, loading, error } = useAppSelector((state) => state.chat);

  useEffect(() => {
    void dispatch(getMyChats());
  }, [dispatch]);

  const handleOpenChat = (chatId: number): void => {
    void navigate(`/chat/${chatId.toString()}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мои чаты</h2>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {myChats.length === 0 && !loading && <p>Чатов пока нет</p>}

      <ul className={styles.chatList}>
        {myChats.map((chat) => {
          const partner =
            chat.parent?.user.name ?? chat.specialist?.user.name ?? 'Неизвестный собеседник';
          const lastMessage =
            chat.messages?.[chat.messages.length - 1]?.text ?? 'Сообщений пока нет';

          return (
            <li
              key={chat.id}
              className={styles.chatItem}
              onClick={() => handleOpenChat(chat.id)}
            >
              <div className={styles.chatPartner}>Собеседник: {partner}</div>
              <div className={styles.lastMessage}>Последнее сообщение: {lastMessage}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
