// src/components/Logo/Logo.jsx
//
// Replace the inline SVG with:
//   import LogoIcon from '@/assets/icons/shield.svg?react';

import styles from './Logo.module.css';

export function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.iconWrap}>
        {/* TODO: import ShieldIcon from '@/assets/icons/shield.svg?react' and render here */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
            fill="#FFD700"
          />
        </svg>
      </div>
      <div className={styles.text}>
        <span className={styles.brand}>
          <span className={styles.fin}>Fin</span>Gramota
        </span>
        <span className={styles.tagline}>Государственная платформа</span>
      </div>
    </div>
  );
}
