import { newServiceSchema } from '@/entities/service-specialist/model/serviceSpecialistSchema';
import { addService } from '@/entities/service-specialist/model/serviceSpecialistThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React from 'react';

function AddNewService(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Преобразуем price в число
    const parsedData = {
      ...data,
      price: Math.floor(Number(data.price)),
    };
    const validated = newServiceSchema.parse(parsedData);
    dispatch(addService(validated))
      .unwrap()
      //  .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Название услуги" />
      <input name="price" type="number" placeholder="Цена" />
      <button type="submit">Добавить новую услугу</button>
    </form>
  );
}

export default AddNewService;
