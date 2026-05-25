import {
  mdiMagnify,
  mdiWeb,
  mdiAccountOutline,
} from "@mdi/js";

import MdiIcon from "./MdiIcon";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <div className="brand">
          <img src="/logo.svg" alt="FinGramota" />
        </div>

        <nav className="header-nav">
          <a href="#">Главное</a>
          <a href="#">Центр проверки</a>
          <a href="#">Маркетплейс</a>
          <a href="#">Обучение</a>
          <a href="#">Инструменты</a>
          <a href="#">FAQ</a>
        </nav>

        <div className="header-actions">
          <button className="icon-btn">
            <MdiIcon path={mdiMagnify} size={35} />
          </button>

          <div className="lang">
            <MdiIcon path={mdiWeb} size={18} />
            <span>RU</span>
          </div>

          <button className="cabinet-btn">
            <MdiIcon path={mdiAccountOutline} size={17} />
            <span>Личный кабинет</span>
          </button>
        </div>
      </div>
    </header>
  );
}