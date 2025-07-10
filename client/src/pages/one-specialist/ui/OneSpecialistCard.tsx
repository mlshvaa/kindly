import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getSpecialistById } from '@/entities/specialist/model/specialistThunks';
import { getAllServiceSpecialists } from '@/entities/service-specialist/model/serviceSpecialistThunks';
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';
import AddRequestSpecialist from '@/features/add-request-to-specialist/AddRequestSpecialist';
import Calendar from '@/widgets/calendar/Calendar';
import './OneSpecialistCard.css';

const BACKEND_URL = 'http://localhost:3000';

function OneSpecialistCard(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { specialistWithLinks, loading, error } = useAppSelector((state) => state.specialist);
  const { services: allServices } = useAppSelector((state) => state.serviceSpecialist);
  const role = useAppSelector((state) => state.user.user?.role);

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
    <div className="specialistCardContainer">
      <h2>{specialist.name || 'Имя не указано'}</h2>
      <img
        src={specialist.photo ? `${BACKEND_URL}/${specialist.photo}` : '/default-avatar.png'}
        alt={specialist.name || 'Фото специалиста'}
        className="specialistPhoto"
      />
      <div className="specialistDetails">
        <p>Возраст: {specialist.age}</p>
        <p>Опыт: {specialist.clescription}</p>
        <p>Образование: {specialist.education}</p>
        <p>Специализация: {specialist.position}</p>
      </div>

      {specialist.diplomaPhoto && specialist.diplomaPhoto.length > 0 && (
        <DiplomaGallery
          photos={specialist.diplomaPhoto}
          userId={specialist.userId}
          backendUrl={BACKEND_URL}
        />
      )}

      <div className="specialistServices">
        <h3>Услуги:</h3>
        <div className="serviceTabs">
          <button onClick={() => setActiveTab('myServices')}>Мои услуги</button>
          <button onClick={() => setActiveTab('allServices')}>Все услуги</button>
        </div>
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
      {role === 'parent' && (
        <button onClick={() => setShowAddRequest(true)} style={{ marginTop: 20 }}>
          Оказать услугу
        </button>
      )}

      {showAddRequest && (
        <div style={{ marginTop: 20 }}>
          <AddRequestSpecialist id={Number(id)} onClose={() => setShowAddRequest(false)} />
        </div>
      )}

      <div style={{ marginTop: '40px', width: '100%' }}>
        <Calendar specialistId={Number(specialist.id)} editable={false} />
      </div>
    </div>
  );
}

export default OneSpecialistCard;
