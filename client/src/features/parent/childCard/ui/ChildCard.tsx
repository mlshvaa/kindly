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

  // Функция для форматирования имени: каждое слово с заглавной буквы
  const formatName = (value: string) =>
    value
      .split(' ')
      .filter(Boolean)
      .map((word) => {
        if (word.length === 0) return '';
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatName(e.target.value);
    setName(formatted);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Не позволяем вводить отрицательное число
    if (val === '') {
      setAge(''); // если пользователь удалил значение — пусть будет пустая строка
      return;
    }
    const num = Number(val);
    if (!isNaN(num) && num >= 0) {
      setAge(num.toString());
    }
  };

  const handleSave = () => {
    // Можно добавить валидацию перед сохранением, если нужно
    onUpdate(index, { name, age });

    setIsEditing(false);
  };

  const handleChange = (field: keyof ChildType, value: string):void => {
    onUpdate(index, { ...child, [field]: value });
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {isEditing ? (
        <>
          <input value={name} onChange={handleNameChange} placeholder="Имя" />
          <input
            type="number"
            min={0}
            value={age}
            onChange={handleAgeChange}

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
