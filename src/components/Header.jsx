import { Link } from "react-router-dom";
import {
  mdiMagnify,
  mdiWeb,
  mdiAccountOutline,
} from "@mdi/js";

import { NavLink } from "react-router-dom";
import MdiIcon from "./MdiIcon";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
      <Link to="/home" className="brand">
        <img src="/logo.svg" alt="FinGramota" />
      </Link>

        <nav className="header-nav">
        <NavLink
  to="/home"
  className={({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link"
  }
>
  Главное
</NavLink>

          <NavLink
  to="/check"
  className={({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link"
  }
>
  Центр проверки
</NavLink>

<NavLink
  to="/marketplace"
  className={({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link"
  }
>
  Маркетплейс
</NavLink>

<NavLink
  to="/education"
  className={({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link"
  }
>
  Обучение
</NavLink>

<NavLink
  to="/instruments"
  className={({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link"
  }
>
  Инструменты
</NavLink>

<NavLink
  to="/faq"
  className={({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link"
  }
>
  FAQ
</NavLink>
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