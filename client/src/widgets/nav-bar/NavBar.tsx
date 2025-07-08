import { logout } from '@/entities/user/model/userThunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './NavBar.css';
import teddyBearLogo from '@/images/teddyBearLogo.png';
import sidebarButton from '@/images/sidebarButton.png';
import sidebarButtonHover from '@/images/sidebarButtonHover.png';

function NavBar(): React.JSX.Element {
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [buttonSrc, setButtonSrc] = useState(sidebarButton);

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    void dispatch(logout())
      .unwrap()
      .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <div className="navbarMainContainer">
      {/* Логотип и название */}
      <div className="navbarLeft">
        <Link to="/">
          <img src={teddyBearLogo} alt="плюшевый мишка логотип сайта" className="teddyBearNavbar" />
        </Link>
        <Link to="/" className="kindlyMain">
          <h1>Kindly</h1>
        </Link>
      </div>

      {/* Центр — имя или гость */}
      <div className="navbarCenter">
        <p className="userOrGuest">Привет, {user?.name || 'Гость'}!</p>
      </div>

      {/* Правая часть — навигация */}
      <div className="navbarRight">
        <Link to="/" className="navLink">
          Домой
        </Link>

        {user ? (
          <>
            {user.role === 'parent' && (
              <Link to="/parent/cabinet" className="navLink">
                Кабинет родителя
              </Link>
            )}
            {user.role === 'specialist' && (
              <Link to="/specialist/home" className="navLink">
                Кабинет специалиста
              </Link>
            )}
            <button onClick={handleLogout} className="logoutNavigation">
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/signup/parent" className="navLink">
              Регистрация
            </Link>
            <Link to="/signup/specialist" className="navLink">
              Стать няней
            </Link>
            <Link to="/signin" className="navLink">
              Войти
            </Link>
          </>
        )}

        {/* Меню (можно включить позже) */}
        {/* <img
          src={buttonSrc}
          alt="кнопка меню"
          className="sideMenuButton"
          onMouseEnter={() => setButtonSrc(sidebarButtonHover)}
          onMouseLeave={() => setButtonSrc(sidebarButton)}
        /> */}
      </div>
    </div>
  );
}

export default NavBar;
