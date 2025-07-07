// import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
// import React, { useEffect } from 'react';
import './MainPage.css';
import clayImage from '@/images/clay.PNG';
import likeLogo from '@/images/likeLogo.png';
import peopleLogo from '@/images/peopleLogo.png';
import calendarLogo from '@/images/calendarLogo.png';

function MainPage(): React.JSX.Element {
  const onClickNannies = (): void => {
    const section = document.getElementById('bestNannies');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="topPartContainer">
        <div className="topPartNoPic">
          <div className="heroSectionAndImg">
            <div className="heroSection">
              <h1>
                Забота и <span className="pink">Любовь</span> <br />
                для <span className="blue">Вашего Ребёнка</span> — рядом
              </h1>
              <p className="descriptionParagraph">
                Мы подбираем только надёжных, заботливых и профессиональных <br /> нянь и педагогов,
                которые не просто выполняют работу, а становятся <br /> настоящими друзьями вашей
                семьи. Каждый специалист <br /> проходит тщательную проверку, чтобы ваш ребёнок
                получил
                <br /> всю любовь, внимание и поддержку, которых он достоин.
              </p>
            </div>
          </div>
          <div className="topPartButtonContainer">
            <button className="findNannyButton" onClick={onClickNannies}>
              Найти идеального педагога
            </button>
            <button className="learMoreButton">Узнать о нас больше</button>
          </div>
          <div className="logoContainer">
            <div className="happyFamilies">
              <img src={likeLogo} alt="значок лайка" />
              <p>Множество счастливых семей</p>
            </div>
            <div className="approvedPeople">
              <img src={peopleLogo} alt="значок с людьми" />
              <p>Только проверенные няни</p>
            </div>
            <div className="familySupport">
              <img src={calendarLogo} alt="значок календаря" />
              <p>Надёжная поддержка для вашей семьи</p>
            </div>
          </div>
        </div>
        <div className="clayImageWrapper">
          <div className="circle topLeft"></div>
          <div className="circle bottomRight"></div>
          <div className="circle middleLeft"></div>
          <img src={clayImage} alt="няня и ребёнок лепят из пластилина" className="clayImage" />
        </div>
      </div>
      <div className="secondPartContainer">
        <div className="howItWorks">
          <div className="howItWorksHeader">
            <h2>
              Как это <span className="pink">Работает</span>
            </h2>
            <p className="howItWorksParagraph">
              Найти идеальную няню для вашей семьи — проще, чем кажется.{' '}
            </p>
            <p className="howItWorksParagraph">Следуйте этим простым шагам:</p>
          </div>
          <div className="firstCardContainer">
            <div className="needsCard">
              <button className="needsButton">💭</button>
              <h3>Расскажите о своих пожеланиях</h3>
              <p className="toDoParagraph">
                Поделитесь своими требованиями, графиком и предпочтениями — <br /> и мы поможем
                подобрать идеального <br />
                специалиста именно для вашей семьи.
              </p>
            </div>
            <div className="needsCard">
              <button className="meetingsButton">👥</button>
              <h3>Выберите няню из проверенных анкет</h3>
              <p className="toDoParagraph">
                Просмотрите анкеты наших заботливых <br />
                и проверенных специалистов и выберите <br /> того, кто подходит именно вам.
              </p>
            </div>
            <div className="needsCard">
              <button className="journeyButton">💫</button>
              <h3>Начните путь доверия и заботы</h3>
              <p className="toDoParagraph">
                После выбора подходящей няни <br />
                начинается новый этап — тёплый, надёжный и наполненный заботой <br /> путь для вас и
                вашего малыша.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="thirdPartContainer">
        <h2 id="bestNannies">
          <span className="pink">Лучшие</span> няни для <span className="blue">Вашего Ребёнка</span>
        </h2>
        <div className="meetNanniesParagraph">
          <p className="howItWorksParagraph">
            Знакомьтесь с нянями, которым доверяет множество родителей.{' '}
          </p>
          <p className="howItWorksParagraph">
            Каждая анкета проходит отбор, чтобы вы могли сделать выбор с уверенностью и
            спокойствием.
          </p>
          <div className="nanniesCardContainer"></div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
