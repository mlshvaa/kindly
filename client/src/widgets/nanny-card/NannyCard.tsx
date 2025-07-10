// NannyCard.tsx
import './NannyCard.css';
import type { SpecialistType } from '@/entities/specialist/model/specialistType';
import defaultAvatar from '@/images/defaultAvatar.jpg'

type Props = {
  specialist: SpecialistType;
  onClick: () => void;
};

const BACKEND_URL = 'http://localhost:3000';

function NannyCard({ specialist, onClick }: Props): React.JSX.Element {
  // specialist.photo может быть, например, 'olga_photo.jpg' или 'uploads/olga_photo.jpg'
  // Нужно убрать лишний префикс 'uploads/' если он уже есть в photo, чтобы не дублировать

  const photoPath = specialist.photo || '';
  const normalizedPhotoPath = photoPath.startsWith('uploads/')
    ? photoPath.replace(/^uploads\//, '')
    : photoPath;

  const photoUrl = normalizedPhotoPath
    ? `${BACKEND_URL}/uploads/${normalizedPhotoPath}`
    : '/default-avatar.jpg';

  return (
    <div onClick={onClick} className="nannyCard">

<!--       <img src={specialist.photo ?? {defaultAvatar}} alt="Фотография няни" /> -->

      <img src={photoUrl} alt="Фотография няни" />
      <h4>{specialist.user.name}</h4>

      <p>{specialist.age ? `${specialist.age} лет` : ''}</p>
      <p>{specialist.education}</p>
      <p>{specialist.clescription}</p>
    </div>
  );
}

export default NannyCard;
