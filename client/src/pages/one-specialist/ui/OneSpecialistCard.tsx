import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'; // Используем react-router-dom вместо react-router
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getSpecialistById } from '@/entities/specialist/model/specialistThunks';
import { getAllServiceSpecialists } from '@/entities/service-specialist/model/serviceSpecialistThunks'; // Оставили только этот
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';

const BACKEND_URL = 'http://localhost:3000';

function OneSpecialistCard(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  console.log(useParams(), '**********');

  // Получаем данные специалиста с услугами и состояние загрузки/ошибки
  const { specialistWithLinks, loading, error } = useAppSelector((state) => state.specialist);
  // Получаем все услуги (для вкладки "Все услуги")
  const { services: allServices } = useAppSelector((state) => state.serviceSpecialist);

  const [activeTab, setActiveTab] = useState<'myServices' | 'allServices'>('myServices');

  useEffect(() => {
    if (id) {
      void dispatch(getSpecialistById(Number(id)));
      // Загружаем все услуги, если они нужны для отдельной вкладки "Все услуги"
      void dispatch(getAllServiceSpecialists());
    }
  }, [dispatch, id]);

  // Обработка состояний загрузки и ошибок
  if (loading) return <div>Загрузка специалиста...</div>;
  if (error) return <div>Ошибка загрузки: {error}</div>;
  if (!specialistWithLinks) return <div>Специалист не найден.</div>; // Если данных нет после загрузки

  // Деструктурируем данные после проверки specialistWithLinks
  const { data: specialist, links: specialistServices } = specialistWithLinks;

  // Если имя не приходит с бэка в specialist.name, то нужно использовать логику из предыдущего решения:
  // const specialistUser = users?.find((u) => u.id === specialist.userId);
  // const name = specialistUser?.name ?? 'Имя не найдено';
  // НО, как я выше написал, лучше, чтобы name приходило прямо с бэка в specialist.data

  return (
    <div>
      <h2>{specialist.name || 'Имя не указано'}</h2> {/* Используем specialist.name */}
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
            {allServices.length ? ( // Используем allServices из стора serviceSpecialist
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
    </div>
  );
}

export default OneSpecialistCard;
