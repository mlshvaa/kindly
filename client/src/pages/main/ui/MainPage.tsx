import './MainPage.css';
import clayImage from '@/images/clay.png';
import likeLogo from '@/images/likeLogo.png';
import peopleLogo from '@/images/peopleLogo.png';
import calendarLogo from '@/images/calendarLogo.png';
import starLogo from '@/images/starLogo1.png';
import checkLogo from '@/images/checkLogo1.png';
import guardLogo from '@/images/guardLogo1.png';
import NannyCard from '@/widgets/nanny-card/NannyCard';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getAllSpecialists } from '@/entities/specialist/model/specialistThunks';
import { useNavigate } from 'react-router';
import ReviewsCard from '@/features/reviews/ReviewsCard';

function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { specialists, loading, error } = useAppSelector((state) => state.specialist);

  const headerOffset = 100;
  const navigate = useNavigate();

  // Отдельные рефы для каждой карусели
  const nanniesScrollRef = useRef<HTMLDivElement>(null);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  // Функции прокрутки для нянь
  const scrollNanniesLeft = (): void => {
    if (nanniesScrollRef.current) {
      nanniesScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollNanniesRight = (): void => {
    if (nanniesScrollRef.current) {
      nanniesScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Функции прокрутки для отзывов
  const scrollReviewsLeft = (): void => {
    if (reviewsScrollRef.current) {
      reviewsScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollReviewsRight = (): void => {
    if (reviewsScrollRef.current) {
      reviewsScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const onClickSpecialist = (id: number): void => {
    void navigate(`/parent/specialist/${id.toString()}`);
  };

  useEffect(() => {
    void dispatch(getAllSpecialists());
  }, [dispatch]);

  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
                получил <br /> всю любовь, внимание и поддержку, которых он достоин.
              </p>
            </div>
          </div>
          <div className="topPartButtonContainer">
            <button className="findNannyButton" onClick={() => scrollToSection('bestNannies')}>
              Найти идеального педагога
            </button>
            <button className="learMoreButton" onClick={() => scrollToSection('howItWorks')}>
              Узнать о нас больше
            </button>
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

      <div className="secondPartContainer" id="howItWorks">
        <div className="howItWorks">
          <div className="howItWorksHeader">
            <h2>
              Как это <span className="pink">Работает</span>
            </h2>
            <p className="howItWorksParagraph">
              Найти идеальную няню для вашей семьи — проще, чем кажется.
            </p>
            <p className="howItWorksParagraph">Следуйте этим простым шагам:</p>
          </div>
          <div className="firstCardContainer">
            <div className="needsCard">
              <button className="needsButton">💭</button>
              <h3>Расскажите о своих пожеланиях</h3>
              <p className="toDoParagraph">
                Поделитесь своими требованиями, графиком и предпочтениями — <br />и мы поможем
                подобрать идеального специалиста именно для вашей семьи.
              </p>
            </div>
            <div className="needsCard">
              <button className="meetingsButton">👥</button>
              <h3>Выберите няню из проверенных анкет</h3>
              <p className="toDoParagraph">
                Просмотрите анкеты наших заботливых <br />и проверенных специалистов и выберите
                того, кто подходит именно вам.
              </p>
            </div>
            <div className="needsCard">
              <button className="journeyButton">💫</button>
              <h3>Начните путь доверия и заботы</h3>
              <p className="toDoParagraph">
                После выбора подходящей няни начинается новый этап — тёплый, надёжный и наполненный
                заботой путь для вас и вашего малыша.
              </p>
            </div>
          </div>
          <button className="reviewsNavigateButton" onClick={() => scrollToSection('reviews')}>
            Почему нам доверяют?
          </button>
        </div>
      </div>

      <div className="thirdPartContainer" id="bestNannies">
        <h2>
          <span className="pink">Лучшие</span> няни для <span className="blue">Вашего Ребёнка</span>
        </h2>
        <div className="meetNanniesParagraph">
          <p className="howItWorksParagraph">
            Знакомьтесь с нянями, которым доверяет множество родителей.
          </p>
          <p className="howItWorksParagraph">
            Каждая анкета проходит отбор, чтобы вы могли сделать выбор с уверенностью и
            спокойствием.
          </p>

          {/* 🔁 Кнопки для прокрутки нянь */}
          <div className="arrowsContainer">
            <button className="directionButton" onClick={scrollNanniesLeft}>
              ˂
            </button>
            <button className="directionButton" onClick={scrollNanniesRight}>
              ˃
            </button>
          </div>

          {/* 🔁 Контейнер со скроллом для нянь */}
          <div className="nanniesCardContainer" ref={nanniesScrollRef}>
            {specialists.map((specialist) => (
              <div key={specialist.id} className="nannyCardItem">
                <NannyCard
                  specialist={specialist}
                  onClick={() => onClickSpecialist(specialist.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="forthPartContainer" id="reviews">
        <div className="reviewsHeader">
          <h2>
            Что говорят <span className="pink">Родители</span>
          </h2>
          <p className="howItWorksParagraph">
            Мы бережно собираем впечатления родителей, чтобы вы делали выбор с уверенностью и
            спокойствием.
          </p>
        </div>

        <div className="reviewsCarouselWrapper">
          {/* 🔁 Кнопки для прокрутки отзывов */}
          <div className="arrowsContainer">
            <button className="directionButton" onClick={scrollReviewsLeft}>
              ˂
            </button>
            <button className="directionButton" onClick={scrollReviewsRight}>
              ˃
            </button>
          </div>

          {/* 🔁 Контейнер со скроллом для отзывов */}
          <div className="reviewsCardContainer" ref={reviewsScrollRef}>
            <ReviewsCard />
          </div>
        </div>

        <div className="reviewesLogos">
          <div className="guaranted">
            <img src={checkLogo} alt="галочка" />
            <p>Проверенные отзывы</p>
          </div>
          <div className="guaranted">
            <img src={guardLogo} alt="щит" />
            <p>Гарантия качества</p>
          </div>
          <div className="guaranted">
            <img src={starLogo} alt="звёздочка" />
            <p>Высокая оценка родителей</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
