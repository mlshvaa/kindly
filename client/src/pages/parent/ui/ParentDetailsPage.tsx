import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getFullParentById } from '@/entities/parent/model/parentThunks';
import {
  getRequestsFromParentToMe,
  updateRequestStatus,
} from '@/entities/request/model/requestThunks';
import StartChatButton from '@/features/start-chat/ui/StartChatButton';
import './ParentDetailsPage.css';

export default function ParentDetailsPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const parent = useAppSelector((state) => state.parent.currentParent);
  const loading = useAppSelector((state) => state.parent.loading);
  const specialist = useAppSelector((state) => state.specialist.specialist);
  const requests = useAppSelector((state) => state.request.requestsFromParent);
  const loadingRequests = useAppSelector((state) => state.request.loadingFromParent);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!id) return;
    void dispatch(getFullParentById(Number(id)));
    void dispatch(getRequestsFromParentToMe(Number(id)));
  }, [dispatch, id]);

  const handleStatusChange = (requestId: number, status: 'одобрено' | 'отклонено'): void => {
    void dispatch(updateRequestStatus({ id: requestId, status }));
    void dispatch(getRequestsFromParentToMe(Number(id)));
  };

  if (loading || loadingRequests) {
    return (
      <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!parent) {
    return (
      <div className="notFoundContainer">
        <div className="notFoundCard">
          <h2>Родитель не найден</h2>
          <p>К сожалению, информация о родителе недоступна.</p>
          <button className="backButton" onClick={() => navigate(-1)}>
            ← Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="parentDetailsContainer">
      <div className="detailsHeader">
        <button className="backButton" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <h1>
          Информация о <span className="pink">Родителе</span>
        </h1>
      </div>

      <div className="contentWrapper">
        <div className="parentInfoSection">
          <div className="infoCard">
            <div className="infoCardHeader">
              <div className="iconWrapper userIcon">
                <span>👤</span>
              </div>
              <h2>Основная информация</h2>
            </div>
            <div className="infoCardContent">
              <div className="infoRow">
                <span className="infoLabel">Имя:</span>
                <span className="infoValue">{parent.user?.name ?? 'Не указано'}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Телефон:</span>
                <span className="infoValue">{parent.phone ?? 'Не указано'}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Адрес:</span>
                <span className="infoValue">{parent.adress ?? 'Не указано'}</span>
              </div>
            </div>
          </div>

          <div className="infoCard">
            <div className="infoCardHeader">
              <div className="iconWrapper childIcon">
                <span>👶</span>
              </div>
              <h2>Дети</h2>
            </div>
            <div className="infoCardContent">
              {parent.children.length === 0 ? (
                <p className="emptyMessage">Информация о детях не указана</p>
              ) : (
                <div className="childrenList">
                  {parent.children.map((child, idx) => (
                    <div key={idx} className="childCard">
                      <div className="childIcon">🧒</div>
                      <div className="childInfo">
                        <span className="childName">{child.name}</span>
                        <span className="childAge">{child.age} лет</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="requestsSection">
          <div className="requestsHeader">
            <div className="iconWrapper requestIcon">
              <span>📬</span>
            </div>
            <h2>Заявки от этого родителя</h2>
          </div>

          {requests.length === 0 ? (
            <div className="emptyRequests">
              <p>Заявок пока нет</p>
            </div>
          ) : (
            <div className="requestsList">
              {requests.map((req) => (
                <div key={req.id} className="requestCard">
                  <div className="requestHeader">
                    <span className="requestLabel">Заявка #{req.id}</span>
                    <span className={`statusBadge status-${req.status}`}>
                      {req.status}
                    </span>
                  </div>
                  
                  <div className="requestContent">
                    <div className="requestInfo">
                      <span className="requestInfoLabel">Педагог:</span>
                      <span className="requestInfoValue">{user?.name}</span>
                    </div>
                    {req.message && (
                      <div className="requestMessage">
                        <span className="requestInfoLabel">Сообщение:</span>
                        <p className="messageText">{req.message}</p>
                      </div>
                    )}
                  </div>

                  {req.status === 'ожидание' && (
                    <div className="requestActions">
                      <button 
                        className="approveButton" 
                        onClick={() => handleStatusChange(req.id, 'одобрено')}
                      >
                        ✓ Одобрить
                      </button>
                      <button 
                        className="rejectButton" 
                        onClick={() => handleStatusChange(req.id, 'отклонено')}
                      >
                        ✗ Отклонить
                      </button>
                      <StartChatButton parentId={parent.id} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}