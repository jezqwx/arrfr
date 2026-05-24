// src/sections/EmergencyContacts/EmergencyContacts.jsx

import { ContactCard }       from '@/components/ContactCard';
import { SectionHeader }     from '@/components/SectionHeader';
import { EMERGENCY_CONTACTS } from '@/constants/contacts';
import styles                 from './EmergencyContacts.module.css';

// Icon import stubs — replace with actual Figma SVG exports:
// import PoliceIcon      from '@/assets/icons/police.svg?react';
// import BankIcon        from '@/assets/icons/bank.svg?react';
// import CentralBankIcon from '@/assets/icons/central-bank.svg?react';
// import HeartIcon       from '@/assets/icons/heart.svg?react';

// Temporary inline placeholder SVGs (delete once Figma icons are ready)
const iconMap = {
  police: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
    </svg>
  ),
  bank: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="10" width="18" height="11" /><path d="M3 10l9-7 9 7M6 10v11M18 10v11" />
    </svg>
  ),
  'central-bank': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v3M12 12h3M12 12H9" />
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

export function EmergencyContacts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          title="Экстренные контакты"
          subtitle="Сохраните эти номера — они могут понадобиться в критической ситуации"
        />
        <div className={styles.grid}>
          {EMERGENCY_CONTACTS.map((contact) => (
            <ContactCard
              key={contact.title}
              icon={iconMap[contact.iconKey]}
              title={contact.title}
              subtitle={contact.subtitle}
              hours={contact.hours}
              phone={contact.phone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
