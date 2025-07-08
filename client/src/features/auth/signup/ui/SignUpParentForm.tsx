import { signup } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './SignUpForm.css';
import babyLogo from '@/images/babyLogo.png';
import graduationHat from '@/images/graduationHat.png';

function SignUpForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<'parent' | 'specialist' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
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

  const handleRoleSelect = (role: 'parent' | 'specialist') => {
    setSelectedRole(role);
    setFormData((prev) => ({ ...prev, role }));
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
      .then(() => {
        if (formData.role === 'parent') {
          navigate('/parent/home');
        } else {
          navigate('/specialist/home');
        }
      })
      .catch(() => setError('Ошибка при регистрации'))
      .finally(() => setLoading(false));
  };

  const isValid =
    formData.name.length > 0 &&
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    !!selectedRole;

  return (
    <form onSubmit={onSubmit} className="signUpFormMain">
      <div className="headerSectionSignUp">
        <h2>
          Присоединяйтесь к <span className="pink">заботливому</span> сообществу
        </h2>
        <p className="secondParagraphForm">
          Ищете заботливую няню или готовы сами помогать семьям?
        </p>
        <p className="secondParagraphForm">
          Мы здесь, чтобы соединить тех, кто ищет заботу, и тех, <br /> кто её дарит — с любовью,
          доверием и теплом.
        </p>
      </div>

      <div className="leftAndRight">
        <div className="leftPartContainer">
          <h2 className="chooseYourRole">Выберите свою роль</h2>
          <div className="yourRoles">
            <div
              className={`imParent ${selectedRole === 'parent' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('parent')}
            >
              <img src={babyLogo} alt="логотип с ребёнком" />
              <h2>Я родитель</h2>
              <p>Хочу найти заботливую няню для своего ребёнка</p>
            </div>
            <div
              className={`imSpecialist ${selectedRole === 'specialist' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('specialist')}
            >
              <img src={graduationHat} alt="логотип с шапкой выпускника" />
              <h2>Я специалист</h2>
              <p>Хочу работать с детьми и помогать семьям</p>
            </div>
          </div>
        </div>

        {selectedRole && (
          <div className="rightPartFormContainer">
            <div className="headerRegistationContainer">
              <h3>Я {selectedRole === 'parent' ? 'родитель' : 'специалист'}</h3>
              <p>
                {selectedRole === 'parent'
                  ? 'Создайте аккаунт, чтобы найти подходящую няню'
                  : 'Создайте аккаунт, чтобы работать с семьями и детьми'}
              </p>
            </div>
            <div className="inputContainer">
              <div className="nameAndInput">
                <p>Ваше имя</p>
                <input
                  name="name"
                  type="text"
                  placeholder="Введите своё имя"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div className="nameAndInput">
                <p>Email</p>
                <input
                  name="email"
                  type="email"
                  placeholder="Введите свой email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div className="nameAndInput">
                <p>Пароль</p>
                <input
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              <div className="nameAndInput">
                <p>Подтвердите пароль</p>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Подтвердите пароль"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
              </div>

              <button type="submit" className="createAccountButton" disabled={!isValid || loading}>
                {loading ? 'Регистрация...' : 'Создать аккаунт'}
              </button>
              <div>{error}</div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default SignUpForm;
