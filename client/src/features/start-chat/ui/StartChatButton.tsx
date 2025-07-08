import React from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { startChat } from '@/entities/chat/model/chatThunks';
import { useNavigate } from 'react-router';

type StartChatButtonProps = {
  parentId: number;
};

export default function StartChatButton({ parentId }: StartChatButtonProps): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const specialist = useAppSelector((state) => state.specialist.currentSpecialist);

  if (!specialist) return null;

  const handleStart = async () => {
    try {
      const chat = await dispatch(
        startChat({ parentId, specialistId: specialist.id })
      ).unwrap();
      navigate(`/chat/${chat.id}`);
    } catch (err) {
      console.error('Не удалось создать чат:', err);
    }
  };

  return (
    <button onClick={handleStart}>
      💬 Начать чат
    </button>
  );
}
