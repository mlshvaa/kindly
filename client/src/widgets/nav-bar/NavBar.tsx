import { logout } from '@/entities/user/model/userThunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import './NavBar.css';
import teddyBearLogo from '@/images/teddyBearLogo.png';

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
    <div className="navbarMainContainer">
      <div className="imgAndHeaderContainer">
        <Link to="/">
          <img src={teddyBearLogo} alt="плюшевый мишка логотип сайта" className="teddyBearNavbar" />
        </Link>
        <Link to="/" className="kindlyMain">
          <h1>Kindly</h1>
        </Link>
      </div>
      {/* <p>{user?.id ? `Привет, ${user.name}` : 'Гость'}</p> */}
      <div>
        <Link to="/" className="homeNavigation">
          Домой
        </Link>
      </div>
      {user ? (
        <div>
          {user.role === 'parent' && <Link to="/parent/cabinet">Личный кабинет родителя</Link>}
          {user.role === 'specialist' && (
            <Link to="/specialist/home">Личный кабинет специалиста</Link>
          )}

          <div>
            <button onClick={handleLogout} className="logoutNavigation">
              Выйти
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <Link to="/signup/parent" className="parentRegNavigation">
              Ищу няню
            </Link>
          </div>
          <div>
            <Link to="/signup/specialist" className="nannyRegNavigation">
              Стать няней
            </Link>
          </div>
          <div>
            <Link to="/signin" className="loginNavigation">
              Войти
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
