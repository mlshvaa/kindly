import { logout } from '@/entities/user/model/userThunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import React from 'react';
import { Link, useNavigate } from 'react-router';

function NavBar(): React.JSX.Element {
  // достаем user
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    void dispatch(logout())
      .unwrap()
      .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <nav>
      <h1>Навигационное меню</h1>
      <p>{user?.id ? `Привет, ${user.name}` : 'Гость'}</p>
      {/* <input type="text" placeholder="Search..." /> */}
      <div>
        <Link to="/">В начало</Link>
      </div>
      {user ? (
        <div>
          {/* <Link to="/users">Все пользователи</Link> */}

          <Link to="/profile">Личный кабинет</Link>

          <div>
            <button onClick={handleLogout}>Выйти</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <Link to="/signup/parent">Регистрация родителя</Link>
          </div>
          <div>
            <Link to="/signup/specialist">Регистрация специалиста</Link>
          </div>
          <div>
            <Link to="/signin">Войти</Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
