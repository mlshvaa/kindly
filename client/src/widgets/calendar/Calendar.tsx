import React, { useEffect, useState } from 'react';
import './Calendar.css';
import axiosInstance from '@/shared/api/axiosInstance';
import { log } from 'console';

type SlotT = {
  id: number;
  startDate: string;
  endDate: string;
};

type Props = {
  specialistId: number;
  editable: boolean;
};

const BACKEND_URL = 'http://localhost:3000';

function Calendar({ specialistId, editable }: Props): React.JSX.Element {
  const [slots, setSlots] = useState<SlotT[]>([]);
  const [month] = useState(new Date()); // пока только текущий месяц

  console.log('user is logged in:', document.cookie);

  // Получение слотов с сервера
  const fetchSlots = async (): Promise<void> => {
    try {
      const res = await axiosInstance.get(`/calendars/specialist/${String(specialistId)}`);
      setSlots(res.data as SlotT[]);
    } catch (error) {
      console.error('Ошибка при получении слотов:', error);
    }
  };

  useEffect(() => {
    void fetchSlots();
  }, [specialistId]);

  const getDaysInMonth = (): number => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const isSameDay = (date1: Date, date2: Date): boolean =>
    date1.toDateString() === date2.toDateString();

  const isSlot = (day: number): SlotT | undefined =>
    slots.find((slot) =>
      isSameDay(new Date(slot.startDate), new Date(month.getFullYear(), month.getMonth(), day)),
    );

  const handleDayClick = async (day: number): Promise<void> => {
    if (!editable) return;

    const selectedDate = new Date(month.getFullYear(), month.getMonth(), day);
    const existingSlot = isSlot(day);

    try {
      if (existingSlot) {
        await axiosInstance.delete(`/calendars/${String(existingSlot.id)}`);
      } else {
        await axiosInstance.post(`/calendars`, {
          startDate: selectedDate,
          endDate: selectedDate,
          specialistId,
        });
      }

      await fetchSlots(); 
    } catch (error) {
      console.error('Ошибка при изменении слота:', error);
    }
  };

  const renderDays = (): React.ReactNode => {
    const totalDays = getDaysInMonth();
    const days = [];

    for (let i = 1; i <= totalDays; i++) {
      const isToday = isSameDay(new Date(), new Date(month.getFullYear(), month.getMonth(), i));
      const hasSlot = Boolean(isSlot(i));

      days.push(
        <div
          key={i}
          className={`day ${hasSlot ? 'slot' : ''} ${isToday ? 'today' : ''} ${
            editable ? 'editable' : 'readonly'
          }`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <h3>
          {month.toLocaleString('default', { month: 'long' })} {month.getFullYear()}
        </h3>
      </div>
      <div className="calendar-grid">{renderDays()}</div>
    </div>
  );
}

export default Calendar;
