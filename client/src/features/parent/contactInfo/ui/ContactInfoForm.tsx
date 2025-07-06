import React, { useState } from 'react';

type Props = {
  initialPhone?: string;
  initialAdress?: string;
  onSubmit: (data: { phone: string; adress: string }) => void;
};

export default function ContactInfoForm({
  initialPhone = '',
  initialAdress = '',
  onSubmit,
}: Props): React.JSX.Element {
  const [phone, setPhone] = useState(initialPhone);
  const [adress, setAdress] = useState(initialAdress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ phone, adress });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Контактная информация</h3>
      <label>
        Телефон:
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label>
        Адрес:
        <input value={adress} onChange={(e) => setAdress(e.target.value)} />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
}
