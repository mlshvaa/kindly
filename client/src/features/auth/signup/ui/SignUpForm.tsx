import { signup } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUpForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Функция для форматирования имени: каждое слово с заглавной буквы
  const formatName = (value: string) =>
    value
      .split(' ')
      .filter(Boolean) // убираем лишние пробелы
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // Форматируем имя при вводе
      const formattedName = formatName(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedName,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (formData.password.length <= 3) {
      setError('Слишком короткий пароль');
      return;
    }
    if (formData.password.split('').every((c) => c.toLowerCase() === c.toUpperCase())) {
      setError('Нужны цифры или спецсимволы');
      return;
    }

    setLoading(true);

    dispatch(signup(formData))
      .unwrap()
      .then(() => navigate('/'))
      .catch(() => setError('Неверный email или пароль'))
      .finally(() => setLoading(false));
  };

  const isValid =
    formData.name.length > 0 &&
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Введи имя пользователя"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Введи email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Введи пароль"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button type="submit" disabled={!isValid}>
        Зарегистрироваться
      </button>
      <div>{error}</div>
    </form>
  );
}

export default SignUpForm;
