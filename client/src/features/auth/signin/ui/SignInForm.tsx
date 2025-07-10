import { signinSchema } from '@/entities/user/model/userSchema';
import { signin } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function SignInForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null); // Сбрасываем ошибку при новом сабмите

    const data = Object.fromEntries(new FormData(e.currentTarget));
    let validated;
    try {
      validated = signinSchema.parse(data);
    } catch {
      setError('Неверный формат данных');
      return;
    }

    dispatch(signin(validated))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err: unknown) => {
        if (typeof err === 'object' && err !== null && 'message' in err) {
          setError((err as { message: string }).message);
        } else {
          setError('Произошла ошибка при входе');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Введи email" />
      <input name="password" type="password" placeholder="Введи пароль" />
      <button type="submit">Войти</button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>
  );
}

export default SignInForm;
