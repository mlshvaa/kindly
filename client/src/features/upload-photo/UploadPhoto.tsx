import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { updateSpecialistPhoto } from '@/entities/specialist/model/specialistThunks';

type Props = {
  field: 'photo' | 'diplomaPhoto';
  currentPhoto?: string | null;
};

function UploadPhoto({ field, currentPhoto }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onUpload = async (): Promise<void> => {
    if (!file || !user) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('photo', file); // поле 'photo' для multer
    formData.append('field', field); // чтобы сервер знал, куда сохранить (photo или diplomaPhoto)

    try {
      await dispatch(updateSpecialistPhoto({ userId: user.id, data: formData })).unwrap();
      setFile(null);
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
      // Можно добавить уведомление об ошибке пользователю
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {currentPhoto && (
        <div style={{ marginBottom: 8 }}>
          <img
            src={`/${currentPhoto}`}
            alt={field}
            style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover' }}
          />
        </div>
      )}
      <input type="file" accept="image/*" onChange={onFileChange} />
      <button onClick={onUpload} disabled={!file || uploading}>
        {uploading ? 'Загрузка...' : `Загрузить ${field === 'photo' ? 'Фото' : 'Диплом'}`}
      </button>
    </div>
  );
}

export default UploadPhoto;
