import React, { useEffect, useState } from 'react';
import UpdateProfileForm from '@/features/update-profile-form/UpdateProfileForm';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getAllSpecialistUser } from '@/entities/specialist/model/specialistThunks';
import UploadPhoto from '@/features/upload-photo/UploadPhoto';
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';
import ServiseSpecialistList from '@/features/servise-specialist-list/ServiseSpecialistList';
import { getServiceSpecialistsBySpecialistId } from '@/entities/service-specialist/model/serviceSpecialistThunks';
import AllServiseSpecialistList from '@/features/all-servise-specialist-list/AllServiseSpecialistList';

const BACKEND_URL = 'http://localhost:3000';

function ProfileSpecialistPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { specialist } = useAppSelector((store) => store.specialist);
  const { user } = useAppSelector((store) => store.user);
  const { myServiceSpecialists, services } = useAppSelector((store) => store.serviceSpecialist);

  const [activeTab, setActiveTab] = useState<'myServices' | 'allServices'>('myServices');

  useEffect(() => {
    if (user?.id) {
      void dispatch(getAllSpecialistUser(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (specialist?.id) {
      void dispatch(getServiceSpecialistsBySpecialistId(specialist.id));
    }
  }, [dispatch, specialist?.id]);

  if (!user || !specialist) {
    return <div>Загрузка...</div>;
  }

  // Получаем массив serviceId услуг специалиста для удобства
  const specialistServiceIds = myServiceSpecialists?.map((s) => s.serviceId) ?? [];

  return (
    <>
      <h2>{user.name}</h2>
      <div>
        Возраст: {specialist.age}
        <UpdateProfileForm field="age" value={specialist.age} userId={user.id} />
      </div>
      <div>
        Личное фото:
        <UploadPhoto field="photo" currentPhoto={specialist.photo} userId={user.id} />
      </div>
      <div>
        Дипломы:
        {specialist.diplomaPhoto && specialist.diplomaPhoto.length > 0 && (
          <DiplomaGallery
            photos={specialist.diplomaPhoto}
            userId={user.id}
            backendUrl={BACKEND_URL}
          />
        )}
        <UploadPhoto field="diplomaPhoto" currentPhoto={specialist.diplomaPhoto} userId={user.id} />
      </div>
      <div>
        Опыт работы: {specialist.clescription}
        <UpdateProfileForm field="clescription" value={specialist.clescription} userId={user.id} />
      </div>
      <div>
        Образование: {specialist.education}
        <UpdateProfileForm field="education" value={specialist.education} userId={user.id} />
      </div>
      <div>
        Специализация: {specialist.position}
        <UpdateProfileForm field="position" value={specialist.position} userId={user.id} />
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setActiveTab('myServices')}
          style={{ fontWeight: activeTab === 'myServices' ? 'bold' : 'normal', marginRight: 10 }}
        >
          Мои услуги
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
          <div>
            {myServiceSpecialists?.length ? (
              myServiceSpecialists.map((serviceSpecialist) => (
                <div key={`my-${serviceSpecialist.service.id.toString()}`}>
                  <ServiseSpecialistList serviceSpecialist={serviceSpecialist} />
                </div>
              ))
            ) : (
              <div>Услуги не найдены</div>
            )}
          </div>
        )}

        {activeTab === 'allServices' && (
          <AllServiseSpecialistList
            specialistId={specialist.id}
            specialistServicesIds={specialistServiceIds}
            allServices={services}
          />
        )}
      </div>
    </>
  );
}

export default ProfileSpecialistPage;
