import { newRequestSchema } from '@/entities/request/model/requestSchema';
import { createRequest } from '@/entities/request/model/requestThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React from 'react';
import { useNavigate } from 'react-router';

type AddRequestSpecialistProps = {
  onClose: () => void;
  id: number;
};

const AddRequestSpecialist = ({ onClose, id }: AddRequestSpecialistProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Получаем данные из формы
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as { message?: string };

    // Формируем объект с нужными полями и дефолтным статусом
    const dataToValidate = {
      message: formData.message ?? null, // если пусто, ставим null
      status: 'ожидание' as const,
      specialistId: id,
    };

    try {
      // Валидация по схеме
      const validated = newRequestSchema.parse(dataToValidate);

      // Отправляем запрос
      void dispatch(createRequest(validated));

      // Навигация и закрытие формы
      void navigate('/parent/cabinet');
      onClose();
    } catch (error) {
      // Обработка ошибок валидации
      if (error instanceof Error) {
        alert(`Ошибка: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 10, width: 300 }}>
      <label htmlFor="serviceInput">Введите дату, время и название услуги</label>
      <textarea
        id="serviceInput"
        name="message" // имя поля должно совпадать с именем в схеме
        placeholder="Введите дату, время и название услуги"
        style={{ width: 150, height: 100 }}
      />
      <div style={{ marginTop: 10 }}>
        <button type="submit">Оставить заявку</button>
        <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AddRequestSpecialist;
