import React from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { deleteSpecialistDiploma } from '@/entities/specialist/model/specialistThunks';

type Props = {
  photos: string[];
  userId: number;
  backendUrl: string;
};

const DiplomaGallery: React.FC<Props> = ({ photos, userId, backendUrl }) => {
  const dispatch = useAppDispatch();

  const onDelete = (photoPath: string) => {
    void dispatch(deleteSpecialistDiploma({ userId, photoPath }));
  };

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {photos.map((photo) => (
        <div key={photo} style={{ position: 'relative' }}>
          <img
            src={`${backendUrl}/${photo.replace(/^\/?/, '')}`}
            alt="Диплом"
            style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
          />
          <button
            onClick={() => onDelete(photo)}
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
        </div>
      ))}
    </div>
  );
};

export default DiplomaGallery;
