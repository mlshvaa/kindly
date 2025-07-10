import { signinSchema } from '@/entities/user/model/userSchema';
import { signin } from '@/entities/user/model/userThunks';
import { useAppDispatch } from '@/shared/lib/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './SignInForm.css';
import happyFamily from '@/images/happyFamilyOfFour.png';
import heartLogo from '@/images/likeLogo.png';
import lockLogo from '@/images/lock.png';

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

  const onClickSignUp = () => {
    void navigate('/signup/parent');
  };

  return (

    <form onSubmit={handleSubmit} className="signInMainContainers">
      <div className="rightPartSignIn">
        <div className="headerSectionSignIn">
          <h2>
            Добро пожаловать обратно — здесь вас <span className="pink">всегда</span> ждут!
          </h2>
          <p>
            Войдите в аккаунт и продолжите путь к новым знакомствам с проверенными нянями и
            педагогами. Мы очень рады видеть вас снова!
          </p>
          <div className="happyFamilyWrapper">
            <div className="circle topLeft"></div>
            <div className="circle bottomRight"></div>
            <div className="circle middleLeft"></div>
            <img src={happyFamily} alt="счастливая семья на закате" className="happyFamilyOfFour" />
          </div>
          <div className="logosContainer">
            <div className="logoAndParapraphContainer">
              <img src={heartLogo} alt="" className="signInLogos" />
              <p className="safeAndSecure">Надёжно и безопасно</p>
            </div>
            <div className="logoAndParapraphContainer">
              <img src={lockLogo} alt="" className="signInLogos" />
              <p className="safeAndSecure">Ваши данные под защитой</p>
            </div>
          </div>
        </div>

        <div className="leftPartSignIn">
          <div className="leftPartHeader">
            <h2>Вход в аккаунт</h2>
            <p>Введите свои данные для доступа к аккаунту.</p>
          </div>
          <div className="emailSectionSignIn">
            <p className="signInParagraph">Электронная почта</p>
            <input
              name="email"
              type="email"
              placeholder="Введите свой email"
              className="signInInput"
            />
          </div>
          <div className="passwordSectionSignIn">
            <p className="signInParagraph">Пароль</p>
            <input
              name="password"
              type="password"
              placeholder="Введите пароль"
              className="signInInput"
            />
          </div>
          <button type="submit" className="signInButton">
            Войти
          </button>
          <div className="signInDevider">
            <span className="gotNoAcc">Ещё нет аккаунта?</span>
          </div>
          <button className="createAccountButtonSignIn" onClick={onClickSignUp}>
            Создать аккаунт
          </button>
        </div>
      </div>

      <div className="bottomPartSignIn">
        <p>
          Каждый вход в систему приближает нас к созданию по-настоящему значимых связей между
          семьями и заботливыми специалистами. Спасибо, что вы с нами и являетесь частью этого
          доброго сообщества.
        </p>
        <div className="logoAndParagraphContainer">
          <p>🩷 С любовью для каждой семьи</p>
        </div>
      </div>
    </form>
  );
}

export default SignInForm;
