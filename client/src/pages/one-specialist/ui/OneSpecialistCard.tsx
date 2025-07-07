import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getSpecialistById } from '@/entities/specialist/model/specialistThunks';
import {
  getServiceSpecialistsBySpecialistId,
  getAllServiceSpecialists,
} from '@/entities/service-specialist/model/serviceSpecialistThunks';
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';

const BACKEND_URL = 'http://localhost:3000';

function OneSpecialistCard(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { specialistId } = useParams<{ specialistId: string }>();
  const { user } = useAppSelector((state) => state.user);

  const specialistWithLinks = useAppSelector((state) => state.specialist.specialistWithLinks);
  const { myServiceSpecialists, services } = useAppSelector((state) => state.serviceSpecialist);

  const [activeTab, setActiveTab] = useState<'myServices' | 'allServices'>('myServices');

  useEffect(() => {
    if (specialistId) {
      void dispatch(getSpecialistById(Number(specialistId)));
      void dispatch(getServiceSpecialistsBySpecialistId(Number(specialistId)));
      void dispatch(getAllServiceSpecialists());
    }
  }, [dispatch, specialistId]);

  if (!specialistWithLinks) return <div>Загрузка специалиста...</div>;

  const { data: specialist, links: specialistServices } = specialistWithLinks;

  // Ищем пользователя, связанного с этим специалистом
  const specialistUser = users?.find((u) => u.id === specialist.userId);
  const name = specialistUser?.name ?? 'Имя не найдено';

  return (
    <div>
      <h2>{name}</h2>
      <img
        src={specialist.photo ? `${BACKEND_URL}/${specialist.photo}` : '/default-avatar.png'}
        alt={specialist.photo}
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
        <button
          onClick={() => setActiveTab('myServices')}
          style={{ fontWeight: activeTab === 'myServices' ? 'bold' : 'normal', marginRight: 10 }}
        >
          Услуги специалиста
        </button>
        <button
          onClick={() => setActiveTab('allServices')}
          style={{ fontWeight: activeTab === 'allServices' ? 'bold' : 'normal' }}
        >
          Все услуги
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {activeTab === 'myServices' && (
          <ul>
            {myServiceSpecialists.length ? (
              myServiceSpecialists.map((serviceSpecialist) => (
                <li key={serviceSpecialist.serviceId}>
                  {serviceSpecialist.service.name} — {serviceSpecialist.service.price} ₽
                </li>
              ))
            ) : (
              <li>Услуги не найдены</li>
            )}
          </ul>
        )}

        {activeTab === 'allServices' && (
          <ul>
            {services.length ? (
              services.map((service) => (
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
    </div>
  );
}

export default OneSpecialistCard;
