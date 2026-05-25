import MdiIcon from "../components/MdiIcon";
import {
  mdiFacebook,
  mdiInstagram,
  mdiTwitter,
  mdiYoutube,
  mdiMapMarkerOutline,
  mdiPhoneOutline,
  mdiEmailOutline,
} from "@mdi/js";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.svg" alt="FinGramota" />

            <p>
              Ваш надежный проводник в мире финансов. Мы помогаем гражданам
              принимать осознанные решения и защищаем от мошенников.
            </p>

            <div className="socials">
              <MdiIcon  path={mdiFacebook} size={0.78} />
              <MdiIcon  path={mdiInstagram} size={0.78} />
              <MdiIcon  path={mdiTwitter} size={0.78} />
              <MdiIcon  path={mdiYoutube} size={0.78} />
            </div>
          </div>

          <div className="footer-column">
            <h4>Платформа</h4>
            <a href="#">Вакансии</a>
            <a href="#">Партнеры</a>
            <a href="#">О проекте</a>
            <a href="/news">Новости</a>
          </div>

          <div className="footer-column">
            <h4>Инструменты</h4>
            <a href="/instruments/calculator">Кредитный калькулятор</a>
            <a href="/instruments/broker-check">Проверка брокера</a>
            <a href="/fraud-report">Сообщить о мошенничестве</a>
            <a href="/dictionary">Финансовый словарь</a>
          </div>

          <div className="footer-column contacts">
            <h4>Контакты</h4>

            <p>
              <MdiIcon  path={mdiMapMarkerOutline} size={0.9} />
              <span>г. Астана, пр. Мәңгілік Ел, 55А, БЦ "Бәйтерек"</span>
            </p>

            <p className="phone">
              <MdiIcon  path={mdiPhoneOutline} size={0.9} />
              <strong>1459 (Call-center)</strong>
            </p>

            <p>
              <MdiIcon  path={mdiEmailOutline} size={0.9} />
              <span>info@fingramota.kz</span>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="#">Политика конфиденциальности</a>
          <span>© 2026 FinGramota. Все права защищены.</span>
          <a href="#">Условия использования</a>
        </div>
      </div>
    </footer>
  );
}