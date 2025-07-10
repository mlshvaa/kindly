import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
  getAllSpecialistUser,
  updateSpecialistUser,
} from '@/entities/specialist/model/specialistThunks';
import UploadPhoto from '@/features/upload-photo/UploadPhoto';
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';
import ServiseSpecialistList from '@/features/servise-specialist-list/ServiseSpecialistList';
import { getServiceSpecialistsBySpecialistId } from '@/entities/service-specialist/model/serviceSpecialistThunks';
import AllServiseSpecialistList from '@/features/all-servise-specialist-list/AllServiseSpecialistList';
import Calendar from '@/widgets/calendar/Calendar';
import './ProfileSpecialistPage.css';

const BACKEND_URL = 'http://localhost:3000';

function ProfileSpecialistPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { specialist } = useAppSelector((store) => store.specialist);
  const { user } = useAppSelector((store) => store.user);
  const { myServiceSpecialists, services } = useAppSelector((store) => store.serviceSpecialist);

  const [activeSection, setActiveSection] = useState<'profile' | 'services' | 'requests'>(
    'profile',
  );
  const [activeTab, setActiveTab] = useState<'myServices' | 'allServices'>('myServices');
  const [isClicked, setIsClicked] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');

  const onClickEdit = (): void => {
    if (isClicked && user?.id) {
      void dispatch(
        updateSpecialistUser({
          userId: user.id,
          data: { name },
        }),
      );

      void dispatch(
        updateSpecialistUser({
          userId: user.id,
          data: {
            education,
            age,
            position,
            clescription: experience,
          },
        }),
      );
    }
    setIsClicked(!isClicked);
  };

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

  useEffect(() => {
    if (user && specialist) {
      setName(user.name || '');
      setAge(specialist.age ?? '');
      setEducation(specialist.education ?? '');
      setPosition(specialist.position ?? '');
      setExperience(specialist.clescription ?? '');
    }
  }, [user, specialist]);

  if (!user || !specialist) return <div>Загрузка...</div>;

  const specialistServiceIds = myServiceSpecialists?.map((s) => s.serviceId) ?? [];

  return (
    <div className="specialistProfileMain">
      <div className="topPartAndActive">
        <div className="topPartYourProfile">
          <h1 className="yourProfileHeader">Личный кабинет</h1>
          <p>Управляйте своим профилем и услугами</p>
        </div>
        <p className="activeProfileParagraph">Профиль активен</p>
      </div>

      <div className="categoriesSectionContainer">
        <button
          className={`sectionButtonOff ${activeSection === 'profile' ? 'sectionButtonOn' : ''}`}
          onClick={() => setActiveSection('profile')}
        >
          Профиль
        </button>
        <button
          className={`sectionButtonOff ${activeSection === 'services' ? 'sectionButtonOn' : ''}`}
          onClick={() => setActiveSection('services')}
        >
          Услуги
        </button>
        <button
          className={`sectionButtonOff ${activeSection === 'requests' ? 'sectionButtonOn' : ''}`}
          onClick={() => setActiveSection('requests')}
        >
          Запросы
        </button>
      </div>

      {activeSection === 'profile' && (
        <div className="specialistProfileInfoCard">
          <div className="headerAndButton">
            <h2>Информация о профиле</h2>
            <button className="editSpecInfoButton" onClick={onClickEdit}>
              {isClicked ? 'Сохранить' : 'Редактировать'}
            </button>
          </div>
          <div className="leftAndRightParts">
            <div className="photoAndCalendar">
              <div className="specialistPhoto">
                Личное фото:
                {isClicked && (
                  <UploadPhoto field="photo" currentPhoto={specialist.photo} userId={user.id} />
                )}
              </div>
              <Calendar specialistId={specialist.id} editable={true} />
            </div>

            <div className="specialistInfo">
              <div className="specialistMiniInfo">
                <p>Имя</p>
                <input
                  type="text"
                  value={name}
                  className="specialistInput"
                  disabled={!isClicked}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="specialistMiniInfo">
                <p>Возраст</p>
                <input
                  type="text"
                  value={age}
                  className="specialistInput"
                  disabled={!isClicked}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="specialistMiniInfo">
                <p>Образование</p>
                <input
                  type="text"
                  value={education}
                  className="specialistInput"
                  disabled={!isClicked}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>

              <div className="specialistMiniInfo">
                <p>Специализация</p>
                <input
                  type="text"
                  value={position}
                  className="specialistInput"
                  disabled={!isClicked}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              <div className="specialistMiniInfo">
                <p>Опыт работы</p>
                <input
                  type="text"
                  value={experience}
                  className="specialistInput"
                  disabled={!isClicked}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>

              <div className="specialistMiniInfo">
                <p>Дипломы</p>
                {specialist.diplomaPhoto && specialist.diplomaPhoto.length > 0 && (
                  <DiplomaGallery
                    photos={specialist.diplomaPhoto}
                    userId={user.id}
                    backendUrl={BACKEND_URL}
                  />
                )}
                {isClicked && (
                  <UploadPhoto
                    field="diplomaPhoto"
                    currentPhoto={specialist.diplomaPhoto}
                    userId={user.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'services' && (
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

          <div style={{ marginTop: 20 }}>
            {activeTab === 'myServices' && (
              <div>
                {myServiceSpecialists.length ? (
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
        </div>
      )}

      {activeSection === 'requests' && (
        <div style={{ marginTop: 40 }}>
          <h2>Раздел запросов</h2>
          <p>Пока тут ничего нет 🐣</p>
        </div>
      )}
    </div>
  );
}

export default ProfileSpecialistPage;
