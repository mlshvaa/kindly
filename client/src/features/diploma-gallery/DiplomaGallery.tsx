import React from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { deleteSpecialistDiploma } from '@/entities/specialist/model/specialistThunks';

type Props = {
  photos: string[];
  userId: number;
  backendUrl: string;
};

const DiplomaGallery = ({ photos, userId, backendUrl }: Props): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.user);
  const onDelete = (photoPath: string): void => {
    void dispatch(deleteSpecialistDiploma({ userId, photoPath }));
  };
  // Проверяем, совпадает ли текущий пользователь с владельцем дипломов
  const isOwner = currentUser && currentUser.id === userId;

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {photos.map((photo) => (
        <div key={photo} style={{ position: 'relative' }}>
          <img
            src={`${backendUrl}/${photo.replace(/^\/?/, '')}`}
            alt="Диплом"
            style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
          />
          {isOwner && (
            <button
              onClick={() => onDelete(photo)}
              disabled={!isOwner} // кнопка активна только если владелец
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                background: 'rgba(255,0,0,0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 24,
                height: 24,
                cursor: 'pointer',
              }}
              title="Удалить диплом"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DiplomaGallery;
