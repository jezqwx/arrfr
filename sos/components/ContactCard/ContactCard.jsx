// src/components/ContactCard/ContactCard.jsx

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import styles from './ContactCard.module.css';

import PhoneIcon from '@/assets/icons/phone.svg?react';
import CopyIcon  from '@/assets/icons/copy.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import ClockIcon from '@/assets/icons/clock.svg?react';

/**
 * @param {object} props
 * @param {React.ReactNode} props.icon  - SVG icon element (from Figma)
 * @param {string}          props.title
 * @param {string}          props.subtitle
 * @param {string}          props.hours
 * @param {string}          props.phone
 */
export function ContactCard({ icon, title, subtitle, hours, phone }) {
  const [copied, copy] = useCopyToClipboard();

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrap}>
          {icon}
        </div>
        <div className={styles.meta}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.hours}>
            <ClockIcon className={styles.clockIcon} /> 
            <span>{hours}</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.phoneBtn}>
          <PhoneIcon />
          {phone}
        </button>
        <button
          className={styles.copyBtn}
          onClick={() => copy(phone)}
          title={copied ? 'Скопировано!' : 'Копировать'}
          aria-label="Копировать номер"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? '✓' : '⧉'}
        </button>
      </div>
    </article>
  );
}
