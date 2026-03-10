import { newRequestSchema } from '@/entities/request/model/requestSchema';
import { createRequest } from '@/entities/request/model/requestThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React from 'react';
import { useNavigate } from 'react-router';
import './AddRequestSpecialist.css';

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
      // void navigate('/parent/cabinet');
      onClose();
    } catch (error) {
      // Обработка ошибок валидации
      if (error instanceof Error) {
        alert(`Ошибка: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="modalOverlay" onClick={onClose} />
      <div className="requestModalContainer">
        <div className="modalHeader">
          <div className="modalIconWrapper">
            <span>📬</span>
          </div>
          <h2>Оставить <span className="pink">Заявку</span></h2>
          <button className="closeButton" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="requestForm">
          <div className="formContent">
            <label htmlFor="serviceInput" className="formLabel">
              <span className="labelIcon">📝</span>
              Опишите ваши пожелания
            </label>
            <p className="formHint">
              Укажите удобную дату, время и какие услуги вам необходимы
            </p>
            <textarea
              id="serviceInput"
              name="message"
              className="formTextarea"
              placeholder="Например: Нужна няня на 15 января с 14:00 до 18:00. Забрать ребенка из школы и помочь с домашним заданием."
              rows={5}
              required
            />
          </div>

          <div className="formActions">
            <button type="submit" className="submitButton">
              <span>✓</span>
              Отправить заявку
            </button>
            <button type="button" onClick={onClose} className="cancelButton">
              Отмена
            </button>
          </div>
        </form>

        <div className="modalFooter">
        </div>
      </div>
    </>
  );
};

export default AddRequestSpecialist;