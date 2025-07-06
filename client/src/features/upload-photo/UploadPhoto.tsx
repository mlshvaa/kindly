import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
  updateSpecialistPhoto,
  updateSpecialistDiplomas,
} from '@/entities/specialist/model/specialistThunks';

type Props = {
  field: 'photo' | 'diplomaPhoto';
  currentPhoto?: string | string[] | null;
  userId: number;
};

function UploadPhoto({ field, currentPhoto, userId }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onUpload = async (): Promise<void> => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();

    if (field === 'photo') {
      formData.append('photo', file);
    } else {
      formData.append('photos', file);
    }

    try {
      if (field === 'photo') {
        await dispatch(updateSpecialistPhoto({ userId, data: formData })).unwrap();
      } else {
        await dispatch(updateSpecialistDiplomas({ userId, data: formData })).unwrap();
      }
      setFile(null);
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {currentPhoto && field === 'photo' && typeof currentPhoto === 'string' && (
        <img
          src={
            currentPhoto.startsWith('http')
              ? currentPhoto
              : `http://localhost:3000/${currentPhoto.replace(/^\/?/, '')}`
          }
          alt="Фото"
          style={{ maxWidth: 300, maxHeight: 300, objectFit: 'cover' }}
        />
      )}
      <input type="file" accept="image/*" onChange={onFileChange} />
      <button onClick={onUpload} disabled={!file || uploading}>
        {uploading ? 'Загрузка...' : `Загрузить ${field === 'photo' ? 'Фото' : 'Диплом'}`}
      </button>
    </div>
  );
}

export default UploadPhoto;
