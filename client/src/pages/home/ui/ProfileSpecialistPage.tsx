import React, { useEffect } from 'react';
import UpdateProfileForm from '@/features/update-profile-form/UpdateProfileForm';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getAllSpecialistUser } from '@/entities/specialist/model/specialistThunks'; // твой thunk для загрузки
import UploadPhoto from '@/features/upload-photo/UploadPhoto';

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
        {specialist.photo && (
          <img
            src={
              specialist.photo.startsWith('http')
                ? specialist.photo
                : `http://localhost:3000/${specialist.photo.replace(/^\/?/, '')}`
            }
            alt="Фото"
            style={{ maxWidth: 300, maxHeight: 300, objectFit: 'cover' }}
          />
        )}
        <UploadPhoto field="photo" currentPhoto={specialist.photo} userId={user.id} />
      </div>
      <div>
        Диплом:
        {specialist.diplomaPhoto && (
          <img
            src={
              specialist.diplomaPhoto.startsWith('http')
                ? specialist.diplomaPhoto
                : `http://localhost:3000/${specialist.diplomaPhoto.replace(/^\/?/, '')}`
            }
            alt="diplomaPhoto"
            style={{ maxWidth: 300, maxHeight: 300, objectFit: 'cover' }}
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
