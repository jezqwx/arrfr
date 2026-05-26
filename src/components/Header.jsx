import { Link } from "react-router-dom";
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
          <Link to="/">Главное</Link>
          <Link to="/check">Центр проверки</Link>
          <Link to="/marketplace">Маркетплейс</Link>
          <Link to="/education">Обучение</Link>
          <Link to="/instruments">Инструменты</Link>
          <Link to="/faq">FAQ</Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn">
            <MdiIcon path={mdiMagnify} size={35} />
          </button>

          <div className="lang">
            <MdiIcon path={mdiWeb} size={18} />
            <span>RU</span>
          </div>

          <Link to="/profile" className="cabinet-btn">
            <MdiIcon path={mdiAccountOutline} size={17} />
            <span>Личный кабинет</span>
          </Link>
        </div>
      </div>
    </header>
  );
}