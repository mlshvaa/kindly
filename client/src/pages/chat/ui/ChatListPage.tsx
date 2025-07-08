import React, { useEffect, useState } from 'react';
import { getMyChats } from '@/entities/chat/api/chatApi';
import type { ChatPreview } from '@/entities/chat/model/chatTypes';
import { Link } from 'react-router';

export default function ChatListPage(): React.JSX.Element {
  const [chats, setChats] = useState<ChatPreview[]>([]);

  useEffect(() => {
    getMyChats().then(setChats);
  }, []);

  return (
    <div>
      <h2>Мои чаты</h2>
      <ul>
        {chats.map((chat) => {
          const other =
            chat.parent?.User?.name ?? chat.specialist?.User?.name ?? 'Без имени';
          return (
            <li key={chat.id}>
              <Link to={`/chat/${chat.id}`}>Чат с {other}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
