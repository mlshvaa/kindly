import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getForCurrentSpecialist } from '@/entities/request/model/requestThunks';

function RequestSpecialistList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { oneSpecialistRequests, loading, error } = useAppSelector((store) => store.request);
  //   const { specialist } = useAppSelector((store) => store.specialist);

  useEffect(() => {
    void dispatch(getForCurrentSpecialist());
  }, [dispatch]);

  const handleClick = (parentId: number): void => {
    void navigate(`/parents/${parentId.toString()}/details`); // Переход на страницу родителя по id
  };

  if (loading) return <p>Загрузка заявок...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!oneSpecialistRequests.length) return <p>Заявок пока нет.</p>;

  return (
    <div>
      <h3>Заявки родителей</h3>
      <ul>
        {oneSpecialistRequests.map((req) => (
          <li
            key={req.id}
            style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}
            onClick={() => handleClick(req.parentId)}
          >
            <p>
              <strong>Сообщение:</strong> {req.message ?? '—'}
            </p>
            <p>
              <strong>Статус:</strong> {req.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestSpecialistList;
