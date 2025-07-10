import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getMyChats } from '@/entities/chat/model/chatThunks';
import { useNavigate } from 'react-router';

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
    <div style={{ padding: '1rem' }}>
      <h2>Мои чаты</h2>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {myChats.length === 0 && !loading && <p>Чатов пока нет</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {myChats.map((chat) => {
          const partner = String(
            chat.parent?.user.name ?? chat.specialist?.user.name ?? 'Неизвестный собеседник',
          );

          const lastMessage =
            chat.messages && chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1].text
              : 'Сообщений пока нет';

          return (
            <li
              key={chat.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleOpenChat(chat.id)}
            >
              <strong>Собеседник:</strong> {partner} <br />
              <strong>Последнее сообщение:</strong> {lastMessage}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
