import React, { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import {
  updateSpecialistPhoto,
  updateSpecialistDiplomas,
} from '@/entities/specialist/model/specialistThunks';
import './UploadPhoto.css';
import upload from '@/images/upload.png';

type Props = {
  field: 'photo' | 'diplomaPhoto';
  currentPhoto?: string | string[] | null;
  userId: number;
};

function UploadPhoto({ field, currentPhoto, userId }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [uploading, setUploading] = useState(false);

  const inputId = field === 'photo' ? 'photo-upload' : 'diploma-photo-upload';

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      console.log('field', field);

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
      } catch (error) {
        console.error('Ошибка загрузки фото:', error);
      } finally {
        setUploading(false);
      }
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
          className="specialistProfileImage"
        />
      )}
      <>
        <label htmlFor={inputId} className="uploadButton">
          <img src={upload} alt="Фото" style={{ maxWidth: 16, maxHeight: 16 }} />

          {uploading ? 'Загрузка...' : `Загрузить ${field === 'photo' ? 'фото' : 'диплом'}`}
        </label>
        <input id={inputId} type="file" accept="image/*" onChange={onFileChange} />
      </>
    </div>
  );
}

export default UploadPhoto;
