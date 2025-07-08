// NannyCard.tsx
import './NannyCard.css';
import type { SpecialistType } from '@/entities/specialist/model/specialistType';

type Props = {
  specialist: SpecialistType;
  onClick: () => void;
};

function NannyCard({ specialist, onClick }: Props): React.JSX.Element {
  return (
    <div onClick={onClick} className="nannyCard">
      <img src={specialist.photo ?? '/default-avatar.jpg'} alt="Фотография няни" />
      <h4>{specialist.position ?? 'Педагог'}</h4>
      <p>{specialist.age ? `${specialist.age} лет` : ''}</p>
      <p>{specialist.education}</p>
      <p>{specialist.clescription}</p>
    </div>
  );
}

export default NannyCard;
