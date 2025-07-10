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

  // Форматируем имя с сохранением пробелов, каждое слово с заглавной буквы
  const formatName = (value: string) =>
    value
      .split(/(\s+)/) // разделяем по пробелам, включая их
      .map((word) => {
        if (word.trim() === '') return word; // пробелы оставляем как есть
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
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

  const handleRoleSelect = (role: 'parent' | 'specialist'): void => {
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
    if (formData.password.split('').every((c) => c.toLowerCase() === c.toUpperCase())) {
      setError('Нужны цифры или спецсимволы');
      return;
    }

    setLoading(true);

    dispatch(signup(formData))
      .unwrap()
      .then(() => {
        if (formData.role === 'parent') {
          void navigate('/parent/home');
        } else {
          void navigate('/specialist/home');
        }
      })
      .catch(() => setError('Ошибка при регистрации'))
      .finally(() => setLoading(false));
  };

  const passwordsMatch = formData.password === formData.confirmPassword;

  const isValid =
    formData.name.trim().length > 0 &&
    formData.password.length > 0 &&
    passwordsMatch &&
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
          <h2 className={`${!selectedRole ? 'center-align' : ''} chooseYourRole`}>
            Выберите свою роль
          </h2>
          <div className="yourRoles">
            <div
              className={`imParent ${selectedRole === 'parent' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('parent')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleRoleSelect('parent');
              }}
            >
              <img src={babyLogo} alt="логотип с ребёнком" />
              <h2>Я родитель</h2>
              <p>Хочу найти заботливую няню для своего ребёнка</p>
            </div>
            <div
              className={`imSpecialist ${selectedRole === 'specialist' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('specialist')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleRoleSelect('specialist');
              }}
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
                  placeholder="Введите фамилию, имя и отчество"
                  onChange={handleChange}
                  value={formData.name}
                  autoComplete="name"
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
                  autoComplete="email"
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
                  autoComplete="new-password"
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
                  autoComplete="new-password"
                  className={passwordsMatch ? '' : 'inputError'}
                />
              </div>

              <button
                type="submit"
                className={`createAccountButton ${!isValid || loading ? 'buttonDisabled' : ''}`}
                disabled={!isValid || loading}
              >
                {loading ? 'Регистрация...' : 'Создать аккаунт'}
              </button>
              <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default SignUpForm;
