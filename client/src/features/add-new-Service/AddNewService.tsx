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
      price: Math.abs(Number(data.price)),
    };
    const validated = newServiceSchema.parse(parsedData);
    dispatch(addService(validated))
      .unwrap()
      //  .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className='inputsFormAndButton'>
      <input name="name" type="text" placeholder="Название услуги" className='imGoingInsaneInput'/>
      <input name="price" type="number" placeholder="Цена" min="0" className='imGoingInsaneInput'/>
      <button type="submit" className='addNewService'>Добавить новую услугу</button>
    </form>
  );
}

export default AddNewService;
