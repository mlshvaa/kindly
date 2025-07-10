import React from 'react';
import type { ChildType } from '@/entities/parent/model/parentTypes';

type Props = {
  index: number;
  child: ChildType;
  onUpdate: (index: number, updated: ChildType) => void;
  onDelete: (index: number) => void;
};

export default function ChildCard({ index, child, onUpdate, onDelete }: Props): React.JSX.Element {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = (): void => {
    setIsEditing(false);
  };

  const handleChange = (field: keyof ChildType, value: string):void => {
    onUpdate(index, { ...child, [field]: value });
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {isEditing ? (
        <>
          <input
            value={child.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Имя"
          />
          <input
            value={child.age}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="Возраст"
          />
          <button onClick={handleSave}>Сохранить</button>
        </>
      ) : (
        <>
          <span>
            <strong>{child.name}</strong> ({child.age} лет)
          </span>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        </>
      )}
      <button onClick={() => onDelete(index)}>Удалить</button>
    </div>
  );
}
