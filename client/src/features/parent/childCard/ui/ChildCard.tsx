import React, { useState } from 'react';
import type { ChildType } from '@/entities/parent/model/parentTypes';

type Props = {
  index: number;
  child: ChildType;
  onUpdate: (index: number, updated: ChildType) => void;
  onDelete: (index: number) => void;
};

export default function ChildCard({ index, child, onUpdate, onDelete }: Props): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(child.name);
  const [age, setAge] = useState(child.age);

  const handleSave = () => {
    onUpdate(index, { name, age });
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" />
          <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Возраст" />
          <button onClick={handleSave}>Сохранить</button>
        </>
      ) : (
        <>
          <span><strong>{child.name}</strong> ({child.age} лет)</span>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        </>
      )}
      <button onClick={() => onDelete(index)}>Удалить</button>
    </div>
  );
}
