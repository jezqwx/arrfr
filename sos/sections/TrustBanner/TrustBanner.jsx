// src/sections/TrustBanner/TrustBanner.jsx

import { SectionHeader } from '@/components/SectionHeader';
import { TRUST_ITEMS }   from '@/constants/agent';
import styles             from './TrustBanner.module.css';

import UsersIcon from '@/assets/icons/users.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import GavelIcon from '@/assets/icons/gavel.svg';
import ShieldIcon from '@/assets/icons/shield.svg';

const iconMap = {
  users: <UsersIcon />,
  heart: <HeartIcon />,
  gavel: <GavelIcon />,
};

export function TrustBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topIcon} aria-hidden="true">
          <ShieldIcon />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        <SectionHeader
          title="Государство на вашей стороне"
          subtitle="Мы помогаем гражданам защищать свои права при любых финансовых угрозах"
        />

        <div className={styles.grid}>
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.iconWrap}>
                {iconMap[item.iconKey]}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
