import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
  getAllServiceSpecialists,
  assignService,
  removeService,
} from '@/entities/service-specialist/model/serviceSpecialistThunks';
import type { serviceType } from '@/entities/service-specialist/model/serviceSpecialistType';
import AddNewService from '../add-new-Service/AddNewService';

type Props = {
  specialistId: number;
  specialistServicesIds: number[];
  allServices: serviceType[] | null; // тип массива услуг
};

function AllServiseSpecialistList({
  specialistId,
  specialistServicesIds,
  allServices,
}: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.serviceSpecialist);

  useEffect(() => {
    void dispatch(getAllServiceSpecialists());
  }, [dispatch]);

  const onAdd = (serviceId: number): void => {
    if (!specialistServicesIds.includes(serviceId)) {
      void dispatch(assignService({ specialistId, serviceId }));
    }
  };

  const onDelete = (serviceId: number): void => {
    if (window.confirm('Удалить услугу из общего списка?')) {
      void dispatch(removeService(serviceId));
    }
  };

  if (loading) return <div>Загрузка всех услуг...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (allServices?.length === 0) return <div>Услуги не найдены</div>;

  return (
    <div>
      <h3>Все услуги</h3>
      <ul>
        {allServices?.map((service) => (
          <li key={service.id} style={{ marginBottom: 8 }}>
            <span>
              {service.name} — {service.price} ₽
            </span>
            <button
              disabled={specialistServicesIds.includes(service.id)}
              onClick={() => onAdd(service.id)}
              className='addedFcknButton'
            >
              {specialistServicesIds.includes(service.id) ? 'Добавлено' : 'Добавить'}
            </button>
            <button onClick={() => onDelete(service.id)} className='deleteFcknButton'>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <AddNewService />
    </div>
  );
}

export default AllServiseSpecialistList;
