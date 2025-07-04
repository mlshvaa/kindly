import './Footer.css';
import teddyBearLogo from '@/images/teddyBearLogo.png';

function Footer(): React.JSX.Element {
  return (
    <div className="footerMainContainer">
      <div className="leftPartFooter">
        <div className="imgAndHeader">
          <img src={teddyBearLogo} alt="плюшевый мишка с календарём логотип" />
          <h4>Kindly</h4>
        </div>
        <div className="leftPartParagraphs">
          <p className="kindlyParagraph">
            Заботливые няни и педагоги, проверенные временем — <br />
            чтобы каждый ребёнок чувствовал себя <br /> в безопасности и любви.
          </p>
          <p className="madeWithLoveParapraph">🩷 Сделано с любовью для семей</p>
        </div>
      </div>
      <div className="middlePartFooter">
        <h5>Полезные ссылки</h5>
        <div className="footerAllParagraphs">
          <p>Услуги и цены</p>
          <p>Отзывы</p>
          <p>Часто задаваемые вопросы</p>
        </div>
      </div>
      <div className="rightPartFooter">
        <h5>Связаться с нами</h5>
        <div className="footerAllParagraphs">
          <p>Оставайтесь на связи и узнавайте первыми о новых специалистах и сервисах.</p>
          <p>Email: example@email.com</p>
          <p>Телефон: +7 (999) 123-45-67</p>
          <p>Часы работы: Пн–Пт с 9:00 до 18:00</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
