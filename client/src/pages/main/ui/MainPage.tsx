// import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
// import React, { useEffect } from 'react';
import './MainPage.css';
import clayImage from '@/images/clay.png';
import likeLogo from '@/images/likeLogo.png';
import peopleLogo from '@/images/peopleLogo.png';
import calendarLogo from '@/images/calendarLogo.png';
import starLogo from '@/images/starLogo1.png';
import checkLogo from '@/images/checkLogo1.png';
import guardLogo from '@/images/guardLogo1.png';
import NannyCard from '@/widgets/nanny-card/NannyCard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getAllSpecialists } from '@/entities/specialist/model/specialistThunks';

function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { specialists, loading, error } = useAppSelector((state) => state.specialist);
  const headerOffset = 100;

  useEffect(() => {
    void dispatch(getAllSpecialists());
  }, [dispatch]);

  const onClickNannies = (): void => {
    const section = document.getElementById('bestNannies');
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
   });
    }
  };

  const onClickHowItWorks = (): void => {
    const section = document.getElementById('howItWorks');
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
   });
    }
  };

  const onClickReviews = (): void => {
    const section = document.getElementById('reviews');
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
   });
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
            <button className="learMoreButton" onClick={onClickHowItWorks}>
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
          <button className="reviewsNavigateButton" onClick={onClickReviews}>
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
            Знакомьтесь с нянями, которым доверяет множество родителей.{' '}
          </p>
          <p className="howItWorksParagraph">
            Каждая анкета проходит отбор, чтобы вы могли сделать выбор с уверенностью и
            спокойствием.
          </p>
          <div className="nanniesCardContainer">
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error}</p>}
            {specialists.slice(0, 3).map((specialist) => (
              <NannyCard key={specialist.id} specialist={specialist} />
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
        <div className="reviewsCards">
          <div className="oneReviewCard">
            <div className="parentInfo">
              <h5>Ирина Ефимова</h5>
              <p>Мама Полины (10 лет)</p>
            </div>
            <div className="reviewParagraph">
              <p>
                Татьяна — настоящее открытие для нашей семьи: дочка сразу влюбилась в глину
                благодаря её подходу и доброму сердцу. Атмосфера была уютной и вдохновляющей, дочка
                создала целую коллекцию фигурок. Спасибо за фотографии и видео — было очень приятно
                видеть, как горят глаза у Полины 💛
              </p>
            </div>
            {/* <button className="readFullReview">Читать отзыв</button> */}
          </div>
          <div className="oneReviewCard">
            <div className="parentInfo">
              <h5>Юлия Горячева</h5>
              <p>Мама Артёма и Арсения (6 и 8 лет)</p>
            </div>
            <div className="reviewParagraph">
              <p>
                Татьяна провела волшебное занятие: сын, сначала стеснительный, уже через несколько
                минут лепил с увлечением. Атмосфера была тёплой и творческой, Татьяна вдохновляла и
                поддерживала каждого. Фото, видео и подробный отчёт стали приятным бонусом после
                настоящего приключения 🎨
              </p>{' '}
            </div>
            {/* <button className="readFullReview">Читать отзыв</button> */}
          </div>
          <div className="oneReviewCard">
            <div className="parentInfo">
              <h5>Светлана Белова</h5>
              <p>Мама Лизы (7 лет)</p>
            </div>
            <div className="reviewParagraph">
              <p>
                С Татьяной даже застенчивая Лиза раскрылась, как цветок: уже через пару минут они
                смеялись и лепили кружку из глины. Каждое занятие — это сказка, в которой ребёнок
                чувствует себя художником. Фотоотчёт с комментариями тронул нас до глубины души —
                спасибо за эту магию 💫💕
              </p>{' '}
            </div>
            {/* <button className="readFullReview">Читать отзыв</button> */}
          </div>
        </div>
        <div className="reviewesLogos">
          <div className="guaranted">
            <img src={checkLogo} alt="галочка" />
            <p>Проверенные отзывы</p>
          </div>
          <div className="guaranted">
            <img src={guardLogo} alt="" />
            <p>Гарантия качества</p>
          </div>
          <div className="guaranted">
            <img src={starLogo} alt="" />
            <p>Высокая оценка родителей</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
