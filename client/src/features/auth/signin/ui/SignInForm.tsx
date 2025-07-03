import { signinSchema } from '@/entities/user/model/userSchema';
import { signin } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React from 'react';
import { useNavigate } from 'react-router';

function SignInForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validated = signinSchema.parse(data);
    dispatch(signin(validated))
      .unwrap()
      .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Введи email" />
      <input name="password" type="password" placeholder="Введи пароль" />
      <button type="submit">войти</button>
      {/* <div>{error}</div> */}
    </form>
  );
}

export default SignInForm;
