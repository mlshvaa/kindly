import React, { useState } from 'react';

type Props = {
  initialPhone?: string;
  initialAdress?: string;
  onSubmit: (data: { phone: string; adress: string }) => void;
};

export default function ContactInfoForm({
  initialPhone = '+7',
  initialAdress = 'Москва',
  onSubmit,
}: Props): React.JSX.Element {
  const [phone, setPhone] = useState(initialPhone);
  const [adress, setAdress] = useState(initialAdress);

  const handleAdressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAdress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Если адрес пустой, подставляем "Москва"
    const finalAdress = adress.trim() === '' ? 'Москва' : adress.trim();
    onSubmit({ phone, adress: finalAdress });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Контактная информация</h3>
      <label>
        Телефон:
        <input
          value={phone}
          type="tel"
          onChange={(e) => {
            let val = e.target.value;
            if (!val.startsWith('+7')) val = '+7';
            if (val.length > 2) {
              const numbersOnly = val.slice(2).replace(/\D/g, '');
              val = `+7${numbersOnly}`;
            }
            setPhone(val);
          }}
          maxLength={12}
          pattern="\+7\d{10}"
          title="Телефон должен начинаться с +7 и содержать 10 цифр"
        />
      </label>
      <label>
        Адрес:
        <input
          value={adress}
          onChange={handleAdressChange}
          placeholder="Москва, ул. Ленина, д. 1"
        />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
}
