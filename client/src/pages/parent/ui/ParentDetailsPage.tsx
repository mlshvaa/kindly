import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getFullParentById } from '@/entities/parent/model/parentThunks';
import {
  getRequestsFromParentToMe,
  updateRequestStatus,
} from '@/entities/request/model/requestThunks';
import StartChatButton from '@/features/start-chat/ui/StartChatButton';
import './ParentDetailsPage.css';

export default function ParentDetailsPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  const parent = useAppSelector((state) => state.parent.currentParent);
  const loading = useAppSelector((state) => state.parent.loading);

  const specialist = useAppSelector((state) => state.specialist.specialist);

  const requests = useAppSelector((state) => state.request.requestsFromParent);
  const loadingRequests = useAppSelector((state) => state.request.loadingFromParent);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!id) return;
    void dispatch(getFullParentById(Number(id)));
    void dispatch(getRequestsFromParentToMe(Number(id)));
  }, [dispatch, id]);

  const handleStatusChange = (requestId: number, status: 'одобрено' | 'отклонено'): void => {
    void dispatch(updateRequestStatus({ id: requestId, status }));
    void dispatch(getRequestsFromParentToMe(Number(id)));
  };

  if (loading || loadingRequests) return <p>Загрузка...</p>;
  if (!parent) {
    return (
      <div>
        <p>Родитель не найден.</p>
        <button onClick={() => navigate(-1)}>Вернуться назад</button>
      </div>
    );
  }

  return (

    <div className="parentDetailsContainer">
      <h2>Информация о родителе</h2>
      <p>
        <strong>👤 Имя:</strong> {parent.user?.name ?? 'Не указано'}
      </p>
      <p>
        <strong>📞 Телефон:</strong> {parent.phone ?? 'Не указано'}
      </p>
      <p>
        <strong>🏠 Адрес:</strong> {parent.adress ?? 'Не указано'}
      </p>

      <h3>👧 Дети</h3>
      <ul>
        {parent.children.map((child, idx) => (
          <li key={idx}>
            {child.name}, возраст: {child.age}
          </li>
        ))}
      </ul>

      <h3>📬 Заявки от этого родителя</h3>
      {requests.length === 0 ? (
        <p>Заявок пока нет.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              <p>
                <strong>Педагог:</strong> {user?.name}
              </p>
              <p>
                <strong>Сообщение:</strong> {req.message ?? '—'}
              </p>
              <p>
                <strong>Статус:</strong> {req.status}
              </p>
              {req.status === 'ожидание' && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button onClick={() => handleStatusChange(req.id, 'одобрено')}>Одобрить</button>
                  <button onClick={() => handleStatusChange(req.id, 'отклонено')}>Отклонить</button>
                  <StartChatButton parentId={parent.id}  />
                </div>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
