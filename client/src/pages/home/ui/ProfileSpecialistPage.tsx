import React, { useEffect } from 'react';
import UpdateProfileForm from '@/features/update-profile-form/UpdateProfileForm';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getAllSpecialistUser } from '@/entities/specialist/model/specialistThunks';
import UploadPhoto from '@/features/upload-photo/UploadPhoto';
import DiplomaGallery from '@/features/diploma-gallery/DiplomaGallery';

const BACKEND_URL = 'http://localhost:3000';

function ProfileSpecialistPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { specialist } = useAppSelector((store) => store.specialist);
  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (user?.id) {
      void dispatch(getAllSpecialistUser(user.id));
    }
  }, [dispatch, user?.id]);

  if (!user || !specialist) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <div>
        Возраст: {specialist.age}
        <UpdateProfileForm field="age" value={specialist.age} userId={user.id} />
      </div>
      <div>
        Личное фото:
        <UploadPhoto field="photo" currentPhoto={specialist.photo} userId={user.id} />
      </div>
      <div>
        Дипломы:
        {specialist.diplomaPhoto && specialist.diplomaPhoto.length > 0 && (
          <DiplomaGallery
            photos={specialist.diplomaPhoto}
            userId={user.id}
            backendUrl={BACKEND_URL}
          />
        )}
        <UploadPhoto field="diplomaPhoto" currentPhoto={specialist.diplomaPhoto} userId={user.id} />
      </div>
      <div>
        Опыт работы: {specialist.clescription}
        <UpdateProfileForm field="clescription" value={specialist.clescription} userId={user.id} />
      </div>
      <div>
        Образование: {specialist.education}
        <UpdateProfileForm field="education" value={specialist.education} userId={user.id} />
      </div>
      <div>
        Специализация: {specialist.position}
        <UpdateProfileForm field="position" value={specialist.position} userId={user.id} />
      </div>
    </>
  );
}

export default ProfileSpecialistPage;
