import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getFullParentById } from '@/entities/parent/model/parentThunks';
import {
  getRequestsFromParentToMe,
  updateRequestStatus,
} from '@/entities/request/model/requestThunks';

export default function ParentDetailsPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const parent = useAppSelector((state) => state.parent.currentParent);
  const loading = useAppSelector((state) => state.parent.loading);

  const requests = useAppSelector((state) => state.request.requestsFromParent);
  const loadingRequests = useAppSelector((state) => state.request.loadingFromParent);

  useEffect(() => {
    if (!id) return;
    void dispatch(getFullParentById(Number(id)));
    void dispatch(getRequestsFromParentToMe(Number(id)));
  }, [dispatch, id]);

  const handleStatusChange = async (requestId: number, status: 'одобрено' | 'отклонено') => {
    await dispatch(updateRequestStatus({ id: requestId, status }));
    void dispatch(getRequestsFromParentToMe(Number(id)));
  };

  if (loading || loadingRequests) return <p>Загрузка...</p>;
  if (!parent) return <p>Родитель не найден.</p>;

  return (
    <div>
      <h2>Информация о родителе</h2>
      <p>
        <strong>👤 Имя:</strong> {parent.user?.name || 'Не указано'}
      </p>
      <p>
        <strong>📞 Телефон:</strong> {parent.phone || 'Не указано'}
      </p>
      <p>
        <strong>🏠 Адрес:</strong> {parent.adress || 'Не указано'}
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
                <strong>Дата:</strong> {req.calendar.date}, {req.calendar.time}
              </p>
              <p>
                <strong>Сообщение:</strong> {req.message || '—'}
              </p>
              <p>
                <strong>Статус:</strong> {req.status}
              </p>
              {req.status === 'ожидание' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleStatusChange(req.id, 'одобрено')}>Одобрить</button>
                  <button onClick={() => handleStatusChange(req.id, 'отклонено')}>Отклонить</button>
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
