import React, { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { updateSpecialistUser } from '@/entities/specialist/model/specialistThunks';

type Props = {
  field: string; // имя поля, например 'age'
  value: string | null | undefined;
  userId: number;
};

function UpdateProfileForm({ field, value, userId }: Props): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void dispatch(updateSpecialistUser({ userId, data: { [field]: inputValue } }));
    setIsEditing(false);
  };

  return (
    <span style={{ marginLeft: 8 }}>
      {!isEditing && (
        <button type="button" onClick={() => setIsEditing(true)}>
          ✏️
        </button>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: 120 }}
          />
          <button type="submit">Сохранить</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Отмена
          </button>
        </form>
      )}
    </span>
  );
}

export default UpdateProfileForm;
