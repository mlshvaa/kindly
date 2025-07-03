import { signup } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUpForm(): React.JSX.Element {
  // чтобы получить функцию, с помощью которой можно отправлять (dispatch) действия (actions) в Redux-хранилище из своего React-компонента
  // dispatch — это главный способ менять данные в Redux из React-компонентов.
  // получаем его через хук, чтобы отправлять действия, которые изменяют глобальное состояние приложения.
  const dispatch = useAppDispatch();
  //   на регу делаем контролируемую форму
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    if (formData.password.split('').every((c) => c.toLowerCase() !== c.toUpperCase())) {
      setError('Нужны цифры или спецсимволы');
      return;
    }

    setLoading(true);

    dispatch(signup(formData))
      .unwrap()
      .then(() => navigate('/'))
      .catch(console.error);
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
