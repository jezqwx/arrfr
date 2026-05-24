// src/sections/Hero/Hero.jsx

import { useCopyToClipboard }              from '@/hooks/useCopyToClipboard';
import { SUPPORT_PHONE, SUPPORT_PHONE_DISPLAY } from '@/constants/contacts';
import styles                               from './Hero.module.css';

// TODO: import BoltIcon  from '@/assets/icons/bolt.svg?react';
// TODO: import PhoneIcon from '@/assets/icons/phone.svg?react';
// TODO: import ChatIcon  from '@/assets/icons/chat.svg?react';
// TODO: import ClockIcon from '@/assets/icons/clock.svg?react';
// TODO: import CopyIcon  from '@/assets/icons/copy.svg?react';
// TODO: import CheckIcon from '@/assets/icons/check.svg?react';

export function Hero() {
  const [copied, copy] = useCopyToClipboard();

  return (
    <section className={styles.hero}>
      {/* Background decorative SVG waves */}
      <svg className={styles.waves} viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M0,200 C200,100 400,300 600,200 S800,100 1000,200 V400 H0Z" fill="white" />
        <path d="M0,250 C150,150 350,350 550,250 S750,150 1000,250 V400 H0Z" fill="white" opacity="0.5" />
      </svg>

      <div className={`${styles.content} fadeInUp`}>
        {/* Badge */}
        <div className={styles.badge}>
          {/* TODO: <BoltIcon className={styles.boltIcon} /> */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span>Линия защиты 3: Реакция</span>
        </div>

        <h1 className={styles.heading}>Центр экстренного реагирования</h1>

        <p className={styles.subheading}>
          Каждая минута важна для возврата средств и защиты прав.<br />
          Если уже произошёл инцидент — действуйте быстро.
        </p>

        {/* Support card */}
        <div className={styles.supportCard}>
          <div className={styles.supportHeader}>
            <div className={styles.supportIconWrap}>
              {/* TODO: <ChatIcon /> */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className={styles.supportMeta}>
              <p className={styles.supportTitle}>Поддержка</p>
              <p className={styles.supportSub}>Заявление о мошенничестве</p>
              <div className={styles.supportHours}>
                {/* TODO: <ClockIcon /> */}
                24/7
              </div>
            </div>
          </div>

          <div className={styles.supportActions}>
            <button className={styles.phoneBtn}>
              {/* TODO: <PhoneIcon /> */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.27 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {SUPPORT_PHONE_DISPLAY}
            </button>

            <button
              className={styles.copyBtn}
              onClick={() => copy(SUPPORT_PHONE)}
              title={copied ? 'Скопировано!' : 'Копировать номер'}
              aria-label="Копировать номер телефона"
            >
              {/* TODO: {copied ? <CheckIcon /> : <CopyIcon />} */}
              {copied ? '✓' : '⧉'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
