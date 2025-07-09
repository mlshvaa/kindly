import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getSpecialistById } from '@/entities/specialist/model/specialistThunks';
import { getAllServiceSpecialists } from '@/entities/service-specialist/model/serviceSpecialistThunks';
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';
import AddRequestSpecialist from '@/features/add-request-to-specialist/AddRequestSpecialist';

const BACKEND_URL = 'http://localhost:3000';

function OneSpecialistCard(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { specialistWithLinks, loading, error } = useAppSelector((state) => state.specialist);
  const { services: allServices } = useAppSelector((state) => state.serviceSpecialist);

  const [activeTab, setActiveTab] = useState<'myServices' | 'allServices'>('myServices');

  // Состояние для управления видимостью формы
  const [showAddRequest, setShowAddRequest] = useState(false);

  useEffect(() => {
    if (id) {
      void dispatch(getSpecialistById(Number(id)));
      void dispatch(getAllServiceSpecialists());
    }
  }, [dispatch, id]);

  if (loading) return <div>Загрузка специалиста...</div>;
  if (error) return <div>Ошибка загрузки: {error}</div>;
  if (!specialistWithLinks) return <div>Специалист не найден.</div>;

  const { data: specialist, links: specialistServices } = specialistWithLinks;

  return (
    <div>
      <h2>{specialist.name || 'Имя не указано'}</h2>
      <img
        src={specialist.photo ? `${BACKEND_URL}/${specialist.photo}` : '/default-avatar.png'}
        alt={specialist.name || 'Фото специалиста'}
        style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
      />
      <div>Возраст: {specialist.age}</div>
      <div>Опыт работы: {specialist.clescription}</div>
      <div>Образование: {specialist.education}</div>
      <div>Специализация: {specialist.position}</div>
      {specialist.diplomaPhoto && specialist.diplomaPhoto.length > 0 && (
        <DiplomaGallery
          photos={specialist.diplomaPhoto}
          userId={specialist.userId}
          backendUrl={BACKEND_URL}
        />
      )}

      <div style={{ marginTop: 20 }}>
        Услуги:
        {activeTab === 'myServices' && (
          <ul>
            {specialistServices.length ? (
              specialistServices.map((service) => (
                <li key={service.id}>
                  {service.name} — {service.price} ₽
                </li>
              ))
            ) : (
              <li>Услуги не найдены</li>
            )}
          </ul>
        )}
        {activeTab === 'allServices' && (
          <ul>
            {allServices.length ? (
              allServices.map((service) => (
                <li key={service.id}>
                  {service.name} — {service.price} ₽
                </li>
              ))
            ) : (
              <li>Услуги не найдены</li>
            )}
          </ul>
        )}
      </div>

      {/* Кнопка для показа формы */}
      <button onClick={() => setShowAddRequest(true)} style={{ marginTop: 20 }}>
        Оказать услугу
      </button>

      {/* Условный рендеринг формы */}
      {showAddRequest && (
        <div style={{ marginTop: 20 }}>
          <AddRequestSpecialist onClose={() => setShowAddRequest(false)} />
        </div>
      )}
    </div>
  );
}

export default OneSpecialistCard;
