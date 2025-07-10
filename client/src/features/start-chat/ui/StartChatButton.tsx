import { useAppDispatch } from '@/shared/lib/hooks';
import { startChatThunk } from '@/entities/chat/model/chatThunks';
import { useNavigate } from 'react-router';

export default function StartChatButton({
  parentId
}: {
  parentId: number;
  
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStartChat = async (): Promise<void> => {
    const resultAction = await dispatch(startChatThunk({ parentId}));

    if (startChatThunk.fulfilled.match(resultAction)) {
      void navigate(`/chat/${resultAction.payload.id.toString()}`);
    } else {
      console.error('Ошибка при создании чата:', resultAction.payload);
    }
  };

  return <button onClick={handleStartChat}>💬 Начать чат</button>;
}
