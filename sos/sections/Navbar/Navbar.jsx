// src/sections/Navbar/Navbar.jsx

import { Logo }            from '@/components/Logo';
import { NAV_LINKS }       from '@/constants/navigation';
import styles              from './Navbar.module.css';

// TODO: import SearchIcon from '@/assets/icons/search.svg?react';
// TODO: import GlobeIcon  from '@/assets/icons/globe.svg?react';
// TODO: import UserIcon   from '@/assets/icons/user.svg?react';

export function Navbar() {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Главная навигация">
      <Logo />

      <ul className={styles.links} role="list">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={styles.link}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Поиск">
          {/* TODO: <SearchIcon /> */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <div className={styles.lang}>
          {/* TODO: <GlobeIcon /> */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3c-2.5 2.5-4 5.7-4 9s1.5 6.5 4 9M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9M3 12h18" />
          </svg>
          <span>RU</span>
        </div>

        <button className={styles.cabinetBtn}>
          {/* TODO: <UserIcon /> */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          Личный кабинет
        </button>
      </div>
    </nav>
  );
}
