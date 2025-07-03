import { signup } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUpSpecialistForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'specialist',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
      .then(() => navigate('/specialist/home'))
      .catch(console.error);
  };

  const isValid =
    formData.name.length > 0 &&
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <form onSubmit={onSubmit}>
      <h2>Регистрация Специалиста</h2>
      <input
        name="name"
        type="text"
        placeholder="Имя"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={handleChange}
        value={formData.password}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Подтвердите пароль"
        onChange={handleChange}
        value={formData.confirmPassword}
      />
      <button type="submit" disabled={!isValid}>
        Зарегистрироваться
      </button>
      <div>{error}</div>
    </form>
  );
}

export default SignUpSpecialistForm;
