import { removeServiceSpecialist } from '@/entities/service-specialist/model/serviceSpecialistThunks';
import type { ServiceSpecialistBySpecialistIdType } from '@/entities/service-specialist/model/serviceSpecialistType';
import { useAppDispatch } from '@/shared/lib/hooks';
import React from 'react';

type Props = {
  serviceSpecialist: ServiceSpecialistBySpecialistIdType;
};
export default function ServiseSpecialistList(serviceSpecialist: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const onDelete = (specialistId: number, serviceId: number): void => {
    void dispatch(removeServiceSpecialist({ specialistId, serviceId }));
  };

  return (
    <>
      <ul>
        <li>
          <span>{serviceSpecialist.serviceSpecialist.service.name}</span>
          {': '}
          <span>{serviceSpecialist.serviceSpecialist.service.price}</span>
          {' рублей'}
          <button
            onClick={() =>
              onDelete(
                serviceSpecialist.serviceSpecialist.specialistId,
                serviceSpecialist.serviceSpecialist.serviceId,
              )
            }
            className="deleteFcknButton"
          >
            Удалить
          </button>
        </li>
      </ul>
    </>
  );
}
