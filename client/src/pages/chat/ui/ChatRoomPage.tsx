import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getChatMessages } from '@/entities/chat/api/chatApi';
import { useChat } from '@/entities/chat/model/chatContext';
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks';
import { addMessage } from '@/entities/chat/model/chatSlice';
import type { ChatMessage } from '@/entities/chat/model/chatTypes';

export default function ChatRoomPage(): React.JSX.Element {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const { connect, sendMessage } = useChat();
  const messages = useAppSelector((state) => state.chat.messages);

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    console.log(chatId);
    if (!chatId) return;

    const numericChatId = Number(chatId);
    connect(numericChatId);

    // Получаем старые сообщения
    void getChatMessages(numericChatId).then((msgs) => {
      msgs.forEach((msg: ChatMessage) => dispatch(addMessage(msg)));
    });
  }, [chatId, connect, dispatch]);

  const handleSend = (): void => {
    if (!chatId || !inputText.trim()) return;
    sendMessage({ chatId: Number(chatId), text: inputText });
    setInputText('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Чат №{chatId}</h2>

      <div style={{ border: '1px solid #ccc', padding: '1rem', height: 300, overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>
              {msg.sender.role === 'parent' ? '👩 Родитель -' : '👩‍🏫 Специалист -'} {msg.sender.name}
              :
            </strong>{' '}
            {msg.text}
            <br />
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </p>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button onClick={handleSend} style={{ marginLeft: '1rem' }}>
          Отправить
        </button>
      </div>
    </div>
  );
}
