import './Footer.css';
import teddyBearLogo from '@/images/teddyBearLogo.png';

function Footer(): React.JSX.Element {
  return (
    <footer className="footerMainContainer">
      <div className="footerColumn leftColumn">
        <div className="logoAndName">
          <img src={teddyBearLogo} alt="логотип мишка" />
          <h4>Kindly</h4>
        </div>
        <p className="footerDescription">
          Заботливые няни и педагоги, проверенные временем —<br />
          чтобы каждый ребёнок чувствовал себя в безопасности.
        </p>
        <p className="madeWithLove">🩷 С любовью для каждой семьи</p>
      </div>

      <div className="footerColumn middleColumn">
        <h5>Полезные ссылки</h5>
        <ul>
          <li>Услуги и цены</li>
          <li>Отзывы</li>
          <li>Часто задаваемые вопросы</li>
          <li>Связаться с нами</li>
        </ul>
      </div>

      <div className="footerColumn rightColumn">
        <h5>Связаться с нами</h5>
        <p className="contactText">
          Оставайтесь на связи и узнавайте первыми <br />о новых специалистах и сервисах.
        </p>
        <p>Email: example@email.com</p>
        <p>Телефон: +7 (999) 123-45-67</p>
        <p>Часы работы: Пн–Пт, 9:00–18:00</p>
      </div>
    </footer>
  );
}

export default Footer;
