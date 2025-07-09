import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getMyRequests } from '@/entities/request/model/requestThunks';

export default function MyRequests(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { myRequests, loading, error } = useAppSelector((state) => state.request);
  // console.log(myRequests);

  useEffect(() => {
    void dispatch(getMyRequests());
  }, [dispatch]);

  if (loading) return <p>Загрузка заявок...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  if (myRequests.length === 0) {
    return <p>Вы пока не подали ни одной заявки.</p>;
  }

  return (
    <div>
      <h3>Мои заявки</h3>
      <ul>
        {myRequests.map((req) => (
          <li key={req.id}>
            <p>
              <strong>Специалист:</strong> {req.specialist.user.name || 'не указано'}
            </p>
            <p>
              <strong>Сообщение:</strong> {req.message ?? '—'}
            </p>
            <p>
              <strong>Статус:</strong> {req.status}
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
