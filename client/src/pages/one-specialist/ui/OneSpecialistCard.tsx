import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getSpecialistById } from '@/entities/specialist/model/specialistThunks';
import { getAllServiceSpecialists } from '@/entities/service-specialist/model/serviceSpecialistThunks';
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';
import AddRequestSpecialist from '@/features/add-request-to-specialist/AddRequestSpecialist';
import Calendar from '@/widgets/calendar/Calendar';
import diplomaLogo from '@/images/diplomaLogo.jpg';
import './OneSpecialistCard.css';

const BACKEND_URL = 'http://localhost:3000';

function OneSpecialistCard(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { specialistWithLinks, loading, error } = useAppSelector((state) => state.specialist);
  const { services: allServices } = useAppSelector((state) => state.serviceSpecialist);
  const role = useAppSelector((state) => state.user.user?.role);
  const navigate = useNavigate();
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
      <div className="specialistTopPartCardContainer">
        <div className="rightPartPhoto">
          <img
            src={specialist.photo ? `${BACKEND_URL}/${specialist.photo}` : '/default-avatar.png'}
            alt={specialist.name || 'Фото специалиста'}
            className="specialistPhoto"
          />
        </div>
        <div className="leftPartNoPhoto">
          <h2 className="specialistNameOrNone">{specialist.name || 'Имя не указано'}</h2>
          <div className="specialistDetails">
            <div className="specialistDetailsDetails">
              <p className="ageAndMore">Возраст</p>
              <p className="ageAndMoreAccurate">{specialist.age}</p>
            </div>
            <div className="specialistDetailsDetails">
              <p className="ageAndMore">Опыт работы</p>
              <p className="ageAndMoreAccurate">{specialist.clescription}</p>
            </div>
            <div className="specialistDetailsDetails">
              <p className="ageAndMore">Образование</p>
              <p className="ageAndMoreAccurate">{specialist.education}</p>
            </div>
            <div className="specialistDetailsDetails">
              <p className="ageAndMore">Специализация</p>
              <p className="ageAndMoreAccurate">{specialist.position}</p>
            </div>
            {role !== 'specialist' && (
              <button
                onClick={() => {
                  if (role === 'parent') {
                    setShowAddRequest(true);
                  } else {
                    void navigate('/signup/parent');
                  }
                }}
                className="requestButton"
              >
                Отправить запрос
              </button>
            )}
          </div>
        </div>
        <div className="oneSpecialistCalendar">
          <Calendar specialistId={Number(specialist.id)} editable={false} />
        </div>
      </div>

      {showAddRequest && (
        <div style={{ marginTop: 20 }}>
          <AddRequestSpecialist id={Number(id)} onClose={() => setShowAddRequest(false)} />
        </div>
      )}

      <div className="specialistDiplomaContainer">
        <div className="diplomaLogoAndHeader">
          <img src={diplomaLogo} alt="логотип медальки" />
          <h1>Дипломы и сертификаты специалиста</h1>
        </div>
        <div className="diplomaContainerContainerMain">
          {specialist.diplomaPhoto && specialist.diplomaPhoto.length > 0 && (
            <DiplomaGallery
              photos={specialist.diplomaPhoto}
              userId={specialist.userId}
              backendUrl={BACKEND_URL}
              isBig={true}
            />
          )}
        </div>
      </div>
      <div className="specialistServices">
        <h1>Услуги и цены</h1>
        {activeTab === 'myServices' && (
          <ul>
            {specialistServices.length ? (
              specialistServices.map((service) => (
                <div key={service.id} className="oneServiceStyle">
                  {service.name} — <span className="pinkPink">{service.price} ₽</span>
                </div>
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
